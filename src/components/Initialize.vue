<template>
	<v-container>
		<v-card-title class="font-weight-bold" id="initialization-form">データ初期化用フォーム</v-card-title>
		<v-row>
		<v-col cols="12" sm="2">
					<v-btn depressed color="error" id="initialize" @click="initializeItems">初期化</v-btn>
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