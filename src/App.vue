<template>
	<div>
		<h1>Quick Bookmark</h1>
		<h2>検索用テーブル</h2>
		<vue-good-table
			@on-selected-rows-change="selectionChanged"
			@on-row-click="onRowClick"
			ref="my-table"
			:select-options="{
				enabled: true,
				selectOnCheckboxOnly: true
			}"
			:columns="columns"
			:rows="items"
			:search-options="{
				enabled: true,
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
				<span v-if="isEditable">
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
		<h2>登録用フォーム</h2>
		名前：<input v-model="newItemName" /> URL：
		<input v-model="newItemUrl" /> タグ：
		<input v-model="newItemTag" />
		<button @click="addItem">Submit</button>
		<h2 class="Accordion-Item" @click="toggleAccordion()">登録内容表示</h2>
		<pre class="Accordion-Item" v-if="isOpened"> {{ items | pretty }}</pre>
		<h2>JSONインポート用フォーム</h2>
		<input v-model="itemsArray" />
		<button @click="importItems">Import</button><br />
		<h2>データ初期化用フォーム</h2>
		<button @click="initializeItems" id="initialize">Initialize</button>
	</div>
</template>

<script>
// import the styles
import "vue-good-table/dist/vue-good-table.css";
import { VueGoodTable } from "vue-good-table";

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
			isOpened: false
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

			this.newItemregistrationDate = new Date().toLocaleString({
				timeZone: "Asia/Tokyo"
			});

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
			this.isEditable = false;
		},
		initializeItems() {
			if (window.confirm("登録データを全て削除します。よろしいですか？")) {
				if (window.confirm("本当によろしいですか？")) {
					this.items = [
						{
							name: "localportal",
							url: "https://yasugahira0810.github.io/localportal/#/",
							tag: "ポータル",
							registrationDate: "2021/7/18 16:42:12",
							lastAccessDate: "2021/7/20 16:42:12",
							clickCount: 5
						},
						{
							name: "vue-good-table",
							url: "https://xaksis.github.io/vue-good-table/",
							tag: "Vue",
							registrationDate: "1990/1/1 11:11:11",
							clickCount: 100
						},
						{
							name: "基礎からわかる、Vue.jsのテスト",
							url: "https://www.codegrid.net/series/2018-vue-testing",
							tag: "Vue, テスト",
							registrationDate: new Date().toLocaleString({ timeZone: "Asia/Tokyo" }),
							clickCount: 20
						},
						{
							name: "Vue JS Formatter",
							url: "https://mtp.tools/formatters/vue-formatter",
							tag: "Vue, フォーマッター",
							registrationDate: "2000/4/4 00:00:00",
							lastAccessDate: "2001/5/5 00:00:00",
							clickCount: 12
						}
					];
					this.saveItems();
				}
			}
		},
		jumpToUrl(index) {
			this.items[index].lastAccessDate = new Date().toLocaleString({
				timeZone: "Asia/Tokyo"
			});
			this.items[index].clickCount++;
			this.saveItems();
			window.open(this.items[index].url, "_blank");
		},
		importItems() {
			this.items = this.items.concat(JSON.parse(this.itemsArray));
			this.itemsArray = "";
			this.saveItems();
		},
		toggleAccordion() {
			this.isOpened = !this.isOpened;
		},
		onRowClick() {
			this.isEditable = false;
		}
	}
};
</script>

<style>
.item {
	color: #42b983;
}
</style>
