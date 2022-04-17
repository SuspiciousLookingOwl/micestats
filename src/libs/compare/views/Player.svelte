<script lang="ts">
	import { Spinner, Text } from "@components";
	import type { PlayerEntity } from "@entities";
	import { SearchInput, useProfile } from "@libs/compare";
	import { createEventDispatcher } from "svelte";
	import { _ } from "svelte-i18n";
	import PlayerOverview from "../components/PlayerOverview/PlayerOverview.svelte";
	import PlayerStats from "../components/PlayerStats/PlayerStats.svelte";

	interface Events {
		updateprofile: { profiles: (PlayerEntity | null)[] };
	}
	const dispatch = createEventDispatcher<Events>();
	interface $$Events {
		updateprofile: CustomEvent<Events["updateprofile"]>;
	}

	//#region props
	export let defaultUsernames: string[];
	//#endregion

	//#region stores
	const {
		profile: profileA,
		username: usernameA,
		isFetchingProfile: isFetchingProfileA,
	} = useProfile(defaultUsernames[0]);

	const {
		profile: profileB,
		username: usernameB,
		isFetchingProfile: isFetchingProfileB,
	} = useProfile(defaultUsernames[1]);
	//#endregion

	$: if ($profileA || $profileB) {
		dispatch("updateprofile", { profiles: [$profileA, $profileB] });
	}
</script>

<div class="text-center">
	<Text variant="title2" class="font-brand text-shadow">Compare Player</Text>
</div>

<div class="flex flex-col lg:flex-row items-center space-y-1 lg:space-y-0 lg:space-x-3 mt-6">
	<SearchInput bind:value={$usernameA} />
	<Text variant="subtitle1">vs</Text>
	<SearchInput bind:value={$usernameB} />
</div>

<div
	class="flex flex-row mt-4 lg:mt-6 space-x-2 lg:space-x-12 snap-x snap-mandatory overflow-x-auto"
>
	<div class="profile-container space-y-4">
		{#if $isFetchingProfileA}
			<div class="spinner-container">
				<Spinner size="lg" />
			</div>
		{:else if $profileA}
			<PlayerOverview profile={$profileA} />
			<PlayerStats profile={$profileA} />
		{:else if $usernameA}
			<Text variant="subtitle1">
				{$_("compare.playerNotFound")}
			</Text>
		{/if}
	</div>

	<div class="profile-container space-y-4">
		{#if $isFetchingProfileB}
			<div class="spinner-container">
				<Spinner size="lg" />
			</div>
		{:else if $profileB}
			<PlayerOverview profile={$profileB} />
			<PlayerStats profile={$profileB} />
		{:else if $usernameB}
			<Text variant="subtitle1">
				{$_("compare.playerNotFound")}
			</Text>
		{/if}
	</div>
</div>

<style lang="postcss">
	.profile-container {
		@apply flex-1 w-full  snap-center min-w-full lg:min-w-max;
	}

	.spinner-container {
		@apply flex justify-center my-8;
	}
</style>
