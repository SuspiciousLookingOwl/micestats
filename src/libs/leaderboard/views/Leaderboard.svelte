<script lang="ts">
	import type { LeaderboardType } from "@api";
	import { Select, Text, type Option } from "@components";
	import { _ } from "svelte-i18n";
	import { LeaderboardTable } from "../components";
	import { LeaderboardCategory, useLeaderboard } from "../stores";

	export let category: LeaderboardCategory = LeaderboardCategory.PLAYER;

	const { leaderboardValue, pagination, type, isFetchingLeaderboard } = useLeaderboard({
		category,
		limit: 50,
	});

	const leaderboardTypes = [
		"stats",
		"rounds",
		"cheese",
		"first",
		"bootcamp",
		"shaman",
		"racing",
		"survivor",
		"defilante",
		"overall",
	];

	let selectedType: Option = {
		label: $_(`leaderboard.${leaderboardTypes[0]}`),
		value: leaderboardTypes[0],
	};

	$: if (selectedType) {
		$type = selectedType.value as LeaderboardType;
	}

	$: options = <Option[]>leaderboardTypes.map((type) => ({
		label: $_(`leaderboard.${type}`),
		value: type,
	}));
</script>

<div class="text-center">
	<Text variant="title2" class="font-brand text-shadow-md">
		{$_(`leaderboard.${category}Leaderboards`)}
	</Text>
</div>

<Select {options} bind:value={selectedType} />

<LeaderboardTable
	limit={pagination.limit}
	page={pagination.page}
	isLoading={$isFetchingLeaderboard}
	data={$leaderboardValue}
	type={$type}
/>
