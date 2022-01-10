<script lang="ts">
	import type { Header } from "./Table.svelte";

	//#region props
	export let data: any = null;
	export let header: Header | null = null;
	export let index = -1;
	export let value = header ? data?.[header.key] : undefined;
	//#endregion

	$: {
		// compute value
		if (value === undefined && header?.value) value = header.value(data, index) || value;
		if (value !== undefined && header?.format) value = header.format(value) || value;
	}
</script>

<td class={header?.class}>
	<slot>
		{#if data && value !== undefined}
			{value}
		{/if}
	</slot>
</td>

<style lang="postcss">
	td {
		@apply px-2 lg:px-4;
		@apply h-10 lg:h-14;
	}
</style>
