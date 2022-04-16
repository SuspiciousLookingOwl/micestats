<script lang="ts">
	import { DefaultCell, type Header } from "@components";
	import { ModeCellContent } from ".";

	export let headers: Header[] = [];
	export let row: any;
</script>

<tr>
	{#each headers as header}
		{#if header.key === "mode"}
			<DefaultCell>
				<ModeCellContent value={row.mode} icon={row.icon} />
			</DefaultCell>
		{:else}
			<DefaultCell data={row} {header} />
		{/if}
	{/each}
</tr>
