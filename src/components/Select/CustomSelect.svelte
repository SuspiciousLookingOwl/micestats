<script lang="ts">
	import { Icon } from "@components";
	import classNames from "classnames";
	import { fly } from "svelte/transition";
	import type { Option, SelectVariant } from "./Select.svelte";

	//#region props
	export let options: Option[];
	export let variant: SelectVariant;
	export let value: Option | null;

	let isOpened = false;

	$: selectClass = classNames(
		"bg-white bg-opacity-10 rounded flex relative items-center pr-4 cursor-pointer"
	);
	$: labelClass = classNames("w-full", {
		"p-2 text-sm 2xl:text-base": variant === "sm",
		"p-2 2xl:p-3 2xl:text-md": variant === "md",
		"p-3 2xl:p-4 text-md 2xl:text-xl": variant === "lg",
	});
	$: optionClass = classNames(
		"absolute w-full rounded bg-neutral-800 top-14 z-10 border-none",
		"divide-y divide-white divide-opacity-10"
	);
	$: iconClass = classNames("fill-current transition-all", { "-rotate-180": !isOpened });
</script>

<div on:click={() => (isOpened = !isOpened)} class={selectClass}>
	<div class={labelClass}>
		{value?.label}
	</div>

	<Icon name="triangleTop" size="sm" class={iconClass} />

	{#if isOpened}
		<div transition:fly={{ duration: 150, y: -16 }} class={optionClass}>
			{#each options as option}
				<div on:click={() => (value = option)} class="py-2 px-4 cursor-pointer">
					{option.label}
				</div>
			{/each}
		</div>
	{/if}
</div>
