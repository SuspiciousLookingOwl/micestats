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
					DEFAULT: "#9333EA",
					50: "#EBD9FB",
					100: "#E1C7F9",
					200: "#CEA2F5",
					300: "#BA7DF2",
					400: "#A758EE",
					500: "#9333EA",
					600: "#7715D0",
					700: "#5A109D",
					800: "#3D0B6A",
					900: "#200637",
				},
			},
		},
	},
	plugins: [],
};

module.exports = config;
