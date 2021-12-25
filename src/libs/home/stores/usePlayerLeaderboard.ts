import { PlayersService, type PlayerLeaderboard } from "@api";
import { useFetch } from "@stores";
import type { Writable } from "svelte/store";

interface UsePlayerLeaderboard {
	fetch: () => void;
	playerLeaderboardValue: Writable<PlayerLeaderboard[]>;
	isFetchingPlayerLeaderboard: Writable<boolean>;
}

async function fetchPlayerLeaderboard() {
	const response = await PlayersService.getLeaderboard("stats", "overall", { limit: 10 });
	if (response.status !== 200) return [];
	return response.data.page.sort((a, b) => b.score - a.score);
}

export const usePlayerLeaderboard = (): UsePlayerLeaderboard => {
	const {
		value: playerLeaderboardValue,
		isFetching: isFetchingPlayerLeaderboard,
		...playerLeaderboard
	} = useFetch<PlayerLeaderboard[]>([], fetchPlayerLeaderboard);

	return {
		playerLeaderboardValue,
		isFetchingPlayerLeaderboard,
		...playerLeaderboard,
	};
};
