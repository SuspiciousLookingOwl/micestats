<script lang="ts">
	import { Table } from "@components";
	import type { PlayerEntity } from "@entities";
	import { thousandSeparator } from "@utils";
	import { _ } from "svelte-i18n";
	import { StatsTableRow } from "../TableContent";

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
	];
	$: data = [
		{
			mode: $_("stats.roundsPlayed"),
			score: profile.stats.defilante.rounds,
			icon: "/img/icon/defilante_rounds.png",
		},
		{
			mode: $_("stats.roundsCompleted"),
			score: profile.stats.defilante.finished,
			icon: "/img/icon/defilante_completed.png",
		},
		{
			mode: $_("stats.pointsGathered"),
			score: profile.stats.defilante.points,
			icon: "/img/icon/defilante_points.png",
		},
	];
</script>

<Table {headers} {data} title={$_("stats.defilante")}>
	<svelte:fragment slot="row" let:row>
		<StatsTableRow {headers} {row} />
	</svelte:fragment>
</Table>
