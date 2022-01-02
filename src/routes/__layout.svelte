<script lang="ts" context="module">
	import { browser } from "$app/env";
	import { Text, TransitionedRoutes } from "@components";
	import { Background, BottomNavigator } from "@libs/app";
	import NavigationBar from "@libs/app/components/NavigationBar/NavigationBar.svelte";
	import type { Load } from "@sveltejs/kit";
	import { addMessages, getLocaleFromQueryString, init, _ } from "svelte-i18n";
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

	const routes = [
		{
			name: $_("nav.home"),
			path: "/",
			exact: true,
		},
		{
			name: $_("nav.leaderboards"),
			path: "/leaderboards",
		},
		{
			name: $_("nav.search"),
			path: "/search",
		},
		{
			name: $_("nav.about"),
			path: "/about",
		},
	];
</script>

<svelte:head>
	<title>Cheeseformice</title>
</svelte:head>

<Background />

<div class="w-full max-w-7xl mx-auto px-2 md:px-4 py-4 md:space-y-2 xl:space-y-4 2xl:space-y-8">
	<div class="hidden lg:block">
		<NavigationBar {routes}>
			<a href="/" slot="right">
				<Text variant="title2" class="text-shadow-md font-brand text-center">
					Cheeseformice
				</Text>
			</a>
		</NavigationBar>
	</div>

	<TransitionedRoutes {path}>
		<slot />
	</TransitionedRoutes>
</div>

<div class="lg:hidden">
	<BottomNavigator />
</div>
