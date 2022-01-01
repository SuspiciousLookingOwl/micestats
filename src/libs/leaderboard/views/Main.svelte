<script>
	import { Text } from "@components";
	import { _ } from "svelte-i18n";
	import { LeaderboardCard } from "../components";
</script>

<div class="flex flex-col">
	<Text variant="title1" class="text-shadow-md font-brand text-center">Leaderboards</Text>

	<div class="grid grid-cols-1 lg:grid-cols-2 lg:space-x-4 space-y-8 lg:space-y-0 mt-16 mx-auto">
		<LeaderboardCard
			title={$_("leaderboard.playerLeaderboards")}
			image="/img/player_leaderboard.jpg"
			href="/leaderboards/player"
		/>
		<LeaderboardCard
			title={$_("leaderboard.tribeLeaderboards")}
			image="/img/tribe_leaderboard.jpg"
			href="/leaderboards/tribe"
		/>
	</div>
</div>
