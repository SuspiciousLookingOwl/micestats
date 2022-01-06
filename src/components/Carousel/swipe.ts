interface Swipe {
	destroy(): void;
}

export const swipe = (node: HTMLDivElement): Swipe => {
	let touchStartX = 0;
	let touchEndX = 0;

	const onTouchStart = (e: TouchEvent) => {
		touchStartX = e.changedTouches[0].screenX;
	};

	const onTouchEnd = (e: TouchEvent) => {
		touchEndX = e.changedTouches[0].screenX;
		if (touchEndX < touchStartX) node.dispatchEvent(new CustomEvent("swipeleft"));
		else if (touchEndX > touchStartX) node.dispatchEvent(new CustomEvent("swiperight"));
	};

	node.addEventListener("touchstart", onTouchStart);
	node.addEventListener("touchend", onTouchEnd);

	return {
		destroy() {
			document.removeEventListener("touchstart", onTouchStart, true);
			document.removeEventListener("touchend", onTouchEnd, true);
		},
	};
};
