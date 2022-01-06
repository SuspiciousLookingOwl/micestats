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
	import DefaultRow from "./DefaultRow.svelte";

	type T = $$Generic;

	interface Events {
		rowclick: { row: T; index: number };
	}

	interface $$Events {
		rowclick: CustomEvent<Events["rowclick"]>;
	}

	const dispatch = createEventDispatcher<Events>();

	//#region props
	export let title: string = "";
	export let headers: Header[] = [];
	export let data: T[] = [];
	export let isLoading = false;
	export let skeletonCount = 1;

	export let tableClass = "";
	export let tableBodyClass = "";
	export let tableRowClass = "";
	//#endregion
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
				{#if isLoading}
					{#each Array(skeletonCount) as _}
						<slot name="skeleton" />
					{/each}
				{:else}
					{#each data as row, index}
						<slot name="row" {row} {index}>
							<DefaultRow
								on:click={() => dispatch("rowclick", { row, index })}
								{headers}
								{row}
								{index}
								class={tableRowClass}
							/>
						</slot>
					{/each}
				{/if}
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
