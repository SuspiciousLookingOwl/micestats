<script lang="ts">
	import { goto } from "$app/navigation";
	import { Icon, Spinner, Text } from "@components";
	import type { BasePlayerEntity } from "@entities";
	import { searchHistory } from "@libs/app";
	import { fly, type FlyParams } from "svelte/transition";
	import SearchResultList from "./SearchResultList.svelte";

	export let players: BasePlayerEntity[] = [];
	export let isFetching = false;
	export let keyword: string;
	let selectedIndex = -1;

	// reset on change
	$: if (players) selectedIndex = -1;

	$: allPlayers = [...players, ...$searchHistory];

	const flyAnimation: FlyParams = { y: -10, duration: 150 };

	const onBodyKeyDown = (e: KeyboardEvent) => {
		if (e.key === "ArrowDown" && selectedIndex < allPlayers.length - 1) ++selectedIndex;
		if (e.key === "ArrowUp" && selectedIndex > 0) --selectedIndex;
		if (e.key === "Enter") {
			if (selectedIndex >= 0) navigate(allPlayers[selectedIndex]);
			else if (allPlayers[0]) navigate(allPlayers[0]);
		}
	};

	const navigate = async (player: BasePlayerEntity) => {
		await goto(`/p/${player.slugName}`);
		searchHistory.push(player);
	};
</script>

<svelte:body on:keydown={onBodyKeyDown} />

{#if allPlayers.length || isFetching}
	<div in:fly={flyAnimation} out:fly={flyAnimation} class="search-container">
		<div class="search-inner-container">
			{#if isFetching}
				<SearchResultList clickable={false}>
					<div class="flex align-middle justify-center">
						<Spinner />
					</div>
				</SearchResultList>
			{:else if !players.length && keyword}
				<SearchResultList clickable={false}>
					<Text variant="subtitle2" class="text-neutral-400">
						No search results found for <i>{keyword}</i>
					</Text>
				</SearchResultList>
			{:else}
				{#each players as player, i}
					<SearchResultList
						isSelected={selectedIndex === i}
						on:click={() => navigate(player)}
					>
						<Text variant="subtitle2" class="font-semibold">
							{player.name}
						</Text>
					</SearchResultList>
				{/each}
			{/if}

			{#if players.length && $searchHistory.length}
				<div class="border-t border-white border-opacity-10 my-2" />
			{/if}

			{#each $searchHistory as player, i}
				<SearchResultList
					isSelected={selectedIndex === i + players.length}
					on:click={() => navigate(player)}
				>
					<div class="flex flex-row items-center space-x-4">
						<Icon name="history" size="lg" class="fill-neutral-500" />
						<Text variant="subtitle2" class="font-semibold">
							{player.name}
						</Text>
					</div>
				</SearchResultList>
			{/each}
		</div>
	</div>
{/if}

<style lang="postcss">
	.search-container {
		@apply bg-neutral-800 bg-opacity-70 rounded p-4;
	}

	.search-inner-container {
		@apply flex flex-col -my-4;
	}
</style>
