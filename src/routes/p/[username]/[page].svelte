<script lang="ts" context="module">
	import type { PlayerEntity } from "@entities";
	import { background } from "@libs/app";
	import { Outfits, Profile, Stats, Titles } from "@libs/profile";
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
		},
		...($profile.shop.outfits.length
			? [
					{
						name: "outfits",
						component: Outfits,
					},
			  ]
			: []),
		{
			name: "titles",
			component: Titles,
		},
		{
			name: "shaman",
			component: Stats,
		},
		{
			name: "mouse",
			component: Stats,
		},
		{
			name: "racing",
			component: Stats,
		},
		{
			name: "survivor",
			component: Stats,
		},
		{
			name: "defilante",
			component: Stats,
		},
	];

	$: activePageIndex = pages.findIndex((p) => p.name === page);
	$: activePage = activePageIndex >= 0 ? pages[activePageIndex] : undefined;
	$: background.setXOffset(Math.max(activePageIndex * 0.1, 0));
</script>

<div />

{#if activePage}
	<svelte:component this={activePage.component} profile={$profile} type={activePage.name} />
{:else}
	<!-- default view -->
	<Profile profile={$profile} />
{/if}
