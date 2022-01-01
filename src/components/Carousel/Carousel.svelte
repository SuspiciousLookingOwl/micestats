<script lang="ts">
	import { onMount } from "svelte";

	type T = $$Generic;

	export let items: T[];
	let index = 0;

	let slider: HTMLDivElement;

	let touchStartX = 0;
	let touchEndX = 0;

	const next = () => {
		if (index >= items.length - 1) index = 0;
		else index++;
	};

	const previous = () => {
		if (index <= 0) index = items.length - 1;
		else index--;
	};

	const onTouchStart = (e: TouchEvent) => {
		touchStartX = e.changedTouches[0].screenX;
	};

	const onTouchEnd = (e: TouchEvent) => {
		touchEndX = e.changedTouches[0].screenX;
		if (touchEndX < touchStartX) next();
		else if (touchEndX > touchStartX) previous();
	};

	onMount(() => {
		slider.addEventListener("touchstart", onTouchStart, { passive: true });
		slider.addEventListener("touchend", onTouchEnd, { passive: true });
	});
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
