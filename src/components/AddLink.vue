<template>
	<div>
		<h2 id="registration-form">登録用フォーム</h2>
		名前：<input name="newItemName" v-model="newItemName" /> URL：
		<input name="newItemUrl" v-model="newItemUrl" /> タグ：
		<input name="newItemTag" v-model="newItemTag" />
		<button id="addItem" @click="addItem">Submit</button>
	</div>
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
		// COPYボタンでURLをコピーするためのメソッド
		writeToClipboard(text) {
			navigator.clipboard.writeText(text).catch(e => {
				console.error(e);
			});
		},
		formatDate(date) {
			var sortableLocaleDate = date
				.toLocaleString("sv-SE", {
					timeZone: "Asia/Tokyo",
					year: "numeric",
					month: "numeric",
					day: "numeric",
					hour: "2-digit",
					minute: "2-digit"
				})
				.replace(/-/g, "/");
			return sortableLocaleDate;
		}
	}
};
</script>