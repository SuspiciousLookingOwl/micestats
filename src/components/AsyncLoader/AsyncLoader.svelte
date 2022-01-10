<script lang="ts">
	import { browser } from "$app/env";
	import { Spinner, type SpinnerSize } from "@components";
	import type { SpinnerVariant } from "@components/Spinner";

	//#region props
	type T = $$Generic;

	export let promise: Promise<T>;
	export let size: SpinnerSize = "md";
	export let variant: SpinnerVariant = "circle";
	//#endregion
</script>

{#if browser}
	{#await promise}
		<Spinner {size} {variant} />
	{:then value}
		<slot {value} />
	{/await}
{:else}
	<Spinner {size} {variant} />
{/if}
