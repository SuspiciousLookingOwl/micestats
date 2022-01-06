import { useCounter } from "@stores";
import { get, writable, type Writable } from "svelte/store";

interface UseCarousel extends Writable<number> {
	setLength: (length: number) => void;
	next: () => void;
	previous: () => void;
}

export const useCarousel = (initialIndex = 0): UseCarousel => {
	const index = useCounter(initialIndex);
	const length = writable<number>(0);

	const next = () => {
		if (get(index) >= get(length) - 1) index.set(0);
		else index.update((i) => i + 1);
	};

	const previous = () => {
		if (get(index) <= 0) index.set(get(length) - 1);
		else index.update((i) => i - 1);
	};

	const setLength = (n: number) => {
		length.set(n);
		index.set(initialIndex);
	};

	return {
		...index,
		setLength,
		next,
		previous,
	};
};
