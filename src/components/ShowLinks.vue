<template>
	<v-container>
		<p class="text-h4 font-weight-black" id="show-links">ブックマーク内容表示</p>
		<pre> {{ items | pretty }}</pre>
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
			isOpened: true,
			myfunc: "",
			selectionChanged: ""
		};
	},
	filters: {
		pretty: function(value) {
			return JSON.stringify(value, null, 2);
		}
	},
	mounted() {
		this.items = JSON.parse(localStorage.getItem("items"));
	}
};
</script>