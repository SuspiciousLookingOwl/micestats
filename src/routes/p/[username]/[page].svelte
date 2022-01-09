<script lang="ts" context="module">
	import type { PlayerEntity } from "@entities";
	import { background } from "@libs/app";
	import { Outfits, Profile, Stats } from "@libs/profile";
	import type { Load } from "@sveltejs/kit";
	import { getContext } from "svelte";
	import type { Writable } from "svelte/store";

	export const load: Load = ({ page }) => {
		return {
			props: {
				page: page.params.page,
			},
		};
	};
</script>

<script lang="ts">
	const profile = getContext<Writable<PlayerEntity>>("profile");

	//#region props
	export let page = "";
	//#endregion

	const pages = [
		{
			name: "profile",
			component: Profile,
			backgroundOffset: 0,
		},
		{
			name: "outfits",
			component: Outfits,
			backgroundOffset: 0.1,
		},
		{
			name: "shaman",
			component: Stats,
			backgroundOffset: 0.2,
		},
		{
			name: "mouse",
			component: Stats,
			backgroundOffset: 0.3,
		},
		{
			name: "racing",
			component: Stats,
			backgroundOffset: 0.4,
		},
		{
			name: "survivor",
			component: Stats,
			backgroundOffset: 0.5,
		},
		{
			name: "defilante",
			component: Stats,
			backgroundOffset: 0.6,
		},
	];

	$: activePage = pages.find((p) => p.name === page);
	$: background.setXOffset(activePage?.backgroundOffset || 0);
</script>

<div />

{#if activePage}
	<svelte:component this={activePage.component} profile={$profile} type={activePage.name} />
{:else}
	<!-- default view -->
	<Profile profile={$profile} />
{/if}
