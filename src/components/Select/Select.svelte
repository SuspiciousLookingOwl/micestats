<script lang="ts" context="module">
	export interface Option {
		label: string;
		value: string;
	}

	export type SelectVariant = "sm" | "md" | "lg";
</script>

<script lang="ts">
	import CustomSelect from "./CustomSelect.svelte";
	import NativeSelect from "./NativeSelect.svelte";

	//#region props
	export let options: Option[] = [];
	export let variant: SelectVariant = "md";
	export let value: Option | null = options[0] || null;
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
