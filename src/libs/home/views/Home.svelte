<script lang="ts">
	import { Text } from "@components";
	import { SearchInput } from "@libs/app";
	import { onMount } from "svelte";
	import { _ } from "svelte-i18n";
	import { DiscordWidget, Leaderboard, Link } from "../components";
	import { usePlayerLeaderboard, useTribeLeaderboard } from "../stores";

	const { playerLeaderboardValue, isFetchingPlayerLeaderboard, ...playerLeaderboard } =
		usePlayerLeaderboard();
	const { tribeLeaderboardValue, isFetchingTribeLeaderboard, ...tribeLeaderboard } =
		useTribeLeaderboard();
	let isSearchFocused = false;

	onMount(async () => {
		playerLeaderboard.fetch();
		tribeLeaderboard.fetch();
	});

	$: links = [
		{
			text: $_("home.play"),
			icon: "steam",
			href: "steam://rungameid/335240",
			large: true,
		},
		{
			text: $_("home.leaderboard"),
			icon: "cup",
			href: "/leaderboard",
		},
		{
			text: "Atelier801",
			icon: "hyperlink",
			href: "https://atelier801.com",
			redirect: false,
		},
	] as const;
</script>

<div class="flex flex-col space-y-4 2xl:space-y-8">
	<Text variant="title1" class="text-shadow-md font-brand text-center">CheeseForMice</Text>

	<SearchInput bind:isFocused={isSearchFocused} />

	<div
		class="grid grid-cols-1 lg:grid-cols-3 lg:space-x-2 space-y-2 lg:space-y-0 transition-all duration-200"
		class:blur={isSearchFocused}
		class:opacity-20={isSearchFocused}
	>
		<Leaderboard title={$_("home.topPlayers")} items={$playerLeaderboardValue} />
		<Leaderboard title={$_("home.topTribes")} items={$tribeLeaderboardValue} />
		<div class="flex flex-col space-y-2 pb-2 lg:pb-0 order-first lg:order-last">
			{#each links as link}
				<Link {...link} />
			{/each}
			<div class="flex-auto">
				<DiscordWidget />
			</div>
		</div>
	</div>
</div>
