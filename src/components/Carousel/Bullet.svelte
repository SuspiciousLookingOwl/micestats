<script lang="ts">
	import classNames from "classnames";
	import { createEventDispatcher } from "svelte";

	const dispatch = createEventDispatcher();

	//#region props
	export let isActive = false;
	//#endregion

	//#region classes
	$: bulletClass = classNames(
		"w-3 h-2 lg:h-3 rounded-full bg-white bg-opacity-25 cursor-pointer m-0.5",
		{ "bg-opacity-90": isActive }
	);
	//#endregion
</script>

<div on:click={() => dispatch("click")} class={bulletClass} />
