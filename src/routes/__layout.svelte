<script lang="ts" context="module">
	import { browser } from "$app/env";
	import { TransitionedRoutes } from "@components";
	import { Background, BottomNavigator } from "@libs/app";
	import type { Load } from "@sveltejs/kit";
	import { addMessages, getLocaleFromQueryString, init } from "svelte-i18n";
	import "../app.css";
	import locales from "../locales";

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
	<title>CheeseForMice</title>
</svelte:head>

<Background />
<div class="w-full max-w-7xl mx-auto p-2 md:p-4">
	<TransitionedRoutes {path}>
		<slot />
	</TransitionedRoutes>
</div>
<BottomNavigator />
