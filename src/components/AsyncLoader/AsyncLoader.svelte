<script lang="ts">
	import { browser } from "$app/env";
	import { Spinner, type IconSize } from "@components";

	type T = $$Generic;

	export let promise: Promise<T>;
	export let size: IconSize = "md";
</script>

{#if browser}
	{#await promise}
		<Spinner {size} />
	{:then value}
		<slot {value} />
	{/await}
{/if}
