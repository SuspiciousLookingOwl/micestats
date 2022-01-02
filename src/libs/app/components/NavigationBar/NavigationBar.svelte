<script lang="ts" context="module">
	export interface Route {
		name: string;
		path: string;
		exact?: boolean;
	}
</script>

<script lang="ts">
	import { page } from "$app/stores";
	import { Text } from "@components";

	export let routes: Route[] = [];

	const isActivePath = (currentPath: string, path: string, exact = false) => {
		return path === currentPath || (!exact && currentPath.startsWith(path));
	};
</script>

<div class="navbar">
	{#each routes as { name, path, exact }}
		<a href={path} class="cursor-pointer hover:text-shadow hover:transition-all px-4 py-2">
			<Text
				variant="subtitle1"
				class={isActivePath($page.path, path, exact)
					? "font-medium text-white text-shadow"
					: ""}
			>
				{name}
			</Text>
			{#if isActivePath($page.path, path, exact)}
				<div class="top-[0.625rem] relative border-b-2 border-white box-border" />
			{/if}
		</a>
	{/each}

	<div class="flex-grow text-right px-4">
		<slot name="right" />
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
