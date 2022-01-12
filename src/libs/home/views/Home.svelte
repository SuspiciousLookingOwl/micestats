<script lang="ts">
	import { SearchInput } from "@libs/app";
	import { LeaderboardCategory, useLeaderboard } from "@libs/leaderboard";
	import { onMount } from "svelte";
	import { _ } from "svelte-i18n";
	import { DiscordWidget, Leaderboard, Link } from "../components";

	const {
		leaderboardValue: playerLeaderboardValue,
		isFetchingLeaderboard: isFetchingPlayerLeaderboard,
		...playerLeaderboard
	} = useLeaderboard({ category: LeaderboardCategory.PLAYER, limit: 10 });
	const {
		leaderboardValue: tribeLeaderboardValue,
		isFetchingLeaderboard: isFetchingTribeLeaderboard,
		...tribeLeaderboard
	} = useLeaderboard({ category: LeaderboardCategory.TRIBE, limit: 10 });
	let isSearchFocused = false;

	onMount(() => {
		playerLeaderboard.fetch();
		tribeLeaderboard.fetch();
	});

	$: links = [
		{
			text: $_("home.play"),
			icon: "steam",
			href: "steam://rungameid/335240",
			fallback: "https://store.steampowered.com/app/335240/Transformice/",
			large: true,
		},
		{
			text: $_("home.leaderboards"),
			icon: "cup",
			href: "/leaderboards",
		},
		{
			text: "Atelier801",
			icon: "hyperlink",
			href: "https://atelier801.com",
			redirect: false,
		},
	] as const;
</script>

<div class="bg-primary-600 w-full h-12 absolute top-0 left-0 lg:hidden rounded-b-xl" />

<div class="flex flex-col space-y-4 2xl:space-y-8 py-4 md:py-0">
	<SearchInput bind:isFocused={isSearchFocused} />

	<div
		class="grid grid-cols-1 lg:grid-cols-3 lg:space-x-2 space-y-2 lg:space-y-0"
		class:blur={isSearchFocused}
		class:opacity-20={isSearchFocused}
	>
		<Leaderboard
			title={$_("home.topPlayers")}
			items={$playerLeaderboardValue}
			isLoading={$isFetchingPlayerLeaderboard}
		/>
		<Leaderboard
			title={$_("home.topTribes")}
			items={$tribeLeaderboardValue}
			isLoading={$isFetchingTribeLeaderboard}
		/>
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
