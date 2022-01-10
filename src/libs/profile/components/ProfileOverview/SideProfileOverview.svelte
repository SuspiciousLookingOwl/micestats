<script lang="ts">
	import { AsyncLoader, Card, Icon, Image, Text } from "@components";
	import type { PlayerEntity } from "@entities";
	import { locale, _ } from "svelte-i18n";
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
		<div class="flex flex-col items-center space-y-4 py-4">
			<!-- if scrolled down -->
			{#if !isInView}
				<div in:fly={{ y: -32 }} class="hidden lg:block text-center">
					<Text variant="subtitle1" class="font-brand">
						{profile.name}
					</Text>
					<Image src={profile.outfitUrl} class="h-32 w-24 mx-auto" />
					<Text variant="subtitle1" class="font-brand">
						{$_("profile.level", { values: { level: profile.level } })}
					</Text>
				</div>
			{/if}

			<div class="flex flex-col items-center space-y-1">
				<!-- title -->
				<AsyncLoader promise={profile.getTitle($locale || undefined)} size="sm" let:value>
					<Text class="italic">
						« {value} »
					</Text>
				</AsyncLoader>

				<!-- soulmate -->
				{#if profile.soulmate}
					<a href="/p/{profile.soulmate.slugName}" class="flex items-center space-x-2">
						<Icon name="heart" class="fill-white" />
						<Text>
							{profile.soulmate.name}
						</Text>
					</a>
				{/if}

				<!-- tribe -->
				{#if profile.tribe}
					<div class="flex items-center space-x-2">
						<Icon name="home" class="fill-white" />
						<Text>
							{profile.tribe.name}
						</Text>
					</div>
				{/if}
			</div>

			<Text variant="caption" class="text-neutral-400">
				ID: {profile.id}
			</Text>
		</div>
	</Card>
</div>

<style lang="postcss">
	.main-container {
		@apply lg:w-72;
	}
</style>
