<script lang="ts" context="module">
	export interface Option {
		label: string;
		value: string;
	}
</script>

<script lang="ts">
	import { Icon } from "@components";
	import classNames from "classnames";
	import { fly } from "svelte/transition";

	//#region props
	export let options: Option[] = [];
	let variant: "sm" | "md" | "lg" = "md"; // TODO make this a prop
	export let value: Option | null = options[0] || null;
	//#endregion

	//#region state
	let isOpened = false;
	let select: HTMLDivElement;
	//#endregion

	//#region event handlers
	const onClickBody = (e: MouseEvent) => {
		if (!select.contains(e.target as Node)) isOpened = false;
		// else isOpened = true;
	};
	//#endregion

	//#region classes
	$: selectClass = classNames(
		{
			"p-2 text-sm 2xl:text-base": variant === "sm",
			"p-2 2xl:p-3 2xl:text-md": variant === "md",
			"p-3 2xl:p-4 text-md 2xl:text-xl": variant === "lg",
		},
		"bg-transparent w-full focus:outline-none placeholder:text-gray-200",
		"appearance-none"
	);
	$: iconClass = classNames("fill-current transition-all", { "-rotate-180": !isOpened });
	//#endregion
</script>

<svelte:body on:click={onClickBody} />

<div
	bind:this={select}
	on:click|stopPropagation={() => (isOpened = !isOpened)}
	class="flex relative items-center pr-2 bg-opacity-10 bg-white rounded max-w-max cursor-pointer"
>
	<div class={selectClass}>
		{value?.label}
	</div>

	<Icon name="triangleTop" size="sm" class={iconClass} />

	{#if isOpened}
		<div
			transition:fly={{ duration: 150, y: -16 }}
			class="absolute rounded top-14 bg-neutral-800 w-full divide-y divide-white divide-opacity-10 min-w-max z-10"
		>
			{#each options as option}
				<div on:click={() => (value = option)} class="py-2 px-4 cursor-pointer">
					{option.label}
				</div>
			{/each}
		</div>
	{/if}
</div>
