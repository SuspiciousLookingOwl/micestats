<script lang="ts">
	import { page } from "$app/stores";
	import { Icon, type Icons } from "@components";
	import classNames from "classnames";

	interface Item {
		name: Icons;
		href: string;
		large?: boolean;
		exact?: boolean;
	}

	const items: Item[] = [
		{
			name: "home",
			href: "/",
			exact: true,
		},
		{
			name: "leaderboard",
			href: "/leaderboards",
			large: true,
		},
		{
			name: "search",
			href: "/search",
		},
		{
			name: "menu",
			href: "/#",
		},
	];
</script>

<div class="h-14" />

<div class="bottom-nav">
	{#each items as { name, large, href, exact }}
		<a
			class={classNames("item", {
				"item-active": exact ? $page.path === href : $page.path.startsWith(href),
			})}
			{href}
		>
			<Icon {name} size={large ? "2xl" : "lg"} class="fill-current mx-auto" />
		</a>
	{/each}
</div>

<style lang="postcss">
	.bottom-nav {
		@apply grid grid-cols-4;
		@apply fixed w-screen bottom-0 h-14;
		@apply bg-gray-900;
		z-index: 1000;
	}

	.item {
		@apply flex w-full h-full items-center justify-center transition-colors text-neutral-300;
	}

	.item-active {
		@apply bg-gray-800 text-neutral-50;
	}
</style>
