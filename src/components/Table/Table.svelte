<script context="module" lang="ts">
	export type Header<T = any> = {
		key: string;
		label: string;
		format?: (value: T) => any;
		value?: (data: T, index: number) => any;
		class?: string;
	};
</script>

<script lang="ts">
	import { createEventDispatcher } from "svelte";
	import { DefaultCell } from ".";

	type T = $$Generic;

	interface Events {
		rowclick: { row: T; index: number };
	}

	interface $$Events {
		rowclick: CustomEvent<Events["rowclick"]>;
	}

	const dispatch = createEventDispatcher<Events>();

	export let title: string = "";
	export let headers: Header[] = [];
	export let data: T[] = [];

	export let tableClass = "";
	export let tableBodyClass = "";
	export let tableRowClass = "";
</script>

<div class={tableClass}>
	<slot name="title">
		<div class="text-2xl font-brand tracking-wider">{title}</div>
	</slot>
	<table class="w-full text-left mt-4 min-w-max">
		<thead>
			{#key headers}
				<tr class="bg-white bg-opacity-10">
					{#each headers as header}
						<th class={header.class}>{header.label}</th>
					{/each}
				</tr>
			{/key}
		</thead>
		<tbody class={tableBodyClass}>
			{#key data}
				{#each data as row, index}
					<slot name="row" {row} {index}>
						<tr
							class={tableRowClass}
							on:click={() => dispatch("rowclick", { row, index })}
						>
							{#each headers as header}
								<td>
									<DefaultCell data={row} {header} {index} />
								</td>
							{/each}
						</tr>
					</slot>
				{/each}
			{/key}
		</tbody>
	</table>
</div>

<style lang="postcss">
	th {
		@apply px-2 lg:px-4;
		@apply h-10 lg:h-12;
	}
</style>
