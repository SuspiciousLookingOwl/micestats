<script lang="ts">
	import { Icon, type Icons } from "@components";

	interface Item {
		name: Icons;
		href: string;
		large?: boolean;
	}

	const items: Item[] = [
		{
			name: "home",
			href: "/",
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
	{#each items as { name, large, href }}
		<a class="item" {href}>
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
		@apply flex w-full h-full items-center justify-center;
	}
</style>
