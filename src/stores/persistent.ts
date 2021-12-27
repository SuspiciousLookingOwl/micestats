import { browser } from "$app/env";
import type { Writable } from "svelte/store";

export const persistent = <T>(writable: Writable<T>, key: string): Writable<T> => {
	if (browser) {
		const stored = localStorage.getItem(key);
		if (stored) writable.set(JSON.parse(stored).value);
	}
	writable.subscribe((value) => {
		if (browser) {
			localStorage.setItem(key, JSON.stringify({ value }));
		}
	});
	return writable;
};
