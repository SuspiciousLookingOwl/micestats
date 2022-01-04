<script lang="ts" context="module">
	export interface Option {
		label: string;
		value: string;
	}
</script>

<script lang="ts">
	import { Icon } from "@components";
	import { fly } from "svelte/transition";

	export let options: Option[] = [];
	let variant: "sm" | "md" | "lg" = "md"; // TODO make this a prop
	export let value: Option | null = options[0] || null;

	let isOpened = false;
	let select: HTMLDivElement;

	let selectClasses = "";
	$: {
		switch (variant) {
			case "sm":
				selectClasses = "p-2 text-sm 2xl:text-base";
				break;
			case "lg":
				selectClasses = "p-3 2xl:p-4 text-md 2xl:text-xl";
				break;
			default:
				// "md"
				selectClasses = "p-2 2xl:p-3 2xl:text-md";
				break;
		}
	}

	const onClickBody = (e: MouseEvent) => {
		if (!select.contains(e.target as Node)) isOpened = false;
		// else isOpened = true;
	};
</script>

<svelte:body on:click={onClickBody} />

<div
	bind:this={select}
	class="flex relative items-center pr-2 bg-opacity-10 bg-white rounded max-w-max cursor-pointer"
	on:click|stopPropagation={() => (isOpened = !isOpened)}
>
	<div class="select {selectClasses}">
		{value?.label}
	</div>

	<Icon
		name="triangleTop"
		size="sm"
		class="fill-current transition-all {!isOpened && '-rotate-180'}"
	/>

	{#if isOpened}
		<div
			class="absolute rounded top-14 bg-neutral-800 w-full divide-y divide-white divide-opacity-10 min-w-max z-10"
			transition:fly={{ duration: 150, y: -16 }}
		>
			{#each options as option}
				<div on:click={() => (value = option)} class="py-2 px-4 cursor-pointer">
					{option.label}
				</div>
			{/each}
		</div>
	{/if}
</div>

<style lang="postcss">
	.select {
		@apply bg-transparent w-full focus:outline-none placeholder:text-gray-200;
		@apply appearance-none;
	}
</style>
