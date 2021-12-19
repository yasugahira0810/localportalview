<template>
	<v-container>
		<p class="text-h4 font-weight-black" id="how-to-use">Quick Bookmarkの使い方</p>
		<p class="text-h5 font-weight-black" id="how-to-use">ブックマーク検索</p>
		<p class="font-weight-medium">ユーザは登録したブックマークを絞り込み検索して、リンク先へジャンプできます。<br>
		検索対象は「名前」と「タグ」です。登録時とひらがな・カタカナが異なっていても、検索結果には表示されます。<br>
		またテーブルをダブルクリックすることで、登録内容を更新できます。</p>
		<p class="text-h5 font-weight-black" id="how-to-use">ブックマーク登録</p>
		<p class="font-weight-medium">ユーザはブックマークを登録できます。Quick Bookmarkは登録内容をlocaltorageに保存します。</p>
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
				<p v-html="list.text"></p>
				<v-col cols="8">
				<v-img :src="require(`@/assets/${list.movie}.gif`)"></v-img>
				</v-col>
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
          {id: 1, title: 'デモ① ブックマークを検索する', movie: 'demo01_search', text: 'ここでは2つの遷移の仕方をデモしています。<br>1つめはブラウザ上でGitHubのQuick Bookmarkのリポジトリに遷移しています。<br>2つめはブックマークをコピーして、Terminalのopenコマンドで端末のフォルダを開いています。'},
          {id: 2, title: 'デモ② ブックマークを更新する', movie: 'demo02_update', text: 'ここでは登録済みのブックマークを更新する2つのユースケースをデモしています。<br>1つめは、アドベントカレンダーを「advent」とアルファベットで検索したところ、<br>ヒットしなかったので、今後のためにタグに「advent」を追加するデモです。<br>2つめは、2020年のアドベントカレンダーのURLを登録していたところ、<br>1年経って2021年のアドベントカレンダーのURLができたので、登録済みのURLを更新するデモです。'},
          {id: 3, title: 'デモ③ ブックマークを登録する', movie: 'demo03_regist', text: 'ここではタグに「yasugahira0810」という人名を設定して「Vue advent calendar」をブックマーク登録しています。<br>このように、ブックマーク登録時にそのURLやパスを登録するきっかけとなった人名をタグに設定しておくと、<br>登録名を忘れてもきっかけとなった人名で検索がヒットするので、検索しやすくておすすめです。'},
          {id: 4, title: 'デモ④ ブックマークをバックアップしておいて復旧する', movie: 'demo04_restore', text: 'ここでは「ブックマーク内容表示」と「ブックマーク一括登録」を使って、ブックマークを復旧するデモをしています。<br>まず「ブックマーク内容表示」でブックマークをコピーします。<br>（ここではコピーしたなので、本格的にバックアップを取る場合、コピーした内容をファイルに保存しておいてください。）<br>その後、登録済みのブックマークを全削除してから、「ブックマーク一括登録」にコピーしておいたブックマーク情報を<br>ペーストして「登録」ボタンを押すことで、ブックマークを復旧しています。'},
        ]
		}
	}
};
</script>