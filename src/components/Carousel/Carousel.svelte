<script lang="ts">
	import { onMount } from "svelte";

	type T = $$Generic;

	export let items: T[];
	let index = 0;

	let slider: HTMLDivElement;

	let touchStartX = 0;
	let touchEndX = 0;

	const next = () => {
		index = Math.min(index + 1, items.length - 1);
	};

	const previous = () => {
		index = Math.max(0, index - 1);
	};

	onMount(() => {
		slider.addEventListener("touchstart", (e) => {
			touchStartX = e.changedTouches[0].screenX;
		});
		slider.addEventListener("touchend", (e) => {
			touchEndX = e.changedTouches[0].screenX;
			handleGesture();
		});
	});

	function handleGesture() {
		if (touchEndX < touchStartX) next();
		if (touchEndX > touchStartX) previous();
	}
</script>

<div bind:this={slider} class="flex flex-col items-center space-y-2">
	{#key index}
		<slot item={items[index]} />
	{/key}
	<div class="flex flex-row flex-wrap">
		{#each Array(items.length) as _, i}
			<div
				class="w-3 h-2 lg:h-3 rounded-full bg-white bg-opacity-25 cursor-pointer m-0.5"
				on:click={() => (index = i)}
				class:bg-opacity-100={index === i}
			/>
		{/each}
	</div>
</div>
