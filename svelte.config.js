import adapter from "@sveltejs/adapter-node";
import path from "path";
import preprocess from "svelte-preprocess";
import svgString from "./plugins/svgString.js";

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: [
		preprocess({
			postcss: true,
		}),
	],

	kit: {
		adapter: adapter({ out: "dist" }),
		files: {
			assets: "static",
		},
		vite: {
			resolve: {
				alias: {
					"@api": path.resolve("./src/api"),
					"@components": path.resolve("./src/components"),
					"@entities": path.resolve("./src/entities"),
					"@libs": path.resolve("./src/libs"),
					"@stores": path.resolve("./src/stores"),
					"@utils": path.resolve("./src/utils"),
				},
			},
			plugins: [svgString()],
		},
		// hydrate the <div id="svelte"> element in src/app.html
		target: "#svelte",
	},
};

export default config;
