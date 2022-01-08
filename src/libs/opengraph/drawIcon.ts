import canvas from "canvas";

const { loadImage } = canvas;

export const drawIcon = async (
	ctx: canvas.CanvasRenderingContext2D,
	dx: number,
	dy: number
): Promise<void> => {
	ctx.save();

	// draw icon
	const cheese = await loadImage("./static/img/cheese.png");
	const iconX = dx;
	const iconY = dy;
	const iconWidth = 80;
	const iconHeight = 48;
	ctx.drawImage(cheese, iconX, iconY, iconWidth, iconHeight);

	// draw cfm
	ctx.font = `24px Soopafresh`;
	ctx.fillStyle = "#BC249A";
	ctx.shadowColor = "black";
	ctx.shadowBlur = 4;
	ctx.strokeStyle = "#1E1E1E";
	ctx.lineWidth = 4;

	const { width: cfmWidth } = ctx.measureText("Cheeseformice");
	const cfmX = iconX + (iconWidth - cfmWidth) / 2;
	const cfmY = iconY + 50;
	ctx.strokeText("Cheeseformice", cfmX, cfmY);
	ctx.fillText("Cheeseformice", cfmX, cfmY);

	ctx.restore();
};
