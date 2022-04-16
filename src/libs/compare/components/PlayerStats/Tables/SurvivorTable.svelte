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
			score: profile.stats.survivor.rounds,
			icon: "/img/icon/survivor_rounds.png",
		},
		{
			mode: $_("stats.roundsAsShaman"),
			score: profile.stats.survivor.shaman,
			icon: "/img/icon/survivor_shaman.png",
		},
		{
			mode: $_("stats.killedMice"),
			score: profile.stats.survivor.killed,
			icon: "/img/icon/survivor_killed.png",
		},
		{
			mode: $_("stats.roundsSurvived"),
			score: profile.stats.survivor.survivor,
			icon: "/img/icon/survivor_survivor.png",
		},
	];
</script>

<Table {headers} {data} title={$_("stats.survivor")}>
	<svelte:fragment slot="row" let:row>
		<StatsTableRow {headers} {row} />
	</svelte:fragment>
</Table>
