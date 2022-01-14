interface SizeObserver {
	destroy(): void;
}

export const sizeObserver = (node: HTMLElement): SizeObserver => {
	const onSizeChange = () => {
		node.dispatchEvent(new CustomEvent("sizechange"));
	};

	const observer = new ResizeObserver(onSizeChange);
	observer.observe(node);

	return {
		destroy() {
			observer.disconnect();
		},
	};
};
