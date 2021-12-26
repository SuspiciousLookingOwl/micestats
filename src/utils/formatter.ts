export const thousandSeparator = (x: number, separator = " "): string => {
	return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, separator);
};

export const toPercentage = (x: number, decimals = 1): string => {
	if (!x) return "0%";
	return `${(100 * x).toFixed(decimals)}%`;
};
