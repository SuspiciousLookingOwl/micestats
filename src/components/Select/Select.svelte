<script lang="ts" context="module">
	export interface Option {
		label: string;
		value: string;
	}

	export type SelectVariant = "sm" | "md" | "lg";
</script>

<script lang="ts">
	import { createEventDispatcher } from "svelte";
	import CustomSelect from "./CustomSelect.svelte";
	import NativeSelect from "./NativeSelect.svelte";

	interface Events {
		change: Option | null;
	}

	interface $$Events {
		change: CustomEvent<Events["change"]>;
	}

	const dispatch = createEventDispatcher<Events>();

	//#region props
	export let options: Option[] = [];
	export let variant: SelectVariant = "md";
	export let value: Option | null = options[0] || null;
	//#endregion

	//#region event handlers
	$: dispatch("change", value);
	//#endregion
</script>

<!-- small screen -->
<div class="lg:hidden w-full">
	<NativeSelect bind:value {options} {variant} />
</div>

<!-- large screen -->
<div class="hidden lg:block">
	<CustomSelect bind:value {options} {variant} />
</div>
