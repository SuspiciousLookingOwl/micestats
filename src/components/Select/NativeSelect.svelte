<script lang="ts">
	import classNames from "classnames";
	import type { Option, SelectVariant } from "./Select.svelte";

	//#region props
	export let options: Option[];
	export let variant: SelectVariant;
	export let value: Option | null;
	//#endregion

	//#region classes
	$: selectClass = classNames("bg-white bg-opacity-10 rounded p-2 w-full", {
		"p-2 text-sm 2xl:text-base": variant === "sm",
		"p-2 2xl:p-3 2xl:text-md": variant === "md",
		"p-3 2xl:p-4 text-md 2xl:text-xl": variant === "lg",
	});
	$: optionClass = classNames("bg-neutral-800");
	//#endregion
</script>

<select on:change={(e) => (value = options[e.currentTarget.selectedIndex])} class="{selectClass}}">
	{#each options as option}
		<option value={option.value} class={optionClass} on:change={() => (value = option)}>
			{option.label}
		</option>
	{/each}
</select>
