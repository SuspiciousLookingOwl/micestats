<script lang="ts">
	import type { Header } from "./Table.svelte";

	export let data: any = null;
	export let header: Header | null = null;
	export let index = -1;

	export let value = header ? data?.[header.key] : "";
	$: if (header?.format) {
		value = header.format(value) || value;
	} else if (header?.value) {
		value = header.value(data, index) || value;
	}
</script>

<td class={header?.class}>
	<slot>
		{#if data}
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
