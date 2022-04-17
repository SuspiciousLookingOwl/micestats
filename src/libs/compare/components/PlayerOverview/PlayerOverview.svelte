<script lang="ts">
	import { AsyncLoader, Card, Icon, Image, Text } from "@components";
	import type { PlayerEntity } from "@entities";
	import { locale, _ } from "svelte-i18n";

	export let profile: PlayerEntity;
</script>

<Card class="flex flex-col items-center space-y-6 py-4 h-[412px] justify-end">
	<div class="text-center">
		<Text variant="subtitle1" class="font-brand">
			{profile.name}
		</Text>
		<Image src={profile.outfitUrl} class="h-32 w-24 mx-auto" />
		<Text variant="subtitle1" class="font-brand">
			{$_("profile.level", { values: { level: profile.level } })}
		</Text>
	</div>

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

	<div class="relative flex-grow w-full">
		<Text variant="caption" class="absolute text-neutral-400 bottom-0 w-full text-center">
			ID: {profile.id}
		</Text>
	</div>
</Card>
