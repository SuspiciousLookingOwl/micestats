<script lang="ts">
	import { goto } from "$app/navigation";
	import type { BasePlayer } from "@api";
	import { Spinner, Text } from "@components";
	import { fly, type FlyParams } from "svelte/transition";

	export let players: BasePlayer[] = [];
	export let isFetching = false;
	let selectedIndex = -1;

	const onBodyKeyDown = (e: KeyboardEvent) => {
		if (e.key === "ArrowDown" && selectedIndex < players.length - 1) ++selectedIndex;
		if (e.key === "ArrowUp" && selectedIndex > 0) --selectedIndex;
		if (e.key === "Enter") {
			if (selectedIndex >= 0) goto("/p/" + players[selectedIndex].name.replace("#", "-"));
			else if (players[0]) goto("/p/" + players[0].name.replace("#", "-"));
		}
	};

	const flyAnimation: FlyParams = { y: -10, duration: 150 };
</script>

<svelte:body on:keydown={onBodyKeyDown} />

<div in:fly={flyAnimation} out:fly={flyAnimation} class="bg-neutral-800 bg-opacity-70 rounded p-4">
	{#if isFetching}
		<div in:fly={flyAnimation} class="flex align-middle justify-center">
			<Spinner />
		</div>
	{:else if players.length === 0}
		<div in:fly={flyAnimation}>No search results found.</div>
	{:else}
		<div class="flex flex-col -my-4">
			{#each players as player, i}
				<a
					class="cursor-pointer p-4 -mx-4"
					class:bg-white={selectedIndex === i}
					class:bg-opacity-20={selectedIndex === i}
					href="/p/{player.name.replace('#', '-')}"
					in:fly={flyAnimation}
				>
					<Text variant="subtitle1" class="font-semibold">
						{player.name}
					</Text>
				</a>
			{/each}
		</div>
	{/if}
</div>
