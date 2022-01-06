<script lang="ts" context="module">
	export type Icons = keyof typeof icons;
	export type IconSize = "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl";
</script>

<script lang="ts">
	import classNames from "classnames";
	import icons from "./icons";

	//#region props
	export let name: Icons;
	export let size: IconSize = "md";
	let classes = "";
	export { classes as class };
	//#endregion

	//#region classes
	$: svgClass = classNames(
		{
			"w-2 h-2": size === "xs",
			"w-3 h-3": size === "sm",
			"w-4 h-4": size === "md",
			"w-5 h-5": size === "lg",
			"w-6 h-6": size === "xl",
			"w-8 h-8": size === "2xl",
			"w-10 h-10": size === "3xl",
		},
		classes
	);
	//#endregion
</script>

<svg class={svgClass}>
	{@html icons[name]}
</svg>

<style></style>
