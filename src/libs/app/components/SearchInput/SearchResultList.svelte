<script lang="ts">
	import classNames from "classnames";
	import { createEventDispatcher } from "svelte";
	import { fly } from "svelte/transition";

	const dispatch = createEventDispatcher();

	//#region props
	export let isSelected = false;
	export let clickable = true;
	//#endregion
</script>

<div
	on:click={() => dispatch("click")}
	in:fly={{ y: -10, duration: 150 }}
	class={classNames("px-4 py-3 -mx-4", {
		"bg-opacity-20 bg-white": isSelected,
		"cursor-pointer hover:bg-white hover:bg-opacity-10": clickable,
	})}
>
	<slot />
</div>
