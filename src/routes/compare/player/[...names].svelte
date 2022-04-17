<script lang="ts" context="module">
	import { goto } from "$app/navigation";
	import type { PlayerEntity } from "@entities";
	import { background } from "@libs/app";
	import { Player } from "@libs/compare";
	import type { Load } from "@sveltejs/kit";

	export const load: Load = ({ page }) => {
		return {
			props: {
				names: page.params.names.split("-vs-"),
			},
		};
	};
</script>

<script lang="ts">
	export let names: string[];
	let profiles: (PlayerEntity | null)[] = [];

	background.setXOffset(0.15);
	background.setScale();

	const onProfileUpdate = (updatedProfiles: (PlayerEntity | null)[]) => {
		const params = updatedProfiles
			.filter((p) => !!p)
			.map((p) => p?.slugName)
			.join("-vs-");

		profiles = updatedProfiles;

		goto("/compare/player/" + params);
	};
</script>

<svelte:head>
	<title>
		{profiles
			.filter((p) => !!p)
			.map((p) => p?.name)
			.join(" vs ") || "Compare"} | Micestats
	</title>
</svelte:head>

<Player
	defaultUsernames={names.map((n) => n.replace("-", "#"))}
	on:profileupdate={(ev) => onProfileUpdate(ev.detail.profiles)}
/>
