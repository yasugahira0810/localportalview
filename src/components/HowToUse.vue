<template>
	<v-container>
		<p class="text-h4 font-weight-black" id="how-to-use">Quick Bookmarkの使い方</p>
		<p class="text-h5 font-weight-black" id="how-to-use">ブックマーク検索</p>
		<p class="font-weight-medium">ユーザは登録したブックマークを絞り込み検索して、リンク先へジャンプできます。<br>
		検索対象は「名前」と「タグ」です。登録時とひらがな・カタカナが異なっていても、検索結果には表示されます。<br>
		またテーブルをダブルクリックすることで、登録内容を更新できます。</p>
		<p class="text-h5 font-weight-black" id="how-to-use">ブックマーク登録</p>
		<p class="font-weight-medium">ユーザはブックマークを登録できます。Quick Bookmarkは登録内容をlocal storageに保存します。</p>
		<p class="text-h5 font-weight-black" id="how-to-use">ブックマーク内容表示</p>
		<p class="font-weight-medium">ユーザはブックマークの内容を確認できます。ユーザは表示内容をファイルに保存しておくことで、ブックマークをバックアップできます。<br>バックアップした内容は、ブックマーク一括登録から再登録できます。Quick Bookmarkはブックマークの内容をJSON形式で表示します。</p>
		<p class="text-h5 font-weight-black" id="how-to-use">ブックマーク一括登録</p>
		<p class="font-weight-medium">ユーザはブックマークを一括登録できます。ブックマーク内容表示と組み合わせることで、バックアップしたブックマークを再登録する用途で使えます。<br>フォーマットは以下の通りです。</p>
		<pre>
			[
				{
					"name": "localportal",
					"url": "https://yasugahira0810.github.io/localportal/#/",
					"tag": "ポータル, ブックマーク, Angular",
					"registrationDate": "2021/01/01 00:00:00",
					"lastAccessDate": "2021/07/20 16:42:12",
					"clickCount": 50000
				},
				{
					"name": "vue-good-table",
					"url": "https://xaksis.github.io/vue-good-table/",
					"tag": "Vue",
					"registrationDate": "1990/01/01 11:11:11",
					"lastAccessDate": "2021/08/08 00:00:00",
					"clickCount": 900
				}
			]
		</pre>
		<p class="text-h5 font-weight-black" id="how-to-use">ブックマーク初期化</p>
		<p class="font-weight-medium">ユーザはブックマークを初期化できます。Quick Bookmarkはそれまでの登録内容を全て破棄します。</p>
		<p class="text-h4 font-weight-black" id="how-to-use">デモ</p>
<v-expansion-panels>
    <v-expansion-panel
      v-for="list in lists"
      :key="list.id"
    >
      <v-expansion-panel-header>
        {{ list.title }}
      </v-expansion-panel-header>
      <v-expansion-panel-content>
				{{ list.text }}
				<v-img :src="require(`@/assets/${list.movie}.gif`)"></v-img>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
	</v-container>
</template>

<script>
export default {
	data() {
		return {
			lists: [
          {id: 1, title: 'デモ① ブックマーク検索', movie: 'demo01_search', text: 'ブックマークを検索して遷移するデモです。ここでは2つの遷移の仕方をデモしています。1つめはブラウザ上でGitHubのQuick Bookmarkのリポジトリに遷移しています。2つめはブックマークをコピーして、Terminalのopenコマンドで端末のフォルダを開いています。'},
          {id: 2, title: 'デモ② ブックマーク更新', movie: 'demo02_update'},
          {id: 3, title: 'デモ③ ブックマーク登録', movie: 'demo03_regist'},
          {id: 4, title: 'デモ④ ブックマーク登録', movie: 'demo04_restore'},
        ]
		}
	}
};
</script>