<script lang="ts">
	import { page } from "$app/stores";
	import { Text } from "@components";
	import { _ } from "svelte-i18n";

	const routes = [
		{
			name: $_("nav.home"),
			path: "/",
		},
		{
			name: $_("nav.leaderboards"),
			path: "/leaderboards",
		},
		{
			name: $_("nav.search"),
			path: "/search",
		},
		{
			name: $_("nav.about"),
			path: "/about",
		},
	];
</script>

<div class="navbar">
	{#each routes as { name, path }}
		<a href={path} class="cursor-pointer hover:text-shadow hover:transition-all px-4 py-2">
			<Text
				variant="subtitle1"
				class={path === $page.path ? "font-medium text-white text-shadow" : ""}
			>
				{name}
			</Text>
			{#if path === $page.path}
				<div class="top-[0.625rem] relative border-b-2 border-white box-border" />
			{/if}
		</a>
	{/each}

	<div class="flex-grow text-right px-4">
		<a href="/">
			<Text variant="title2" class="text-shadow-md font-brand text-center">CheeseForMice</Text
			>
		</a>
	</div>
</div>

<style lang="postcss">
	.navbar {
		@apply flex flex-row;
		@apply space-x-4;
		@apply border-b border-opacity-25;
		z-index: 1000;
	}
</style>
