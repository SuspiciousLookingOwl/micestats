<script lang="ts">
	import Bullet from "./Bullet.svelte";
	import { swipe } from "./swipe";
	import { useCarousel } from "./useCarousel";

	type T = $$Generic;

	//#region props
	export let items: T[];
	//#endregion

	//#region state
	let carousel = useCarousel();
	$: carousel.setLength(items.length);
	//#endregion
</script>

<div
	use:swipe
	on:swipeleft={carousel.next}
	on:swiperight={carousel.previous}
	class="flex flex-col items-center space-y-2"
>
	{#key $carousel}
		<slot item={items[$carousel]} />
	{/key}
	<div class="flex flex-row flex-wrap">
		{#each Array(items.length) as _, i}
			<Bullet on:click={() => ($carousel = i)} isActive={$carousel === i} />
		{/each}
	</div>
</div>
