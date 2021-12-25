<script lang="ts">
	import { createEventDispatcher } from "svelte";

	const dispatch = createEventDispatcher();

	export let value = "";
	export let variant: "sm" | "md" | "lg" = "md";
	export let input: HTMLInputElement | null = null;

	let inputClasses = "";

	$: {
		switch (variant) {
			case "sm":
				inputClasses = "p-2 text-sm 2xl:text-base";
				break;
			case "lg":
				inputClasses = "p-3 2xl:p-4 text-md 2xl:text-xl";
				break;
			default:
				// "md"
				inputClasses = "p-2 2xl:p-3 2xl:text-md";
				break;
		}
	}
</script>

<div class="flex w-full bg-opacity-10 bg-white rounded">
	<slot name="prefix" />
	<input
		bind:value
		bind:this={input}
		class="border-0 bg-transparent w-full focus:outline-none placeholder:text-gray-200 {inputClasses}"
		{...$$restProps}
		on:input={(e) => dispatch("input", e)}
		on:focus={(e) => dispatch("focus", e)}
		on:blur={(e) => dispatch("blur", e)}
	/>
	<slot name="suffix" />
</div>
