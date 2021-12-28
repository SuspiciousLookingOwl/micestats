<script lang="ts">
	import { AsyncLoader, Card, Carousel, Icon, Image, Text } from "@components";
	import type { PlayerEntity } from "@entities";
	import { locale } from "svelte-i18n";
	import { fly } from "svelte/transition";

	export let profile: PlayerEntity;

	let isInView: boolean = true;
	let side: HTMLDivElement;

	const onScroll = () => {
		const rect = side.getBoundingClientRect();
		isInView = rect.y > 8; // adjust treshold accoring to mt
	};
</script>

<svelte:window on:scroll={onScroll} />

<div bind:this={side} />
{#if !isInView}
	<div class="main-container" />
{/if}
<div
	class="main-container 
		{!isInView && 'lg:fixed lg:top-0 lg:mt-2 !ml-0'}"
>
	<Card class="main-container">
		<div class="flex flex-col items-center space-y-4 p-4">
			<!-- name -->
			{#if !isInView}
				<div in:fly={{ y: -32 }} class="hidden lg:block">
					<Text variant="subtitle1" class="font-brand">
						{profile.name}
					</Text>
				</div>
			{/if}

			<!-- look and outfits -->
			<Carousel items={[profile.outfitUrl, ...profile.shop.outfitUrls]}>
				<svelte:fragment let:item>
					<Image src={item} class="h-32 w-24 snap-center" expandable />
				</svelte:fragment>
			</Carousel>

			<!-- title -->
			<AsyncLoader promise={profile.getTitle($locale || undefined)} size="sm" let:value>
				<Text class="italic">
					« {value} »
				</Text>
			</AsyncLoader>

			<!-- soulmate -->
			{#if profile.soulmate}
				<div class="pt-4">
					<a href="/p/{profile.soulmate.slugName}" class="flex items-center space-x-2">
						<Icon name="heart" class="fill-white mt-1" />
						<Text>
							{profile.soulmate.name}
						</Text>
					</a>
				</div>
			{/if}
		</div>
	</Card>
</div>

<style lang="postcss">
	.main-container {
		@apply lg:w-[14rem];
	}
</style>
