import { drawProfile } from "@libs/opengraph";
import { fetchProfile } from "@libs/profile";
import type { RequestHandler } from "@sveltejs/kit";
import canvas from "canvas";

const { registerFont } = canvas;

registerFont("./static/font/soopafresh.ttf", { family: "Soopafresh" });
registerFont("./static/font/Roboto-Bold.ttf", { family: "Roboto-Bold", weight: "700" });
registerFont("./static/font/Roboto-Medium.ttf", { family: "Roboto-Medium", weight: "500" });
registerFont("./static/font/Roboto-Regular.ttf", { family: "Roboto", weight: "400" });
registerFont("./static/font/Roboto-Light.ttf", { family: "Roboto-Light", weight: "300" });
registerFont("./static/font/Roboto-Thin.ttf", { family: "Roboto-Thin", weight: "100" });

export const get: RequestHandler = async ({ params }) => {
	const { slug } = params;

	// fetch data from API
	const profile = await fetchProfile(slug);
	if (!profile) return { status: 400 };

	const buffer = await drawProfile(profile);

	return {
		headers: { "Content-Type": "image/jpeg" },
		body: buffer,
	};
};
