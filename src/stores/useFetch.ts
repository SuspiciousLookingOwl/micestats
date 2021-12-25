import type { Writable } from "svelte/store";
import { writable } from "svelte/store";

interface UseFetch<T> {
	value: Writable<T>;
	isFetching: Writable<boolean>;
	fetch: () => Promise<T>;
}

interface UseFetchOptions {
	debounce?: number;
	onError?: (error: unknown) => void;
	keys?: Writable<any>[];
}

export const useFetch = <T = null>(
	initialValue: T,
	fetchFn: (...args: unknown[]) => Promise<T>,
	options: UseFetchOptions = {}
): UseFetch<T> => {
	const value = writable<T>(initialValue);
	const isFetching = writable(false);
	let timeout: NodeJS.Timeout;

	const fetch = async (): Promise<T> => {
		return new Promise((resolve, reject) => {
			isFetching.set(true);
			if (timeout) clearTimeout(timeout);

			timeout = setTimeout(async () => {
				try {
					const result = await fetchFn();
					value.set(result);
					resolve(result);
				} catch (err) {
					options.onError?.(err);
					reject(err);
				} finally {
					isFetching.set(false);
				}
			}, options.debounce || 0);
		});
	};

	if (options.keys) {
		for (const key of options.keys) {
			key.subscribe(fetch);
		}
	}

	return { value: value, fetch, isFetching };
};
