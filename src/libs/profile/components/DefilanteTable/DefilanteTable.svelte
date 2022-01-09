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
			score: profile.stats.defilante.rounds,
			up: profile.period.defilante.rounds,
			icon: "/img/icon/defilante_rounds.png",
		},
		{
			mode: $_("stats.roundsCompleted"),
			score: profile.stats.defilante.finished,
			up: profile.period.defilante.finished,
			ratio: profile.stats.ratio.defilante.finished,
			icon: "/img/icon/defilante_completed.png",
		},
		{
			mode: $_("stats.pointsGathered"),
			score: profile.stats.defilante.points,
			up: profile.period.defilante.points,
			ratio: profile.stats.ratio.defilante.points,
			icon: "/img/icon/defilante_points.png",
		},
	];
</script>

<Table {headers} {data} title={$_("stats.defilante")}>
	<svelte:fragment slot="row" let:row>
		<StatsTableRow {headers} {row} />
	</svelte:fragment>
</Table>
