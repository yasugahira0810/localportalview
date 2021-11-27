<template>
	<v-app>
		<v-app-bar app color="primary" dark>
			<div class="d-flex align-center">
				<v-img
					alt="Vuetify Logo"
					class="shrink mr-2"
					contain
					src="../media/images/quickbookmark_logo.png"
					transition="scale-transition"
					width="40"
				/>

				<v-img
					alt="Vuetify Name"
					class="shrink mt-1 hidden-sm-and-down"
					contain
					min-width="100"
					src="../media/images/quickbookmark_title.png"
					width="250"
				/>
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