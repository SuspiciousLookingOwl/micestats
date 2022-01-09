<script lang="ts">
	import { Text } from "@components";
	import type { PlayerLeaderboardEntity, TribeLeaderboardEntity } from "@entities";
	import { _ } from "svelte-i18n";
	import { fade } from "svelte/transition";

	export let item: PlayerLeaderboardEntity | TribeLeaderboardEntity;
	export let position: number;

	$: isPlayer = "tfmRoles" in item;
	$: href = `${isPlayer ? "p" : "t"}/${item.target.slugName}`;
</script>

<a {href} class="rounded bg-white bg-opacity-5 px-2 py-1" in:fade={{ duration: 150 }}>
	<div class="flex flex-row items-center space-x-4">
		<Text variant="title3" class="font-brand text-shadow w-7 xl:w-9 text-center"
			>{position}.</Text
		>

		<div class="flex flex-col truncate space-y-0.5">
			<Text variant="body1" class="font-medium truncate">
				{item.target.name}
			</Text>
			<Text variant="caption">
				{$_("home.score")}: {item.score}
			</Text>
		</div>
	</div>
</a>
