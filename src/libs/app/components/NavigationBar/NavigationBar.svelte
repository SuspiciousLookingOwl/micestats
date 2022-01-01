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
			prefix: true,
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

	const isActivePath = (currentPath: string, path: string, prefix = false) => {
		return path === currentPath || (prefix && currentPath.startsWith(path));
	};
</script>

<div class="navbar">
	{#each routes as { name, path, prefix }}
		<a href={path} class="cursor-pointer hover:text-shadow hover:transition-all px-4 py-2">
			<Text
				variant="subtitle1"
				class={isActivePath($page.path, path, prefix)
					? "font-medium text-white text-shadow"
					: ""}
			>
				{name}
			</Text>
			{#if isActivePath($page.path, path, prefix)}
				<div class="top-[0.625rem] relative border-b-2 border-white box-border" />
			{/if}
		</a>
	{/each}

	<div class="flex-grow text-right px-4">
		<a href="/">
			<Text variant="title2" class="text-shadow-md font-brand text-center">
				Cheeseformice
			</Text>
		</a>
	</div>
</div>

<style lang="postcss">
	.navbar {
		@apply flex flex-row;
		@apply space-x-4;
		@apply border-b border-opacity-25;
		@apply relative;
		z-index: 1000;
	}
</style>
