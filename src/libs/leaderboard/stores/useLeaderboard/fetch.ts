import {
	PlayersService,
	TribesService,
	type LeaderboardPeriod,
	type LeaderboardType,
	type PaginatedResponse,
	type PlayerLeaderboard,
	type TribeLeaderboard,
} from "@api";

export interface FetchLeaderboardOptions {
	page?: number;
	limit?: number;
	order?: LeaderboardType;
	period?: LeaderboardPeriod;
}

export async function fetchPlayerLeaderboard(
	options: FetchLeaderboardOptions
): Promise<PaginatedResponse<PlayerLeaderboard>> {
	const opt: Required<FetchLeaderboardOptions> = {
		page: 1,
		limit: 10,
		order: "stats",
		period: "overall",
		...options,
	};

	const response = await PlayersService.getLeaderboard(opt.order, opt.period, {
		limit: opt.limit,
		page: opt.page,
	});
	if (response.status !== 200) return { page: [], total: 0 };
	return response.data;
}

export async function fetchTribeLeaderboard(
	options: FetchLeaderboardOptions
): Promise<PaginatedResponse<TribeLeaderboard>> {
	const opt: Required<FetchLeaderboardOptions> = {
		page: 1,
		limit: 10,
		order: "stats",
		period: "overall",
		...options,
	};

	const response = await TribesService.getLeaderboard(opt.order, opt.period, {
		limit: opt.limit,
		page: opt.page,
	});
	if (response.status !== 200) return { page: [], total: 0 };
	return response.data;
}
