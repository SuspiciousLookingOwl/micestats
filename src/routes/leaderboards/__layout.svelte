<script context="module" lang="ts">
	import { TransitionedRoutes } from "@components";
	import type { Load } from "@sveltejs/kit";
	import { _ } from "svelte-i18n";

	export const load: Load = async ({ page }) => {
		return { props: { path: page.path } };
	};
</script>

<script lang="ts">
	export let path: string;
</script>

<svelte:head>
	<title>{$_("home.leaderboards")} | Cheeseformice</title>
</svelte:head>

<TransitionedRoutes level={2} {path}>
	<slot />
</TransitionedRoutes>
