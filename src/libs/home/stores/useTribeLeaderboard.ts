import { TribesService, type TribeLeaderboard } from "@api";
import { useFetch } from "@stores";
import type { Writable } from "svelte/store";

interface UseTribeLeaderboard {
	fetch: () => void;
	tribeLeaderboardValue: Writable<TribeLeaderboard[]>;
	isFetchingTribeLeaderboard: Writable<boolean>;
}

async function fetchTribeLeaderboard() {
	const response = await TribesService.getLeaderboard("stats", "overall", { limit: 10 });
	if (response.status !== 200) return [];
	return response.data.page.sort((a, b) => b.score - a.score);
}

export const useTribeLeaderboard = (): UseTribeLeaderboard => {
	const {
		value: tribeLeaderboardValue,
		isFetching: isFetchingTribeLeaderboard,
		...tribeLeaderboard
	} = useFetch<TribeLeaderboard[]>([], fetchTribeLeaderboard);

	return {
		tribeLeaderboardValue,
		isFetchingTribeLeaderboard,
		...tribeLeaderboard,
	};
};
