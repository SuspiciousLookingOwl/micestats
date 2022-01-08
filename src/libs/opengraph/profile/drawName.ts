export const drawName = (
	ctx: CanvasRenderingContext2D,
	dx: number,
	dy: number,
	fullName: string
): void => {
	ctx.save();

	const [name, tag] = fullName.split("#");
	ctx.shadowColor = "black";
	ctx.shadowBlur = 6;
	ctx.strokeStyle = "#1E1E1E";
	ctx.lineWidth = 6;

	// draw name
	const nameFontSize = name.length <= 12 ? 64 : 48;
	const nameX = dx;
	const nameY = dy;
	ctx.fillStyle = "#009C9C";
	ctx.font = `${nameFontSize}px Soopafresh`;
	ctx.strokeText(name, nameX, nameY);
	ctx.fillText(name, nameX, nameY);
	const { width: nameWidth } = ctx.measureText(name);

	// draw tag
	const tagFontSize = nameFontSize * 0.65;
	const tagX = nameX + nameWidth + 10;
	const tagY = nameY;
	ctx.fillStyle = "#5F5F8E";
	ctx.font = `${tagFontSize}px Soopafresh`;
	ctx.strokeText("#" + tag, tagX, tagY);
	ctx.fillText("#" + tag, tagX, tagY);

	ctx.restore();
};
