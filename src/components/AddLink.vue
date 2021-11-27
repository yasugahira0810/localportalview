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
							registrationDate: "2021/01/01 00:00:00",
							lastAccessDate: "2021/07/20 16:42:12",
							clickCount: 50000
						},
						{
							name: "vue-good-table",
							url: "https://xaksis.github.io/vue-good-table/",
							tag: "Vue",
							registrationDate: "1990/01/01 11:11:11",
							lastAccessDate: "2021/08/08 00:00:00",
							clickCount: 900
						},
						{
							name: "基礎からわかる、Vue.jsのテスト",
							url: "https://www.codegrid.net/series/2018-vue-testing",
							tag: "Vue, テスト",
							registrationDate: "2021/11/01 00:00:00",
							clickCount: 0
						},
						{
							name: "Quick Bookmark",
							url: "https://github.com/yasugahira0810/quickbookmark",
							tag: "ポータル, ブックマーク, VUE",
							registrationDate: "2000/04/04 00:00:00",
							lastAccessDate: "2000/04/04 00:01:00",
							clickCount: 100000
						},
						{
							name: "Vue JS Formatter",
							url: "https://mtp.tools/formatters/vue-formatter",
							tag: "Vue, フォーマッター",
							registrationDate: "2021/08/01 00:00:00",
							clickCount: 0
						},
						{
							name: "Vue.js ユニットテストの基本まとめ",
							url: "https://qiita.com/kskinaba/items/d23259060e6e13b7353c",
							tag: "vue, ユニットテスト, Qiita",
							registrationDate: "2020/12/31 23:59:59",
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