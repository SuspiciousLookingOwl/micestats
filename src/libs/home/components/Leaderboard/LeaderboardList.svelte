<script lang="ts">
	import type { PlayerLeaderboard, TribeLeaderboard } from "@api";
	import { Text } from "@components";
	import { _ } from "svelte-i18n";
	import { fade } from "svelte/transition";

	export let item: PlayerLeaderboard | TribeLeaderboard;
	export let position: number;

	$: isPlayer = "tfmRoles" in item;
	$: href = `${isPlayer ? "p" : "t"}/${item.name.replace("#", "-")}`;
</script>

<div class="rounded bg-white bg-opacity-5 px-2 py-1" in:fade={{ duration: 150 }}>
	<a {href}>
		<div class="flex flex-row items-center space-x-4">
			<Text variant="title4" class="font-brand text-shadow w-6">{position}.</Text>

			<div class="flex flex-col truncate">
				<Text variant="body1" class="font-semibold truncate">
					{item.name}
				</Text>
				<Text variant="caption">
					{$_("home.score")}: {item.score}
				</Text>
			</div>
		</div>
	</a>
</div>
