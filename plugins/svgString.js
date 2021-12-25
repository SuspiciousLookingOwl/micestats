import { promises as fs } from "fs";
import { extname } from "path";

// https://github.com/cobbcheng/vite-plugin-svgstring

/** @type {import('vite').Plugin} */
const svgString = () => {
	return {
		enforce: "pre",
		name: "svg-string",
		async load(id) {
			const path = id.split("?")[0];
			if (!extname(path).startsWith(".svg")) {
				return null;
			}
			const svg = await fs.readFile(path, "utf-8");
			return "export default " + "`" + svg + "`";
		},
	};
};

export default svgString;
