<script lang="ts">
	import type { Cell } from "./Table.svelte";

	export let cell: Cell | null = null;

	export let value = "";
	$: if (cell) {
		const temp = cell.value === "function" ? cell.value() : cell?.value;
		value = typeof cell.format === "function" ? cell.format(temp) : temp;
	}
</script>

<td class={cell?.class}>
	<slot>
		{#if cell}
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
