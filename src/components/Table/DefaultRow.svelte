<script lang="ts">
	import { createEventDispatcher } from "svelte";
	import { DefaultCell } from ".";
	import type { Header } from "./Table.svelte";

	const dispatch = createEventDispatcher();

	//#region props
	export let headers: Header[] = [];
	export let index = 0;
	export let row: any;
	let rowClass = "";
	export { rowClass as class };
	//#endregion
</script>

<tr class={rowClass} on:click={() => dispatch("click")}>
	{#each headers as header}
		<td>
			<DefaultCell data={row} {header} {index} />
		</td>
	{/each}
</tr>
