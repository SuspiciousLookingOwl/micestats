<script lang="ts">
	import classNames from "classnames";
	import { createEventDispatcher } from "svelte";

	const dispatch = createEventDispatcher();

	//#region props
	export let value = "";
	export let variant: "sm" | "md" | "lg" = "md";
	export let input: HTMLInputElement | null = null;
	export let extraContainerClass = "";
	//#endregion

	//#region classes
	$: inputClass = classNames(
		{
			"p-2 text-sm 2xl:text-base": variant === "sm",
			"p-2 2xl:p-3 2xl:text-md": variant === "md",
			"p-3 2xl:p-4 text-md 2xl:text-xl": variant === "lg",
		},
		"border-0 bg-transparent w-full focus:outline-none placeholder:text-gray-300"
	);
	$: containerClass = classNames(
		"flex w-full lg:bg-opacity-50 lg:bg-neutral-900 rounded",
		extraContainerClass
	);
	//#endregion
</script>

<div class={containerClass}>
	<slot name="prefix" />
	<input
		bind:value
		bind:this={input}
		{...$$restProps}
		on:input={(e) => dispatch("input", e)}
		on:focus={(e) => dispatch("focus", e)}
		on:blur={(e) => dispatch("blur", e)}
		class={inputClass}
	/>
	<slot name="suffix" />
</div>
