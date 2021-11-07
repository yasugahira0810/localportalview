<template>
	<div>
		<h1>Quick Bookmark</h1>
		<h2 id="search-table">検索用テーブル</h2>
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
		<h2 id="registration-form">登録用フォーム</h2>
		名前：<input name="newItemName" v-model="newItemName" /> URL：
		<input name="newItemUrl" v-model="newItemUrl" /> タグ：
		<input name="newItemTag" v-model="newItemTag" />
		<button id="addItem" @click="addItem">Submit</button>
		<h2 id="display-info" class="Accordion-Item" @click="toggleAccordion()">
			登録内容表示
		</h2>
		<pre class="Accordion-Item" v-if="isOpened"> {{ items | pretty }}</pre>
		<h2 id="import-json">JSONインポート用フォーム</h2>
		<input name="itemsArray" v-model="itemsArray" />
		<button @click="importItems">Import</button><br />
		<h2 id="initialization-form">データ初期化用フォーム</h2>
		<button @click="initializeItems" id="initialize">Initialize</button>
	</div>
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
	filters: {
		pretty: function(value) {
			return JSON.stringify(value, null, 2);
		}
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
		addItem() {
			// Validation. At least, URL is needed.
			if (!this.newItemName || !this.newItemUrl || !this.newItemTag) {
				window.alert("各項目を記載してください");
				return;
			}

			this.newItemregistrationDate = this.formatDate(new Date());

			this.items.push({
				name: this.newItemName,
				url: this.newItemUrl,
				tag: this.newItemTag,
				registrationDate: this.newItemregistrationDate,
				clickCount: 0
			});
			this.newItemName = "";
			this.newItemUrl = "";
			this.newItemTag = "";
			this.newItemregistrationDate = "";
			this.saveItems();
		},
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
		initializeItems() {
			if (window.confirm("登録データを全て削除します。よろしいですか？")) {
				if (window.confirm("本当によろしいですか？")) {
					this.items = [
						{
							name: "localportal",
							url: "https://yasugahira0810.github.io/localportal/#/",
							tag: "ポータル, ブックマーク, Angular",
							registrationDate: this.formatDate(new Date("2021/1/1 00:00:00")),
							lastAccessDate: this.formatDate(new Date("2021/7/20 16:42:12")),
							clickCount: 50000
						},
						{
							name: "vue-good-table",
							url: "https://xaksis.github.io/vue-good-table/",
							tag: "Vue",
							registrationDate: this.formatDate(new Date("1990/1/1 11:11:11")),
							lastAccessDate: this.formatDate(new Date("2021/8/8 00:00:00")),
							clickCount: 900
						},
						{
							name: "基礎からわかる、Vue.jsのテスト",
							url: "https://www.codegrid.net/series/2018-vue-testing",
							tag: "Vue, テスト",
							registrationDate: this.formatDate(new Date("2021/11/1 00:00:00")),
							clickCount: 0
						},
						{
							name: "Quick Bookmark",
							url: "https://github.com/yasugahira0810/quickbookmark",
							tag: "ポータル, ブックマーク, VUE",
							registrationDate: this.formatDate(new Date("2000/4/4 00:00:00")),
							lastAccessDate: this.formatDate(new Date("2000/4/4 00:01:00")),
							clickCount: 100000
						},
						{
							name: "Vue JS Formatter",
							url: "https://mtp.tools/formatters/vue-formatter",
							tag: "Vue, フォーマッター",
							registrationDate: this.formatDate(new Date("2021/8/1 00:00:00")),
							clickCount: 0
						},
						{
							name: "Vue.js ユニットテストの基本まとめ",
							url: "https://qiita.com/kskinaba/items/d23259060e6e13b7353c",
							tag: "vue, ユニットテスト, Qiita",
							registrationDate: this.formatDate(new Date("2020/12/31 23:59:59")),
							lastAccessDate: this.formatDate(new Date()),
							clickCount: 1
						}
					];
					this.saveItems();
				}
			}
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
		// resetGlobalSearch() {
		// 	this.$refs['my-table'].globalSearchTerm = ''
		// },
		importItems() {
			this.items = this.items.concat(JSON.parse(this.itemsArray));
			this.itemsArray = "";
			this.saveItems();
		},
		toggleAccordion() {
			this.isOpened = !this.isOpened;
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

<style>
.item {
	color: #42b983;
}
</style>
