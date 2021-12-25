<script context="module" lang="ts">
	export type Header = {
		key: string;
		label: string;
		class?: string;
	};

	export type Cell<T = any> = {
		key: string;
		value: any | (() => any);
		format?: (value: any) => string;
		class?: string;
	} & T;

	export type Row<T = any> = Cell<T>[];
</script>

<script lang="ts">
	import DefaultCell from "./DefaultCell.svelte";

	type T = $$Generic;

	export let title: string = "";
	export let headers: Header[] = [];
	export let data: Row<T>[] = [];

	$: sortedData = data.map((row) =>
		row.sort((a, b) => findHeaderIndex(a.key) - findHeaderIndex(b.key))
	);

	const findHeaderIndex = (key: string) => headers.findIndex((h) => h.key === key);
</script>

<div>
	<slot name="title">
		<div class="text-2xl font-brand tracking-wider">{title}</div>
	</slot>
	<table class="w-full text-left mt-4 min-w-max">
		<thead>
			<tr class="bg-white bg-opacity-10">
				{#each headers as header}
					<th class={header.class}>{header.label}</th>
				{/each}
			</tr>
		</thead>
		<tbody>
			{#each sortedData as row, index}
				<slot name="row" {row} {index}>
					<tr>
						{#each row as cell}
							<DefaultCell {cell} />
						{/each}
					</tr>
				</slot>
			{/each}
		</tbody>
	</table>
</div>

<style lang="postcss">
	th {
		@apply px-2 lg:px-4;
		@apply h-10 lg:h-12;
	}
</style>
