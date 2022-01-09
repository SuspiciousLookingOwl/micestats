<script lang="ts">
	import { Text } from "@components";
	import type { PlayerEntity } from "@entities";
	import { _ } from "svelte-i18n";
	import { fade } from "svelte/transition";
	import { ProfileNavigationBar, ProfileOverview } from "../components";

	export let profile: PlayerEntity | null;
</script>

{#if profile}
	<div transition:fade={{ duration: 150 }}>
		<ProfileOverview {profile} />
		<ProfileNavigationBar {profile} />
	</div>
{:else}
	<Text variant="title1" class="my-8 font-brand">
		{$_("profile.notFound")}
	</Text>
{/if}
