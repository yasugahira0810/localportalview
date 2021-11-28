<template>
	<v-container>
		<v-card-title class="font-weight-bold" id="import-json">JSONインポート用フォーム</v-card-title>
		<v-row>
		<v-col cols="12" sm="8">
		<v-text-field
						v-model="itemsArray"
						label="名前"
						name="itemsArray"
					></v-text-field>
		</v-col>
		<v-col cols="12" sm="2">
					<v-btn depressed color="primary" id="addItem" @click="importItems">登録</v-btn>
		</v-col>
		</v-row>
	</v-container>
</template>

<script>
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
	methods: {
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
		// resetGlobalSearch() {
		// 	this.$refs['my-table'].globalSearchTerm = ''
		// },
		importItems() {
			this.items = this.items.concat(JSON.parse(this.itemsArray));
			this.itemsArray = "";
			this.saveItems();
		},
		// COPYボタンでURLをコピーするためのメソッド
		writeToClipboard(text) {
			navigator.clipboard.writeText(text).catch(e => {
				console.error(e);
			});
		}
	}
};
</script>