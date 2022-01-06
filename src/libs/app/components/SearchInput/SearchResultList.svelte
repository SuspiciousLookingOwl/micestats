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
	class={classNames("p-4 -mx-4 hover:bg-white hover:bg-opacity-20", {
		"bg-white": isSelected,
		"bg-opacity-20": isSelected,
		"cursor-pointer": clickable,
	})}
>
	<slot />
</div>
