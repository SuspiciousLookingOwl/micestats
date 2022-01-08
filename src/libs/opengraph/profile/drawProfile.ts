import type { PlayerEntity } from "@entities";
import canvas from "canvas";
import { drawInfo, drawName, drawStats, loadOutfit, statsInfo, type StatsInfo } from ".";
import { drawIcon } from "..";

const { createCanvas } = canvas;

const canvasWidth = 1200;
const canvasHeight = 600;

const leftMargin = 70;
const topMargin = 150;

export const drawProfile = async (profile: PlayerEntity): Promise<Buffer> => {
	// fetch outfit and title
	const [outfit, title] = await Promise.all([loadOutfit(profile.shop.look), profile.getTitle()]);

	// create canvas
	const canvas = createCanvas(canvasWidth, canvasHeight);
	const ctx = canvas.getContext("2d");

	// draw background
	ctx.fillStyle = "#ffffff";
	ctx.fillRect(0, 0, canvas.width, canvas.height);

	// draw outfit
	const outfitWidth = 225;
	const outfitHeight = 300;
	ctx.drawImage(outfit, leftMargin, 50, outfitWidth, outfitHeight);

	// draw name
	const nameX = leftMargin + outfitWidth + 24;
	const nameY = topMargin;
	drawName(ctx, nameX, nameY, profile.name);

	// draw info
	const infoX = nameX;
	const infoY = topMargin + 64;
	await drawInfo(ctx, infoX, infoY, {
		name: profile.name,
		title,
		soulmate: profile.soulmate?.name,
		tribe: profile.tribe?.name,
	});

	// hr
	ctx.fillStyle = "#D4D4D4";
	ctx.fillRect(leftMargin, 380, canvasWidth - leftMargin * 2, 1);

	// draw stats
	const stats = profile.period.flat.map((s) => {
		const [category, type] = s.key.split(".");

		// TODO fix this typing
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		const value = profile.stats[category][type];
		const { label, icon } = statsInfo.find((si) => si.key === s.key) as StatsInfo;

		return {
			label,
			value,
			up: s.value,
			icon: icon,
		};
	});
	const shownStats = stats.sort((a, b) => b.up - a.up || b.value - a.value).slice(0, 4);
	const spacing = (canvasWidth - leftMargin * 2) / 4;
	await Promise.all(shownStats.map((s, i) => drawStats(ctx, leftMargin + i * spacing, 440, s)));

	await drawIcon(ctx, 1020, 40);

	const buffer = canvas.toBuffer("image/jpeg", { quality: 0.95 });
	return buffer;
};
