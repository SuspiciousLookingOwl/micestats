<script lang="ts">
	import { Card, Text } from "@components";
	import type { PlayerLeaderboardEntity, TribeLeaderboardEntity } from "@entities";
	import LeaderboardList from "./LeaderboardList.svelte";
	import LeaderboardListSkeleton from "./LeaderboardListSkeleton.svelte";

	type T = $$Generic<PlayerLeaderboardEntity | TribeLeaderboardEntity>;
	interface $$Props {
		title?: string;
		items?: T[];
		isLoading?: boolean;
		loaderCount?: number;
	}
	interface $$Slots {
		item: {
			item: T;
			index: number;
		};
	}

	export let title: string = "";
	export let items: T[] = [];
	export let isLoading = true;
	export let loaderCount = 10;
</script>

<Card>
	<Text variant="title4" class="font-brand text-shadow-md px-2">
		{title}
	</Text>

	<div class="w-full border-t border-white border-opacity-25 my-2" />

	<div class="flex flex-col w-full space-y-2">
		{#if isLoading}
			{#each Array(loaderCount) as _}
				<slot name="loader">
					<LeaderboardListSkeleton />
				</slot>
			{/each}
		{:else}
			{#each items as item, i}
				<slot name="item" {item} index={i}>
					<LeaderboardList {item} position={i + 1} />
				</slot>
			{/each}
		{/if}
	</div>
</Card>
