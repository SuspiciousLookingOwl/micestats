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
			score: profile.stats.racing.rounds,
			icon: "/img/icon/racing_rounds.png",
		},
		{
			mode: $_("stats.roundsCompleted"),
			score: profile.stats.racing.finished,
			icon: "/img/icon/racing_finished.png",
		},
		{
			mode: $_("stats.numberOfPodiums"),
			score: profile.stats.racing.podium,
			icon: "/img/icon/racing_podium.png",
		},
		{
			mode: $_("stats.numberOfFirsts"),
			score: profile.stats.racing.first,
			icon: "/img/icon/racing_first.png",
		},
	];
</script>

<Table {headers} {data} title={$_("stats.racing")}>
	<svelte:fragment slot="row" let:row>
		<StatsTableRow {headers} {row} />
	</svelte:fragment>
</Table>
