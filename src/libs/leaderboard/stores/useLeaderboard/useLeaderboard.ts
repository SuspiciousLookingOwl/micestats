import type { LeaderboardPeriod, LeaderboardType } from "@api";
import type { PlayerLeaderboardEntity, TribeLeaderboardEntity } from "@entities";
import { useFetch, usePagination, type UsePagination } from "@stores";
import { get, writable, type Writable } from "svelte/store";
import {
	fetchPlayerLeaderboard,
	fetchTribeLeaderboard,
	type FetchLeaderboardOptions,
} from "./fetch";

export enum LeaderboardCategory {
	PLAYER = "player",
	TRIBE = "tribe",
}

type LeaderboardCategoryValue<T extends UseLeaderboardOptions> =
	T["category"] extends LeaderboardCategory.PLAYER
		? PlayerLeaderboardEntity[]
		: TribeLeaderboardEntity[];

interface UseLeaderboardOptions {
	category?: LeaderboardCategory;
	limit?: number;
}

interface UseLeaderboard<T extends UseLeaderboardOptions> {
	pagination: UsePagination;
	type: Writable<LeaderboardType>;
	period: Writable<LeaderboardPeriod>;
	fetch: () => void;
	leaderboardValue: Writable<LeaderboardCategoryValue<T>>;
	isFetchingLeaderboard: Writable<boolean>;
}

export const useLeaderboard = <T extends UseLeaderboardOptions>(options: T): UseLeaderboard<T> => {
	const pagination = usePagination({ limit: options.limit });
	const type = writable<LeaderboardType>("stats");
	const period = writable<LeaderboardPeriod>("overall");

	const fetchFn = async (): Promise<LeaderboardCategoryValue<T>> => {
		const fetchOptions: FetchLeaderboardOptions = {
			page: get(pagination.page),
			limit: get(pagination.limit),
			order: get(type),
			period: get(period),
		};

		const fetchLeaderboard =
			options.category === LeaderboardCategory.PLAYER
				? fetchPlayerLeaderboard
				: fetchTribeLeaderboard;
		const res = await fetchLeaderboard(fetchOptions);
		pagination.setTotal(res.total);

		return res.page as LeaderboardCategoryValue<T>;
	};

	const { value, isFetching, fetch } = useFetch<LeaderboardCategoryValue<T>>([], fetchFn, {
		keys: [pagination.page, pagination.limit, type, period],
	});

	return {
		pagination,
		type,
		period,
		leaderboardValue: value,
		isFetchingLeaderboard: isFetching,
		fetch,
	};
};
