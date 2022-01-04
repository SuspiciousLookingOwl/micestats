<script lang="ts">
	import { Table } from "@components";
	import type { PlayerEntity } from "@entities";
	import { thousandSeparator, toPercentage } from "@utils";
	import { _ } from "svelte-i18n";
	import { StatsTableRow } from "..";

	export let profile: PlayerEntity;

	$: headers = [
		{
			key: "mode",
			label: $_("profile.mode"),
		},
		{
			key: "score",
			label: $_("profile.score"),
			format: thousandSeparator,
		},
		{
			key: "up",
			label: $_("profile.up"),
		},
		{
			key: "ratio",
			label: $_("profile.ratio"),
			format: toPercentage,
		},
	];
	$: data = [
		{
			mode: $_("stats.roundsPlayed"),
			score: profile.stats.mouse.rounds,
			up: profile.period.mouse.rounds,
			icon: "https://www.transformice.com/images/x_transformice/x_inventaire/2259.jpg",
		},
		{
			mode: $_("stats.gatheredCheese"),
			score: profile.stats.mouse.cheese,
			up: profile.period.mouse.cheese,
			ratio: profile.stats.ratio.mouse.cheese,
			icon: "https://www.transformice.com/images/x_transformice/x_inventaire/800.jpg",
		},
		{
			mode: $_("stats.cheeseGatheredFirst"),
			score: profile.stats.mouse.first,
			up: profile.period.mouse.first,
			ratio: profile.stats.ratio.mouse.first,
			icon: "https://www.transformice.com/images/x_transformice/x_inventaire/2254.jpg",
		},
		{
			mode: $_("stats.bootcamp"),
			score: profile.stats.mouse.bootcamp,
			up: profile.period.mouse.bootcamp,
			icon: "https://www.transformice.com/images/x_transformice/x_inventaire/2261.jpg",
		},
	];
</script>

<Table {headers} {data} title={$_("stats.mouse")}>
	<svelte:fragment slot="row" let:row>
		<StatsTableRow {headers} {row} />
	</svelte:fragment>
</Table>
