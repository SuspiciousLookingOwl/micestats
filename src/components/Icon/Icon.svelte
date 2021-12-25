<script lang="ts" context="module">
	export type Icons = keyof typeof icons;
	export type IconSize = "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
</script>

<script lang="ts">
	import icons from "./icons";

	export let name: Icons;
	export let size: IconSize = "md";

	let classes = "";
	export { classes as class };

	let sizeClasses = "";
	$: {
		if (size === "xs") sizeClasses = "w-2 h-2";
		else if (size === "sm") sizeClasses = "w-3 h-3";
		else if (size === "md") sizeClasses = "w-4 h-4";
		else if (size === "lg") sizeClasses = "w-5 h-5";
		else if (size === "xl") sizeClasses = "w-8 h-8";
		else if (size === "2xl") sizeClasses = "w-10 h-10";
		else sizeClasses = "w-4 h-4";
	}
</script>

<svg class="{sizeClasses} {classes}">
	{@html icons[name]}
</svg>

<style></style>
