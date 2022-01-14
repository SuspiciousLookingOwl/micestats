<script lang="ts">
	import { goto } from "$app/navigation";
	import { Icon, Spinner, Text } from "@components";
	import type { BasePlayerEntity } from "@entities";
	import { searchHistory } from "@libs/app";
	import { fly, type FlyParams } from "svelte/transition";
	import SearchResultList from "./SearchResultList.svelte";

	const flyAnimation: FlyParams = { y: -10, duration: 150 };

	//#region props
	export let players: BasePlayerEntity[] = [];
	export let isFetching = false;
	export let keyword: string;
	//#endregion

	//#region state
	let selectedIndex = -1;
	$: if (players) selectedIndex = -1; // reset on change
	$: allPlayers = [...players, ...$searchHistory];
	//#endregion

	//#region event handlers
	const onBodyKeyDown = (e: KeyboardEvent) => {
		if (e.key === "ArrowDown" && selectedIndex < allPlayers.length - 1) ++selectedIndex;
		if (e.key === "ArrowUp" && selectedIndex > 0) --selectedIndex;
		if (e.key === "Enter") {
			if (selectedIndex >= 0) navigate(allPlayers[selectedIndex]);
			else if (allPlayers[0]) navigate(allPlayers[0]);
		}
	};

	const onClearSearchHistory = () => {
		searchHistory.set([]);
	};
	//#endregion

	//#region methods
	const navigate = async (player: BasePlayerEntity) => {
		await goto(`/p/${player.slugName}`);
		searchHistory.push(player);
	};
	//#endregion
</script>

<svelte:body on:keydown={onBodyKeyDown} />

{#if allPlayers.length || isFetching}
	<div in:fly={flyAnimation} out:fly={flyAnimation} class="search-container">
		<div class="search-inner-container">
			{#if isFetching}
				<SearchResultList clickable={false}>
					<div class="flex align-middle justify-center py-2">
						<Spinner variant="dots" />
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
						<Text variant="subtitle2" class="font-medium">
							{player.name}
						</Text>
					</SearchResultList>
				{/each}
			{/if}

			{#if $searchHistory.length}
				<div class="flex py-1 mt-2 items-center justify-between space-x-2">
					<Text variant="body2">Search history</Text>
					<div class="flex-grow border-b border-neutral-700" />
					<div
						on:click={onClearSearchHistory}
						class="flex items-center space-x-2 py-1 px-2 rounded cursor-pointer hover:bg-white hover:bg-opacity-10"
					>
						<Text variant="body2">Clear</Text>
						<Icon name="close" size="sm" class="fill-neutral-300" />
					</div>
				</div>
			{/if}

			{#each $searchHistory as player, i}
				<SearchResultList
					isSelected={selectedIndex === i + players.length}
					on:click={() => navigate(player)}
				>
					<div class="flex flex-row items-center space-x-4">
						<Icon name="history" size="lg" class="fill-neutral-500" />
						<Text variant="subtitle2" class="font-medium">
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
