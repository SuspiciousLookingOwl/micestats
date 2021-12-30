<script lang="ts">
	import { page } from "$app/stores";
	import { Text } from "@components";

	const routes = [
		{
			name: "Home",
			path: "/",
		},
		{
			name: "Leaderboards",
			path: "/leaderboards",
		},
		{
			name: "About",
			path: "/about",
		},
	];
</script>

<div class="flex flex-row items-center space-x-8 pb-2 border-b border-opacity-25 px-8">
	{#each routes as { name, path }}
		<a href={path} class="cursor-pointer hover:text-shadow hover:transition-all">
			<Text variant="subtitle1" class={path === $page.path ? "font-medium text-white" : ""}>
				{name}
			</Text>
			{#if path === $page.path}
				<div
					class="top-[0.675rem] 2xl:top-[0.875rem] relative border-b-2 border-white box-border"
				/>
			{/if}
		</a>
	{/each}

	<div class="flex-grow text-right">
		<a href="/">
			<Text variant="title2" class="text-shadow-md font-brand text-center">CheeseForMice</Text
			>
		</a>
	</div>
</div>
