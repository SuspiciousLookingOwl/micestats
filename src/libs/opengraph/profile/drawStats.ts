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
	const image = await loadImage(stats.icon);
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
		icon: "https://www.transformice.com/images/x_transformice/x_inventaire/2259.jpg",
	},
	{
		key: "mouse.cheese",
		label: "Cheese Gathered",
		icon: "https://www.transformice.com/images/x_transformice/x_inventaire/800.jpg",
	},
	{
		key: "mouse.first",
		label: "Firsts",
		icon: "https://www.transformice.com/images/x_transformice/x_inventaire/2254.jpg",
	},
	{
		key: "mouse.bootcamp",
		label: "Bootcamp",
		icon: "https://www.transformice.com/images/x_transformice/x_inventaire/2261.jpg",
	},

	// shaman
	{
		key: "shaman.savesNormal",
		label: "Saves (Normal)",
		icon: "https://www.transformice.com/images/x_transformice/x_divers/x_mc0.jpg",
	},
	{
		key: "shaman.savesHard",
		label: "Saves (Hard)",
		icon: "https://www.transformice.com/images/x_transformice/x_divers/x_mc1.jpg",
	},
	{
		key: "shaman.savesDivine",
		label: "Saves (Divine)",
		icon: "https://www.transformice.com/images/x_transformice/x_divers/x_mc2.jpg",
	},
	{
		key: "shaman.cheese",
		label: "Shaman Cheese",
		icon: "https://www.transformice.com/images/x_transformice/x_inventaire/800.jpg",
	},

	// racing
	{
		key: "racing.rounds",
		label: "Rounds Played",
		icon: "https://www.transformice.com/images/x_transformice/x_badges/x_124.png",
	},
	{
		key: "racing.finished",
		label: "Completed Rounds",
		icon: "https://www.transformice.com/images/x_transformice/x_badges/x_125.png",
	},
	{
		key: "racing.podium",
		label: "Podiums",
		icon: "https://www.transformice.com/images/x_transformice/x_badges/x_127.png",
	},
	{
		key: "racing.first",
		label: "Firsts",
		icon: "https://www.transformice.com/images/x_transformice/x_badges/x_126.png",
	},

	// survivor
	{
		key: "survivor.rounds",
		label: "Rounds Played",
		icon: "https://www.transformice.com/images/x_transformice/x_badges/x_120.png",
	},
	{
		key: "survivor.shaman",
		label: "Rounds as Shaman",
		icon: "https://www.transformice.com/images/x_transformice/x_badges/x_121.png",
	},
	{
		key: "survivor.killed",
		label: "Killed Mice",
		icon: "https://www.transformice.com/images/x_transformice/x_badges/x_122.png",
	},
	{
		key: "survivor.survivor",
		label: "Rounds Survived",
		icon: "https://www.transformice.com/images/x_transformice/x_badges/x_123.png",
	},

	// defilante
	{
		key: "defilante.rounds",
		label: "Rounds Played",
		icon: "https://www.transformice.com/images/x_transformice/x_badges/x_288.png",
	},
	{
		key: "defilante.finished",
		label: "Completed Rounds",
		icon: "https://www.transformice.com/images/x_transformice/x_badges/x_287.png",
	},
	{
		key: "defilante.points",
		label: "Points Gathered",
		icon: "https://www.transformice.com/images/x_transformice/x_badges/x_286.png",
	},
];
