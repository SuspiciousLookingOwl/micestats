<script lang="ts">
	import { Text } from "@components";
	import { SearchInput, useProfile } from "@libs/compare";
	import PlayerOverview from "../components/PlayerOverview/PlayerOverview.svelte";
	import PlayerStats from "../components/PlayerStats/PlayerStats.svelte";

	const {
		profile: profileA,
		username: usernameA,
		isFetchingProfile: isFetchingProfileA,
	} = useProfile("Owl#3124");

	const {
		profile: profileB,
		username: usernameB,
		isFetchingProfile: isFetchingProfileB,
	} = useProfile("Raster");
</script>

<div class="text-center">
	<Text variant="title2" class="font-brand text-shadow">Compare Player</Text>
</div>

<div class="flex flex-col lg:flex-row items-center space-y-1 lg:space-y-0 lg:space-x-3 mt-6">
	<SearchInput bind:value={$usernameA} />
	<Text variant="subtitle1">vs</Text>
	<SearchInput bind:value={$usernameB} />
</div>

<div class="hidden lg:block mt-6">
	<div class="grid grid-cols-2 gap-x-2 lg:gap-x-12">
		<PlayerOverview
			profile={$profileA}
			isLoading={$isFetchingProfileA}
			notFound={!!$usernameA}
		/>
		<PlayerOverview
			profile={$profileB}
			isLoading={$isFetchingProfileB}
			notFound={!!$usernameB}
		/>

		{#if $profileA}
			<div class="mt-4">
				<PlayerStats profile={$profileA} />
			</div>
		{/if}

		{#if $profileB}
			<div class="mt-4">
				<PlayerStats profile={$profileB} />
			</div>
		{/if}
	</div>
</div>

<div class="block lg:hidden mt-4">
	<div class="flex space-x-2 overflow-x-auto snap-x snap-mandatory">
		{#if $profileA}
			<div class="snap-center min-w-full">
				<PlayerOverview
					profile={$profileA}
					isLoading={$isFetchingProfileA}
					notFound={!!$usernameA}
				/>

				<div class="mt-4">
					<PlayerStats profile={$profileA} />
				</div>
			</div>
		{/if}

		{#if $profileB}
			<div class="snap-center min-w-full">
				<PlayerOverview
					profile={$profileB}
					isLoading={$isFetchingProfileB}
					notFound={!!$usernameB}
				/>
				<div class="mt-4">
					<PlayerStats profile={$profileB} />
				</div>
			</div>
		{/if}
	</div>
</div>
