import type { NodeCanvasRenderingContext2D } from "canvas";
import { fillTextWithTwemoji as fillTextWithEmoji } from "node-canvas-with-twemoji-and-discord-emoji";

interface Profile {
	name: string;
	title: string;
	soulmate?: string;
	tribe?: string;
}

export const drawInfo = async (
	ctx: NodeCanvasRenderingContext2D,
	dx: number,
	dy: number,
	profile: Profile
): Promise<void> => {
	ctx.save();

	const fontSize = 36;
	ctx.fillStyle = "#5D646D";

	// draw title
	const titleX = dx;
	const titleY = dy;
	ctx.font = `${fontSize}px Roboto-Bold`;
	ctx.fillText(`« ${profile.title} »`, titleX, titleY);

	// draw soulmate
	const soulmateX = titleX;
	let soulmateY = titleY;
	if (profile.soulmate) {
		soulmateY += +fontSize + 16;
		ctx.font = `${fontSize}px Roboto-Medium`;
		await fillTextWithEmoji(ctx, `♥ ${profile.soulmate}`, soulmateX, soulmateY);
	}

	// draw tribe
	if (profile.tribe) {
		const tribeX = titleX;
		const tribeY = soulmateY + fontSize + 16;
		ctx.fillStyle = "#5D646D";
		ctx.font = `${fontSize}px Roboto-Medium`;
		await fillTextWithEmoji(ctx, `🏠 ${profile.tribe}`, tribeX, tribeY);
	}

	ctx.restore();
};
