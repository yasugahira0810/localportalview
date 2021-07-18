<template>
	<div>
		<h2>俺のブックマーク</h2>
		名前：<input v-model="newItemName" /> URL：
		<input v-model="newItemUrl" /> タグ：
		<input v-model="newItemTag" />
		<button @click="addItem">Submit</button>
		<vue-good-table
			:columns="columns"
			:rows="items"
			:line-numbers="true"
			:search-options="{
				enabled: true,
				placeholder: '絞り込み検索'
			}"
		>
			<template slot="table-row" slot-scope="props">
				<span v-if="props.column.field == 'click'">
					<button @click="jumpToUrl(props.row.originalIndex)">Click</button>
				</span>
				<span v-else-if="props.column.field == 'delete'">
					<button @click="removeItem(props.row.originalIndex)">Delete</button>
				</span>
				<span v-else>
					<div v-if="!isEditable" v-on:dblclick="isEditable = true">
						{{ props.formattedRow[props.column.field] }}
					</div>
					<div v-else>
						<input
							type="text"
							v-model="props.formattedRow[props.column.field]"
							v-on:blur="updateItem(props)"
						/>
					</div>
				</span>
			</template>
		</vue-good-table>
		<pre> {{ items | pretty }}</pre>
		インポート：<input v-model="itemsArray" />
		<button @click="importItems">Import</button><br />
		<button @click="initializeItems">Initialize</button>
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
					label: "リンク",
					field: "click"
				},
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
					label: "クリック回数",
					field: "clickCount",
					type: "number"
				},
				{
					label: "削除",
					field: "delete"
				}
			],
			items: [],
			index: "",

			newItemName: null,
			newItemUrl: null,
			newItemTag: null,
			newItemregistrationDate: null,
			isEditable: false,
			itemsArray: []
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
			if (!this.newItemName || !this.newItemUrl || !this.newItemTag) {
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
							registrationDate: new Date().toLocaleString({ timeZone: "Asia/Tokyo" }),
							clickCount: 0
						},
						{
							name: "vue-good-table",
							url: "https://xaksis.github.io/vue-good-table/",
							tag: "Vue",
							registrationDate: new Date().toLocaleString({ timeZone: "Asia/Tokyo" }),
							clickCount: 0
						},
						{
							name: "基礎からわかる、Vue.jsのテスト",
							url: "https://www.codegrid.net/series/2018-vue-testing",
							tag: "Vue",
							registrationDate: new Date().toLocaleString({ timeZone: "Asia/Tokyo" }),
							clickCount: 0
						}
					];
					this.saveItems();
				}
			}
		},
		jumpToUrl(index) {
			this.items[index].clickCount++;
			this.saveItems();
			window.open(this.items[index].url, "_blank");
		},
		importItems() {
			this.items = this.items.concat(JSON.parse(this.itemsArray));
			this.itemsArray = "";
			this.saveItems();
		}
	}
};
</script>

<style>
.item {
	color: #42b983;
}
</style>
