<script context="module" lang="ts">
	import { browser } from "$app/env";
	import { PlayersService } from "@api";
	import { TransitionedRoutes } from "@components";
	import { PlayerEntity } from "@entities";
	import { background } from "@libs/app";
	import { Base } from "@libs/profile";
	import type { Load } from "@sveltejs/kit";
	import { onMount } from "svelte";
	import { _ } from "svelte-i18n";

	type Params = {
		username: string;
	};

	interface Props {
		profile: PlayerEntity | null;
		username: string;
		path: string;
	}

	export const load: Load<{ pageParams: Params }, { props: Props }> = async ({ page }) => {
		const { username } = page.params;
		let profile: PlayerEntity | null = null;

		if (!browser) {
			const response = await PlayersService.getById(username);
			if (response.status === 200) profile = new PlayerEntity(response.data);
		}

		return { props: { profile, username, path: page.path } };
	};
</script>

<script lang="ts">
	interface $$Props extends Props {}

	export let profile: PlayerEntity | null = null;
	export let username: string;
	export let path: string;

	onMount(() => background.setScale(1.75));
</script>

<svelte:head>
	{#if profile}
		<title>{profile.name} | CheeseForMice</title>
		<meta name="description" content="{profile.name}'s profile on CheeseForMice" />

		<!-- Facebook Meta Tags -->
		<meta
			property="og:url"
			content="{import.meta.env.VITE_APP_BASE_URL}/p/{profile.slugUsername}"
		/>
		<meta property="og:type" content="website" />
		<meta property="og:title" content="Owl#3124 | CheeseForMice" />
		<meta property="og:description" content="" />
		<meta
			property="og:image"
			content="{import.meta.env.VITE_APP_BASE_URL}/api/dressroom/{profile.shop.look}"
		/>

		<!-- Twitter Meta Tags -->
		<meta name="twitter:card" content="summary_large_image" />
		<meta
			property="twitter:url"
			content="{import.meta.env.VITE_APP_BASE_URL}/p/{profile.slugUsername}"
		/>
		<meta name="twitter:title" content="{profile.name} | CheeseForMice" />
		<meta name="twitter:description" content={profile.title.toString()} />
		<meta
			name="twitter:image"
			content="{import.meta.env.VITE_APP_BASE_URL}/api/dressroom/{profile.shop.look}"
		/>
	{:else}
		<title>{$_("profile.notFound")} | CheeseForMice</title>
		<meta name="description" content={$_("profile.notFound")} />
	{/if}
</svelte:head>

{#key username}
	<Base {username}>
		<div class="py-4">
			<TransitionedRoutes level={2} deep {path}>
				<slot />
			</TransitionedRoutes>
		</div>
	</Base>
{/key}
