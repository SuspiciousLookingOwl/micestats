import type { PlayerLeaderboard, TribeLeaderboard } from "@api";
import { useFetch, usePagination, type UsePagination } from "@stores";
import { get, type Writable } from "svelte/store";
import {
	fetchPlayerLeaderboard,
	fetchTribeLeaderboard,
	type FetchLeaderboardOptions,
} from "./fetch";

export enum LeaderboardType {
	PLAYER,
	TRIBE,
}

type LeaderboardTypeValue<T extends LeaderboardType> = T extends LeaderboardType.PLAYER
	? PlayerLeaderboard[]
	: TribeLeaderboard[];

interface UseLeaderboard<T extends LeaderboardType> {
	pagination: UsePagination;
	fetch: () => void;
	leaderboardValue: Writable<LeaderboardTypeValue<T>>;
	isFetchingLeaderboard: Writable<boolean>;
}

export const useLeaderboard = <T extends LeaderboardType>(type: T): UseLeaderboard<T> => {
	const pagination = usePagination(1);

	const fetchFn = async (): Promise<LeaderboardTypeValue<T>> => {
		const fetchOptions: FetchLeaderboardOptions = {
			page: get(pagination.page),
			limit: get(pagination.limit),
			order: "stats",
			period: "overall",
		};

		const fetchLeaderboard =
			type === LeaderboardType.PLAYER ? fetchPlayerLeaderboard : fetchTribeLeaderboard;
		const res = await fetchLeaderboard(fetchOptions);
		pagination.setTotal(res.total);

		return res.page as LeaderboardTypeValue<T>;
	};

	const { value, isFetching, fetch } = useFetch<LeaderboardTypeValue<T>>([], fetchFn, {
		keys: [pagination.page, pagination.limit],
	});

	return {
		pagination,
		leaderboardValue: value,
		isFetchingLeaderboard: isFetching,
		fetch,
	};
};
