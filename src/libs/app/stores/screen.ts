import { browser } from "$app/env";
import { writable } from "svelte/store";

const useScreen = () => {
	const width = writable(0);
	const height = writable(0);

	if (browser) {
		width.set(window.innerWidth);
		height.set(window.innerHeight);

		window.addEventListener("resize", () => {
			width.set(window.innerWidth);
			height.set(window.innerHeight);
		});
	}

	return { width, height };
};

export const screen = useScreen();
