import {
	PlayersService,
	TribesService,
	type LeaderboardPeriod,
	type LeaderboardType,
	type PaginatedResponse,
} from "@api";
import { PlayerLeaderboardEntity, TribeLeaderboardEntity } from "@entities";

export interface FetchLeaderboardOptions {
	page?: number;
	limit?: number;
	order?: LeaderboardType;
	period?: LeaderboardPeriod;
}

export async function fetchPlayerLeaderboard(
	options: FetchLeaderboardOptions
): Promise<PaginatedResponse<PlayerLeaderboardEntity>> {
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
	return {
		page: response.data.page.map((p) => new PlayerLeaderboardEntity(p)),
		total: response.data.total,
	};
}

export async function fetchTribeLeaderboard(
	options: FetchLeaderboardOptions
): Promise<PaginatedResponse<TribeLeaderboardEntity>> {
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
	return {
		page: response.data.page.map((t) => new TribeLeaderboardEntity(t)),
		total: response.data.total,
	};
}
