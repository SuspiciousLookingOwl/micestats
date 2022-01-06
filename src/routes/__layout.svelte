<script lang="ts" context="module">
	import { browser } from "$app/env";
	import { TransitionedRoutes } from "@components";
	import { AppNavigationBar, Background, BottomNavigator } from "@libs/app";
	import type { Load } from "@sveltejs/kit";
	import { addMessages, getLocaleFromQueryString, init } from "svelte-i18n";
	import "../app.css";
	import locales from "../locales";

	// TODO do async loading https://github.com/kaisermann/svelte-i18n/blob/main/docs/Getting%20Started.md#32-asynchronous
	Object.entries(locales).forEach((l) => addMessages(...l));

	if (browser) {
		init({
			fallbackLocale: "en",
			initialLocale: getLocaleFromQueryString("lang"),
		});
	}

	export const load: Load = async ({ page }) => {
		if (!browser) {
			init({
				fallbackLocale: "en",
				initialLocale: page.query.get("lang"),
			});
		}

		return { props: { path: page.path } };
	};
</script>

<script lang="ts">
	export let path: string;
</script>

<svelte:head>
	<title>Cheeseformice</title>
</svelte:head>

<Background />

<div class="w-full max-w-7xl mx-auto px-2 md:px-4 py-4 md:space-y-4 2xl:space-y-8">
	<AppNavigationBar />

	<TransitionedRoutes {path}>
		<slot />
	</TransitionedRoutes>
</div>

<div class="lg:hidden">
	<BottomNavigator />
</div>
