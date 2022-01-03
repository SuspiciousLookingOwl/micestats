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
			mode: $_("profile.stats.survivor.roundsPlayed"),
			score: profile.stats.survivor.rounds,
			up: profile.period.survivor.rounds,
			icon: "https://www.transformice.com/images/x_transformice/x_badges/x_120.png",
		},
		{
			mode: $_("profile.stats.survivor.roundsAsShaman"),
			score: profile.stats.survivor.shaman,
			up: profile.period.survivor.shaman,
			ratio: profile.stats.ratio.survivor.shaman,
			icon: "https://www.transformice.com/images/x_transformice/x_badges/x_121.png",
		},
		{
			mode: $_("profile.stats.survivor.killedMice"),
			score: profile.stats.survivor.killed,
			up: profile.period.survivor.killed,
			ratio: profile.stats.ratio.survivor.killed,
			icon: "https://www.transformice.com/images/x_transformice/x_badges/x_122.png",
		},
		{
			mode: $_("profile.stats.survivor.roundsSurvived"),
			score: profile.stats.survivor.survivor,
			up: profile.period.survivor.survivor,
			ratio: profile.stats.ratio.survivor.survivor,
			icon: "https://www.transformice.com/images/x_transformice/x_badges/x_123.png",
		},
	];
</script>

<Table {headers} {data} title={$_("profile.stats.survivor.title")}>
	<svelte:fragment slot="row" let:row>
		<StatsTableRow {headers} {row} />
	</svelte:fragment>
</Table>
