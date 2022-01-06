<script lang="ts">
	import classNames from "classnames";
	import { createEventDispatcher } from "svelte";

	const dispatch = createEventDispatcher();

	//#region props
	export let value = "";
	export let variant: "sm" | "md" | "lg" = "md";
	export let input: HTMLInputElement | null = null;
	//#endregion

	//#region classes
	$: inputClass = classNames(
		{
			"p-2 text-sm 2xl:text-base": variant === "sm",
			"p-3 2xl:p-4 text-md 2xl:text-xl": variant === "md",
			"p-2 2xl:p-3 2xl:text-md": variant === "lg",
		},
		"border-0 bg-transparent w-full focus:outline-none placeholder:text-gray-200"
	);
	//#endregion
</script>

<div class="flex w-full bg-opacity-10 bg-white rounded">
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
