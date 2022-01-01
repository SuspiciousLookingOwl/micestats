import { get, writable, type Writable } from "svelte/store";
import { useCounter } from "./useCounter";

export interface UsePagination {
	page: Writable<number>;
	limit: Writable<number>;
	next: () => void;
	previous: () => void;
	setPage: (page: number) => void;
	setTotal: (total: number) => void;
}

export const usePagination = (initialPage = 1): UsePagination => {
	const page = useCounter(initialPage);
	const limit = writable(10);
	const total = writable(0);
	const maxPage = writable(0);

	const next = () => {
		if (get(page) < get(maxPage)) page.increment();
	};

	const previous = () => {
		if (get(page) > 1) page.decrement();
	};

	const setPage = (p: number) => {
		if (p < 1) p = 1;
		if (p > get(maxPage)) p = get(maxPage);
		page.set(p);
	};

	const setTotal = (value: number) => {
		total.set(value);
		maxPage.set(Math.ceil(value / get(limit)));
	};

	return {
		page,
		limit,
		next,
		previous,
		setPage,
		setTotal,
	};
};
