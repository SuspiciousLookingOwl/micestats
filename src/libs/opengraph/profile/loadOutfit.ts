import { renderAsync } from "@resvg/resvg-js";
import canvas from "canvas";

const { loadImage } = canvas;

// use this method for now to convert from SVG to PNG instead of showing the SVG directly on the canvas
// there's a bug that causes node-canvas not showing the full path of the SVG
export const loadOutfit = async (look: string): Promise<canvas.Image> => {
	const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/dressroom/mouse/${look}`);
	const svg = await response.text();

	const buffer = await renderAsync(svg, {
		imageRendering: 1,
		fitTo: {
			mode: "width",
			value: 225,
		},
	});
	return await loadImage(buffer);
};
