<template>
	<v-container>
		<v-card-title class="font-weight-bold" id="search-table">検索用テーブル</v-card-title>
		<vue-good-table
			@on-selected-rows-change="selectionChanged"
			ref="my-table"
			:select-options="{
				enabled: true,
				selectOnCheckboxOnly: true
			}"
			:columns="columns"
			:rows="items"
			:search-options="{
				enabled: true,
				searchFn: mySearchFn,
				placeholder: '絞り込み検索'
			}"
			:pagination-options="{
				enabled: true
			}"
			styleClass="vgt-table striped condensed bordered"
		>
			<div slot="selected-row-actions">
				<button @click="removeItems()">Delete</button>
			</div>
			<template slot="table-row" slot-scope="props">
				<!-- dblclickをclickにすると、編集可能領域にカーソルを持って行った瞬間通常状態に戻ってしまう -->
				<span v-if="isEditable" v-on:dblclick="isEditable = false">
					<div>
						<input
							type="text"
							v-model="props.formattedRow[props.column.field]"
							v-on:blur="updateItem(props)"
						/>
					</div>
				</span>
				<span v-if="!isEditable" v-on:dblclick="isEditable = true">
					<div v-if="props.column.field == 'url'">
						<!-- URLにジャンプするのではなくコピーするユースケースもあるためCOPYボタンを配置 -->
						<button @click="writeToClipboard(props.row.url)">COPY</button>&nbsp;
						<a
							v-bind:href="props.row.url"
							target="_blank"
							rel="noopener noreferrer"
							v-on:click="jumpToUrl(props.row.originalIndex)"
							>{{ props.row.url }}</a
						>
					</div>
					<div v-else>
						{{ props.formattedRow[props.column.field] }}
					</div>
				</span>
			</template>
		</vue-good-table>
	</v-container>
</template>

<script>
// import the styles
import "vue-good-table/dist/vue-good-table.css";
import { VueGoodTable } from "vue-good-table";
import * as wanakana from 'wanakana';
export default {
	data() {
		return {
			columns: [
				{
					label: "名前",
					field: "name"
				},
				{
					label: "URL",
					field: "url"
				},
				{
					label: "タグ",
					field: "tag"
				},
				{
					label: "登録日時",
					field: "registrationDate"
				},
				{
					label: "最終アクセス日時",
					field: "lastAccessDate"
				},
				{
					label: "クリック回数",
					field: "clickCount",
					type: "number"
				}
			],
			items: [],
			index: "",
			newItemName: null,
			newItemUrl: null,
			newItemTag: null,
			newItemregistrationDate: null,
			isEditable: false,
			itemsArray: [],
			isOpened: false,
			myfunc: "",
			selectionChanged: ""
		};
	},
	// add to component
	components: {
		VueGoodTable
	},
	mounted() {
		if (localStorage.getItem("items")) {
			try {
				this.items = JSON.parse(localStorage.getItem("items"));
				console.log(this.items);
			} catch (e) {
				localStorage.removeItem("items");
			}
		}
	},
	methods: {
    removeItems() {
			if (window.confirm("削除します。よろしいですか？")) {
				// Without reverse(), originalIndex will slide from where user selected.
				// This is caused by splice() used at removeItem().
				this.$refs["my-table"].selectedRows.reverse();
				for (let i in this.$refs["my-table"].selectedRows) {
					this.removeItem(this.$refs["my-table"].selectedRows[i].originalIndex);
				}
			}
		},
		removeItem(index) {
			this.items.splice(index, 1);
			this.saveItems();
		},
		saveItems() {
			const parsed = JSON.stringify(this.items);
			localStorage.setItem("items", parsed);
		},
		updateItem(editItem) {
			this.items.splice(editItem.row.originalIndex, 1, editItem.formattedRow);
			this.saveItems();
			// 編集後、領域外をクリックすると通常状態に戻る
			this.isEditable = false;
		},
		jumpToUrl(index) {
			this.items[index].lastAccessDate = this.formatDate(new Date());
			this.items[index].clickCount++;
			this.saveItems();
			window.open(this.items[index].url, "_blank");
			// Reset global search, because usually users search another words
			// after once jump to a link.
			// setTimeout(this.resetGlobalSearch, 5000);
		},
		mySearchFn(row, col, cellValue, searchTerm) {
			// mySearchFnは全セルに対して処理を実行するが無駄なので、
			// col.labelが名前のセルのみ処理して、それ以外は処理しない
			if (col.label !== "名前") {
				return;
			}
			// 名前とタグをくっつけて検索対象文字列を生成する
			// 大文字と小文字のあいまい検索のため、アルファベットは大文字にする
			const targetText = row.name.toUpperCase() + ", " + row.tag.toUpperCase();
			// ひらがなとカタカナのあいまい検索のため、ひらがなはカタカナに変換する
			// 例：VUE.JS ユニットテストノ基本マトメ, VUE, ユニットテスト, QIITA
			const targetAlphabetText = wanakana.toKatakana(targetText, { passRomaji: true })
			// 検索ワードをスペースで区切って検索ワード配列を作成する
			// 大文字と小文字のあいまい検索のため、アルファベットは大文字にする
			const searchWords = searchTerm
				.toUpperCase()
				.replaceAll("　", " ")
				.split(" ");
			// ひらがなとカタカナのあいまい検索のため、ひらがなはカタカナに変換する
			const searchAlphabetWords = searchWords.map(function(a){
				return wanakana.toKatakana(a, { passRomaji: true })
			});
			// 検索ワード配列の個数分ループする
			// 検索対象文字列に検索ワードが含まれていない場合、その列は表示しない
			// 上記処理を検索ワード配列の先頭から末尾まで繰り返す
			// 検索対象文字列に全ての検索ワードが含まれていた場合、その列は表示する
			for (let i in searchWords) {
				if (targetAlphabetText.search(searchAlphabetWords[i]) === -1) {
					return false;
				}
			}
			return true;
		},
		// COPYボタンでURLをコピーするためのメソッド
		writeToClipboard(text) {
			navigator.clipboard.writeText(text).catch(e => {
				console.error(e);
			});
		},
		formatDate(date) {
			var sortableLocaleDate = date.toLocaleString("sv-SE", 
			{
				timeZone: "Asia/Tokyo",
				year: 'numeric',
				month: 'numeric',
				day: 'numeric',
				hour: '2-digit',
				minute: '2-digit'
			}).replace(/-/g,"/");
			return sortableLocaleDate;
		},
	}
};
</script>