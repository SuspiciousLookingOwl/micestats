<script lang="ts" context="module">
	export type SpinnerSize = "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
	export type SpinnerVariant = "circle" | "dots";
</script>

<script lang="ts">
	import Circle from "./Circle.svelte";
	import Dots from "./Dots.svelte";

	const spinnerVariants = {
		circle: Circle,
		dots: Dots,
	};

	//#region props
	export let size: SpinnerSize = "md";
	export let variant: SpinnerVariant = "circle";
	//#endregion
</script>

<svelte:component this={spinnerVariants[variant] || Circle} {size} />
