import canvas from "canvas";

const { loadImage } = canvas;

interface Stats {
	label: string;
	icon: string;
	value: number;
	up?: number;
}

export const drawStats = async (
	ctx: canvas.NodeCanvasRenderingContext2D,
	dx: number,
	dy: number,
	stats: Stats
): Promise<void> => {
	ctx.save();

	// draw icon
	const image = await loadImage(`./static/img/icon/${stats.icon}.png`);
	const imageX = dx;
	const imageY = dy;
	const imageWidth = 40;
	const imageHeight = 40;
	ctx.drawImage(image, imageX, imageY, imageWidth, imageHeight);

	const { label, value, up } = stats;

	// draw value
	const valueFontSize = 28;
	const valueX = imageX + imageWidth + 12;
	const valueY = imageY + imageHeight - 10;
	ctx.fillStyle = "#242424";
	ctx.font = `${valueFontSize}px Roboto`;
	const valueWidth = ctx.measureText(value.toString()).width;
	ctx.fillText(value.toString(), valueX, valueY);

	// draw up value
	if (up) {
		const upFontSize = 20;
		const upX = valueX + valueWidth + 12;
		const upY = valueY - 4;
		ctx.fillStyle = "#16A34A";
		ctx.font = `${upFontSize}px Roboto`;
		ctx.fillText(`(+${up.toString()})`, upX, upY);
	}

	// draw label
	const labelFontSize = 24;
	const labelX = valueX;
	const labelY = valueY + valueFontSize + 12;
	ctx.fillStyle = "#5D646D";
	ctx.font = `${labelFontSize}px Roboto-Thin`;
	ctx.fillText(label, labelX, labelY);

	ctx.restore();
};

export interface StatsInfo {
	key: string;
	label: string;
	icon: string;
}

// TODO Use i18n for label
// TODO Store icon on local for faster image loading
export const statsInfo: StatsInfo[] = [
	// mouse
	{
		key: "mouse.rounds",
		label: "Rounds Played",
		icon: "clock",
	},
	{
		key: "mouse.cheese",
		label: "Cheese Gathered",
		icon: "cheese_coin",
	},
	{
		key: "mouse.first",
		label: "Firsts",
		icon: "racing_coin",
	},
	{
		key: "mouse.bootcamp",
		label: "Bootcamp",
		icon: "bootcamp_coin",
	},

	// shaman
	{
		key: "shaman.savesNormal",
		label: "Saves (Normal)",
		icon: "shaman_normal",
	},
	{
		key: "shaman.savesHard",
		label: "Saves (Hard)",
		icon: "shaman_hard",
	},
	{
		key: "shaman.savesDivine",
		label: "Saves (Divine)",
		icon: "shaman_divine",
	},
	{
		key: "shaman.cheese",
		label: "Shaman Cheese",
		icon: "cheese_coin",
	},

	// racing
	{
		key: "racing.rounds",
		label: "Rounds Played",
		icon: "racing_rounds",
	},
	{
		key: "racing.finished",
		label: "Completed Rounds",
		icon: "racing_finished",
	},
	{
		key: "racing.podium",
		label: "Podiums",
		icon: "racing_podium",
	},
	{
		key: "racing.first",
		label: "Firsts",
		icon: "racing_first",
	},

	// survivor
	{
		key: "survivor.rounds",
		label: "Rounds Played",
		icon: "survivor_rounds",
	},
	{
		key: "survivor.shaman",
		label: "Rounds as Shaman",
		icon: "survivor_shaman",
	},
	{
		key: "survivor.killed",
		label: "Killed Mice",
		icon: "survivor_killed",
	},
	{
		key: "survivor.survivor",
		label: "Rounds Survived",
		icon: "survivor_survivor",
	},

	// defilante
	{
		key: "defilante.rounds",
		label: "Rounds Played",
		icon: "defilante_rounds",
	},
	{
		key: "defilante.finished",
		label: "Completed Rounds",
		icon: "defilante_completed",
	},
	{
		key: "defilante.points",
		label: "Points Gathered",
		icon: "defilante_points",
	},
];
