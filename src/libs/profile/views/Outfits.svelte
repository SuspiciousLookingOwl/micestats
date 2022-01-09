<script lang="ts">
	import Image from "@components/Image/Image.svelte";
	import type { PlayerEntity } from "@entities";

	export let profile: PlayerEntity;
</script>

<div class="grid grid-cols-4 lg:grid-cols-6">
	{#each profile.shop.outfitUrls as outfit}
		<Image src={outfit} class="w-full" expandable lazy autoReload />
	{/each}
</div>
