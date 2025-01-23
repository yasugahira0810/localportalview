<!--
	このコンポーネントはアプリケーションのメインレイアウトを定義します。
	- <v-app>: Vuetifyのアプリケーションラッパーコンポーネント。
	- <v-app-bar>: アプリケーションのトップバーを表示します。
		- <router-link>: ルーターリンクを使用して、ロゴとタイトル画像を表示します。
		- <v-img>: ロゴとタイトル画像を表示します。
		- <v-spacer>: スペーサーを使用して、ボタンを右側に配置します。
		- <v-btn>: ナビゲーションボタンを表示します。
			- to属性: ルートパスを指定します。
			- <v-icon>: ボタンのアイコンを表示します。
	- <v-content>: アプリケーションのメインコンテンツエリアを表示します。
		- <router-view>: ルーターのビューコンポーネントを表示します。
-->
<template>
	<v-app>
		<v-app-bar app color="primary" dark>
			<div class="d-flex align-center">
				<router-link to="/">
					<v-img
						alt="Vuetify Logo"
						class="shrink mr-2"
						contain
						src="@/assets/quickbookmark_logo.png"
						transition="scale-transition"
						width="40"
					/>
				</router-link>

				<router-link to="/">
					<v-img
						alt="Vuetify Name"
						class="shrink mt-1 hidden-sm-and-down"
						contain
						min-width="100"
						src="@/assets/quickbookmark_title.png"
						width="250"
					/>
				</router-link>
			</div>

			<v-spacer></v-spacer>

			<v-btn to="/" icon>
				<v-icon>mdi-table</v-icon>
			</v-btn>

			<v-btn to="AddLink" icon>
				<v-icon>mdi-plus</v-icon>
			</v-btn>

			<v-btn to="ShowLinks" icon>
				<v-icon>mdi-application-braces-outline</v-icon>
			</v-btn>

			<v-btn to="ImportLinks" icon>
				<v-icon>mdi-application-import</v-icon>
			</v-btn>

			<v-btn to="Initialize" icon>
				<v-icon>mdi-alert-box</v-icon>
			</v-btn>

			<v-btn to="HowToUse" icon>
				<v-icon>mdi-information-outline</v-icon>
			</v-btn>
		</v-app-bar>

		<v-content>
			<router-view />
		</v-content>
	</v-app>
</template>