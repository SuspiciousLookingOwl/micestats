<script lang="ts">
	import classNames from "classnames";
	import type { SpinnerSize } from ".";

	//#region props
	export let size: SpinnerSize = "md";
	//#endregion

	//#region classes
	$: baseClass = classNames("absolute rounded-full", {
		"h-4 w-4 border-2": size === "xs",
		"h-6 w-6 border-4": size === "sm",
		"h-8 w-8 border-4": size === "md",
		"h-12 w-12 border-4": size === "lg",
		"h-16 w-16 border-4": size === "xl",
		"h-24 w-24 border-8": size === "2xl",
	});

	$: containerClass = classNames("relative !border-0", baseClass);
	$: spinnerClass = classNames("border-white border-opacity-10", baseClass);
	$: spinnerBorderClass = classNames(
		"animate-spin border-transparent border-t-primary-200",
		baseClass
	);
	//#endregion
</script>

<div class={containerClass}>
	<div class={spinnerClass} />
	<div class={spinnerBorderClass} />
</div>
