<script lang="ts">
	import { browser } from "$app/env";
	import { Spinner, type SpinnerSize } from "@components";

	//#region props
	type T = $$Generic;

	export let promise: Promise<T>;
	export let size: SpinnerSize = "md";
	//#endregion
</script>

{#if browser}
	{#await promise}
		<Spinner {size} />
	{:then value}
		<slot {value} />
	{/await}
{/if}
