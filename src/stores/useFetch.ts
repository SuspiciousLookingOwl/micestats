import { get, writable, type Writable } from "svelte/store";

type FetchFn<T> = () => Promise<T>;

interface UseFetch<T> {
	value: Writable<T>;
	isFetching: Writable<boolean>;
	fetch: () => Promise<T | undefined>;
}

interface UseFetchOptions<T> {
	debounce?: number;
	onError?: (error: unknown) => void;
	keys?: Writable<unknown>[];
	condition?: (value: T) => boolean;
	strict?: boolean;
}

export const useFetch = <T = null>(
	initialValue: T,
	fetchFn: FetchFn<T>,
	options: UseFetchOptions<T> = {}
): UseFetch<T> => {
	const value = writable<T>(initialValue);
	const isFetching = writable(false);
	let timeout: NodeJS.Timeout;
	const oldKeys: unknown[] = [];

	const fetch = async (): Promise<T | undefined> => {
		if (options.condition && !options.condition(get(value))) return;

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
		for (const [i, key] of options.keys.entries()) {
			oldKeys.push(get(key));

			key.subscribe(() => {
				const newKey = get(key);

				if (options.strict && oldKeys[i] !== newKey) {
					oldKeys[i] = newKey;
					fetch();
				} else if (!options.strict) {
					fetch();
				}
			});
		}
	}

	return { value, fetch, isFetching };
};
