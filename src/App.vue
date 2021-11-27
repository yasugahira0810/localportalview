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

      <v-btn icon>
				<v-icon>mdi-table</v-icon>
			</v-btn>

      <v-btn icon>
				<v-icon>mdi-plus</v-icon>
			</v-btn>

      <v-btn icon>
				<v-icon>mdi-arrow-collapse-down</v-icon>
			</v-btn>

			<v-btn icon>
				<v-icon>mdi-arrow-collapse-up</v-icon>
			</v-btn>

			<v-btn icon>
				<v-icon>mdi-information-outline</v-icon>
			</v-btn>

		</v-app-bar>

		<v-main>
			<SearchTable />
		</v-main>
	</v-app>
</template>

<script>
import SearchTable from "./components/SearchTable";

export default {
	name: "App",

	components: {
		SearchTable
	},

	data: () => ({
		//
	})
};
</script>
