<script lang="ts">
	import { Text } from "@components";
	import Spinner from "@components/Spinner/Spinner.svelte";
	import type { PlayerEntity } from "@entities";
	import { onMount, setContext } from "svelte";
	import { _ } from "svelte-i18n";
	import { fade } from "svelte/transition";
	import { ProfileOverview } from "../components";
	import { profile, useProfile } from "../stores";

	export let initialProfile: PlayerEntity | null = null;
	export let username: string = "";

	const { profileValue, isFetchingProfile, ..._profile } = useProfile(username, initialProfile);
	$isFetchingProfile = true;

	setContext("profile", profile);

	$: if ($profileValue) $profile = $profileValue;
	onMount(() => !$profileValue && _profile.fetch());
</script>

<div class="py-4 hidden md:block">
	<a class="font-brand text-2xl" href="/">
		<Text variant="subtitle1">Home</Text>
	</a>
</div>
{#if $profileValue && $profile}
	<div transition:fade={{ duration: 150 }}>
		<ProfileOverview profile={$profile} />
		<slot />
	</div>
{:else if $isFetchingProfile}
	<div class="flex justify-center w-full my-8">
		<Spinner size="2xl" />
	</div>
{:else}
	<Text variant="title1" class="my-8 font-brand">
		{$_("profile.notFound")}
	</Text>
{/if}
