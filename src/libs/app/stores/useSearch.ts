import { PlayersService } from "@api";
import { BasePlayerEntity } from "@entities";
import { useFetch } from "@stores";
import { get, writable, type Writable } from "svelte/store";

interface UseSearch {
	keyword: Writable<string>;
	searchResult: Writable<BasePlayerEntity[]>;
	isSearching: Writable<boolean>;
	fetch: () => void;
}

async function searchPlayer(keyword: string, limit = 5): Promise<BasePlayerEntity[]> {
	const response = await PlayersService.search({
		search: keyword,
		limit,
	});
	if (response.status !== 200) return [];
	return response.data.page.map((u) => new BasePlayerEntity(u));
}

// TODO implement
// async function searchTribe

export const useSearch = (initialValue: BasePlayerEntity[] = []): UseSearch => {
	const keyword = writable<string>("");

	const fetchFn = () => searchPlayer(get(keyword));

	const {
		value: searchResult,
		isFetching: isSearching,
		...search
	} = useFetch<BasePlayerEntity[]>(initialValue, fetchFn, {
		debounce: 500,
		keys: [keyword],
	});

	return {
		keyword,
		searchResult,
		isSearching,
		...search,
	};
};
