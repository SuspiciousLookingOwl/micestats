<script>
	import { Text } from "@components";
	import { _ } from "svelte-i18n";
	import { LeaderboardCard } from "../components";
</script>

<div class="flex flex-col">
	<Text variant="title2" class="text-shadow-md font-brand text-center">Leaderboards</Text>

	<div class="grid grid-cols-1 lg:grid-cols-2 lg:space-x-4 space-y-8 lg:space-y-0 mt-8 mx-auto">
		<LeaderboardCard
			title={$_("leaderboard.playerLeaderboards")}
			image="/img/bg/player_leaderboard.jpg"
			href="/leaderboards/player"
		/>
		<LeaderboardCard
			title={$_("leaderboard.tribeLeaderboards")}
			image="/img/bg/tribe_leaderboard.jpg"
			href="/leaderboards/tribe"
		/>
	</div>
</div>
