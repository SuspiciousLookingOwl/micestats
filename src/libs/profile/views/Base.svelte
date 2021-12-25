<script lang="ts">
	import { Text } from "@components";
	import type { PlayerEntity } from "@entities";
	import { _ } from "svelte-i18n";
	import { fade } from "svelte/transition";
	import { ProfileOverview } from "../components";

	export let profile: PlayerEntity | null;
</script>

<div class="py-4 hidden md:block">
	<a class="font-brand text-2xl" href="/">
		<Text variant="subtitle1">Home</Text>
	</a>
</div>
{#if profile}
	<div transition:fade={{ duration: 150 }}>
		<ProfileOverview {profile} />
	</div>
{:else}
	<Text variant="title1" class="my-8 font-brand">
		{$_("profile.notFound")}
	</Text>
{/if}
