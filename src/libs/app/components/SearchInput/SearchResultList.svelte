<script lang="ts">
	import { createEventDispatcher } from "svelte";
	import { fly } from "svelte/transition";

	const emit = createEventDispatcher();

	export let isSelected = false;
	export let clickable = true;
</script>

<div
	class="p-4 -mx-4"
	class:cursor-pointer={clickable}
	class:bg-white={isSelected}
	class:bg-opacity-20={isSelected}
	on:click={() => emit("click")}
	in:fly={{ y: -10, duration: 150 }}
>
	<slot />
</div>
