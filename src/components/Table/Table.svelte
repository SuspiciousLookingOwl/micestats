<script context="module" lang="ts">
	export type Header = {
		key: string;
		label: string;
		format?: (value: any) => string;
		class?: string;
	};
</script>

<script lang="ts">
	import { DefaultCell } from ".";

	type T = $$Generic;

	export let title: string = "";
	export let headers: Header[] = [];
	export let data: T[] = [];
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
			{#each data as row, index}
				<slot name="row" {row} {index}>
					<tr>
						{#each headers as header}
							<td>
								<DefaultCell data={row} {header} />
							</td>
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
