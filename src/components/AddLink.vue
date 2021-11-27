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
	}
};
</script>