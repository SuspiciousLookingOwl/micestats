import { writable, type Writable } from "svelte/store";

interface UseCounter extends Writable<number> {
	increment: () => void;
	decrement: () => void;
	reset: () => void;
}

export const useCounter = (initialValue: number): UseCounter => {
	const value = writable(initialValue);

	const increment = () => value.update((v) => v + 1);
	const decrement = () => value.update((v) => v - 1);
	const reset = () => value.set(initialValue);

	return {
		...value,
		increment,
		decrement,
		reset,
	};
};
