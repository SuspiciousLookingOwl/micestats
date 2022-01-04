<script lang="ts" context="module">
	import { background } from "@libs/app";
	import { Leaderboard, LeaderboardCategory } from "@libs/leaderboard";
	import type { Load } from "@sveltejs/kit";

	export const load: Load = async ({ page }) => {
		return { props: { category: page.params.category } };
	};
</script>

<script lang="ts">
	interface $$Props {
		category: LeaderboardCategory;
	}

	export let category: LeaderboardCategory;

	background.setScale(1.75);
</script>

<Leaderboard {category} />
