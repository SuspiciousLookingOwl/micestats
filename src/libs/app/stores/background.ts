import type { Writable } from "svelte/store";
import { writable } from "svelte/store";

interface UseBackground {
	image: Writable<string>;
	transformStyle: Writable<string>;
	classes: Writable<string>;
	setBackground: (index: number) => void;
	setScale: (scale?: number) => void;
	setBrightness: (x?: number) => void;
	setXOffset: (x?: number) => void;
	setBlur: (x?: number) => void;
}

const images = [
	"/img/ninja.jpg",
	"/img/map-serre.jpg",
	"/img/x_noel2014.jpg",
	"/img/x_bar.jpg",
	"/img/x_mapAFK.jpg",
	"/img/x_indi.jpg",
	"/img/x_jungle.jpg",
];

const blurLevels = [
	"",
	"lg:blur-sm",
	"lg:blur",
	"lg:blur-lg",
	"lg:blur-xl",
	"lg:blur-2xl",
	"lg:blur-3xl",
]; // TODO blur only for larger device due to performance issue

const brightnessLevels = [
	"brightness-0",
	"brightness-5 lg:brightness-10",
	"brightness-10 lg:brightness-20",
	"brightness-15 lg:brightness-30",
	"brightness-20 lg:brightness-40",
	"brightness-25 lg:brightness-50",
	"brightness-30 lg:brightness-60",
	"brightness-35 lg:brightness-70",
	"brightness-40 lg:brightness-80",
	"brightness-45 lg:brightness-90",
	"",
]; // TODO darker background for smaller device because not blurred (better visibility)

const useBackground = (): UseBackground => {
	const initialIndex = Math.floor(Math.random() * images.length);
	const baseXOffsetPercentage = 20;
	const defaultXOffset = 0;
	const defaultBlur = 2;
	const defaultBrightness = 5;
	const defaultScale = 1.25;

	const transformStyles = {
		scale: `scale(${defaultScale})`,
		translate: `translate(${defaultXOffset}px, 0px)`,
	};
	let blurLevel = defaultBlur;
	let brightnessLevel = defaultBrightness;

	const image = writable<string>(images[initialIndex]);
	const transformStyle = writable<string>("");
	const classes = writable<string>("");

	const setBackground = (index: number) => {
		if (index < 0) index = 0;
		if (index >= images.length) index = images.length - 1;
		image.set(images[index]);
	};

	const setXOffset = (x?: number) => {
		if (!x) x = defaultXOffset;
		else if (x < 0) x = 0;
		else if (x > 1) x = 1;
		transformStyles.translate = `translate(-${x * baseXOffsetPercentage}%, 0px)`;
		update();
	};

	const setScale = (scale?: number) => {
		transformStyles.scale = `scale(${scale || defaultScale})`;
		update();
	};

	const setBlur = (x?: number) => {
		if (!x) blurLevel = defaultBlur;
		else {
			if (x < 0) x = 0;
			if (x >= blurLevels.length) x = blurLevels.length - 1;
			blurLevel = x;
		}
		update();
	};

	const setBrightness = (x?: number) => {
		if (!x) brightnessLevel = defaultBrightness;
		else {
			if (x < 0) x = 0;
			if (x >= brightnessLevels.length) x = blurLevels.length - 1;
			brightnessLevel = x;
		}
		update();
	};

	const update = () => {
		transformStyle.set(Object.values(transformStyles).join(" "));
		classes.set([blurLevels[blurLevel], brightnessLevels[brightnessLevel]].join(" "));
	};

	update();

	return {
		image,
		transformStyle,
		classes,
		setBackground,
		setBrightness,
		setXOffset,
		setBlur,
		setScale,
	};
};

export const background = useBackground();
