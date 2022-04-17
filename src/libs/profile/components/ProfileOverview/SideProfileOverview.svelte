<script lang="ts">
	import { AsyncLoader, Card, Icon, Image, Text } from "@components";
	import type { PlayerEntity } from "@entities";
	import { onMount } from "svelte";
	import { locale, _ } from "svelte-i18n";
	import { fly } from "svelte/transition";

	export let profile: PlayerEntity;

	let isInView: boolean = true;
	let side: HTMLDivElement;

	onMount(() => {
		const observer = new IntersectionObserver(
			([e]) => {
				isInView = e.isIntersecting;
			},
			{
				rootMargin: "-9px 0px 0px 0px",
				threshold: [1],
			}
		);
		observer.observe(side);
	});
</script>

<div bind:this={side} class="main-container">
	<Card class="main-container">
		<div class="flex flex-col items-center space-y-6 py-4">
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

			<div class="flex flex-col items-center space-y-2">
				<!-- title -->
				<AsyncLoader
					promise={profile.getTitle($locale || undefined)}
					size="sm"
					variant="dots"
					let:value
					class="h-6 flex items-center"
				>
					<Text class="italic">
						<a href="/p/{profile.slugName}/titles">
							« {value.title} »
						</a>
					</Text>
				</AsyncLoader>

				<!-- registration date -->
				<div class="flex items-center space-x-2">
					<Icon name="clock" class="fill-white" />
					<Text>
						{profile.registrationDate}
					</Text>
				</div>

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

			<div class="flex items-center space-x-2">
				<Icon name="compare" class="fill-white" />
				<a
					href={`/compare/player/${profile.slugName}`}
					class="underline underline-offset-1"
				>
					{$_("profile.compare")}
				</a>
			</div>

			<Text variant="caption" class="text-neutral-400">
				ID: {profile.id}
			</Text>
		</div>
	</Card>
</div>

<style lang="postcss">
	.main-container {
		@apply lg:w-72 lg:sticky top-2;
		align-self: flex-start;
	}
</style>
