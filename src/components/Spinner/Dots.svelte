<script lang="ts">
	import classNames from "classnames";
	import type { SpinnerSize } from ".";

	//#region props
	export let size: SpinnerSize = "md";
	//#endregion

	//#region classes
	$: bulletClass = classNames("rounded-full bg-white bg-opacity-25 animate-bounce", {
		"h-1 w-1 m-0.5": size === "xs",
		"h-2 w-2 m-0.5": size === "sm",
		"h-3 w-3 m-0.5": size === "md",
		"h-4 w-4 m-1": size === "lg",
		"h-5 w-5 m-1": size === "xl",
		"h-6 w-6 m-1": size === "2xl",
	});
	//#endregion
</script>

<div class="flex">
	{#each Array(3) as _, i}
		<div class={classNames(bulletClass)} style={`animation-delay: ${i * 100}ms`} />
	{/each}
</div>
