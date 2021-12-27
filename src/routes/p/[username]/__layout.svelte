<script lang="ts" context="module">
	import { browser } from "$app/env";
	import { Spinner, TransitionedRoutes } from "@components";
	import { PlayerEntity, type PlayerProps } from "@entities";
	import { background } from "@libs/app";
	import { Base, fetchProfile, useProfile } from "@libs/profile";
	import type { Load } from "@sveltejs/kit";
	import { setContext } from "svelte";
	import { _ } from "svelte-i18n";

	type Params = {
		username: string;
		context: string; // TODO: properly hydrate this
	};

	interface Props {
		ssrProfile: PlayerProps | null;
		username: string;
		path: string;
	}

	export const load: Load<{ pageParams: Params }, { props: Props }> = async ({ page }) => {
		const { username } = page.params;
		let ssrProfile: PlayerProps | null = null;

		if (!browser) {
			page.params.context = JSON.stringify(ssrProfile);
			const response = await fetchProfile(username);
			if (response) ssrProfile = response.toProps();
			page.params.context = JSON.stringify(ssrProfile); // TODO: properly hydrate this
		} else if (page.params.context) {
			ssrProfile = JSON.parse(page.params.context);
		}

		return { props: { ssrProfile, username, path: page.path } };
	};
</script>

<script lang="ts">
	interface $$Props extends Props {}

	background.setScale(1.75);

	export let ssrProfile: PlayerProps | null = null;
	let paramUsername: string;
	export { paramUsername as username };
	export let path: string;

	const { username, profile, isFetchingProfile } = useProfile(
		paramUsername,
		ssrProfile ? new PlayerEntity(ssrProfile) : null
	);
	setContext("profile", profile);

	// on username change
	$: if (paramUsername !== $username) $username = paramUsername;
</script>

<svelte:head>
	{#if $profile}
		<title>{$profile.name} | CheeseForMice</title>
		<meta name="description" content="{$profile.name}'s profile on CheeseForMice" />

		<!-- Facebook Meta Tags -->
		<meta
			property="og:url"
			content="{import.meta.env.VITE_APP_BASE_URL}/p/{$profile.slugUsername}"
		/>
		<meta property="og:type" content="website" />
		<meta property="og:title" content="{$profile.name} | CheeseForMice" />
		<meta property="og:description" content="" />
		<meta
			property="og:image"
			content="{import.meta.env.VITE_APP_BASE_URL}/og/profile/{$profile.slugUsername}"
		/>
		<meta property="og:image:width" content="1200" />
		<meta property="og:image:height" content="600" />

		<!-- Twitter Meta Tags -->
		<meta name="twitter:card" content="summary_large_image" />
		<meta
			property="twitter:url"
			content="{import.meta.env.VITE_APP_BASE_URL}/p/{$profile.slugUsername}"
		/>
		<meta name="twitter:title" content="{$profile.name} | CheeseForMice" />
		<meta name="twitter:description" content={$profile.title.toString()} />
		<meta
			name="twitter:image:src"
			content="{import.meta.env.VITE_APP_BASE_URL}/og/profile/{$profile.slugUsername}"
		/>
	{:else if !$isFetchingProfile}
		<title>{$_("profile.notFound")} | CheeseForMice</title>
		<meta name="description" content={$_("profile.notFound")} />
	{/if}
</svelte:head>

{#key username}
	{#if $isFetchingProfile && browser}
		<div class="flex justify-center w-full my-8">
			<Spinner size="2xl" />
		</div>
	{:else if $profile}
		<Base profile={$profile} />
		<div class="py-4">
			<TransitionedRoutes level={2} deep {path}>
				<slot profile={$profile} />
			</TransitionedRoutes>
		</div>
	{/if}
{/key}
