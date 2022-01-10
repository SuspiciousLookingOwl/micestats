<script lang="ts">
	import { browser } from "$app/env";
	import { Spinner, type SpinnerSize } from "@components";
	import type { SpinnerVariant } from "@components/Spinner";

	//#region props
	type T = $$Generic;

	export let promise: Promise<T>;
	let classes = "";
	export { classes as class };
	export let size: SpinnerSize = "md";
	export let variant: SpinnerVariant = "circle";
	//#endregion
</script>

{#if browser}
	{#await promise}
		<div class={classes}>
			<Spinner {size} {variant} />
		</div>
	{:then value}
		<slot {value} />
	{/await}
{:else}
	<div class={classes}>
		<Spinner {size} {variant} />
	</div>
{/if}
