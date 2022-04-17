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

	background.setXOffset(0.15);
	background.setScale();

	const onUpdateProfile = (profiles: (PlayerEntity | null)[]) => {
		const params = profiles
			.filter((p) => !!p)
			.map((p) => p?.slugName)
			.join("-vs-");

		goto("/compare/player/" + params);
	};
</script>

<Player
	defaultUsernames={names.map((n) => n.replace("-", "#"))}
	on:updateprofile={(ev) => onUpdateProfile(ev.detail.profiles)}
/>
