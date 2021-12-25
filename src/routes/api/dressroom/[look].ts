import { render } from "@resvg/resvg-js";
import type { RequestHandler } from "@sveltejs/kit";

export const get: RequestHandler = async ({ params }) => {
	const { look } = params;

	const response = await fetch(`https://cheese.formice.com/api/dressroom/mouse/${look}`);
	const svg = await response.text();

	const buffer = render(svg, {
		imageRendering: 1,
		fitTo: {
			mode: "width",
			value: 300,
		},
	});

	return {
		headers: { "Content-Type": "image/png" },
		body: buffer,
	};
};
