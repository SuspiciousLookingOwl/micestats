const config = {
	content: ["./src/**/*.{html,js,svelte,ts}"],
	theme: {
		extend: {
			brightness: {
				5: ".05",
				10: ".1",
				15: ".15",
				20: ".2",
				25: ".25",
				30: ".3",
				35: ".35",
				40: ".4",
				45: ".45",
				60: ".6",
				70: ".7",
				80: ".8",
			},
			colors: {
				primary: {
					DEFAULT: "#BC249A",
					50: "#EFA9DF",
					100: "#EB98D9",
					200: "#E576CC",
					300: "#DE53BF",
					400: "#D831B2",
					500: "#BC249A",
					600: "#8D1B73",
					700: "#5E124D",
					800: "#2F0926",
					900: "#000000",
				},
			},
		},
	},
	plugins: [],
};

module.exports = config;
