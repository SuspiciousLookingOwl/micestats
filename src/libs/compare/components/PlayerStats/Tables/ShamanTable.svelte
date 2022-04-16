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
			mode: $_("stats.miceSavedNormal"),
			score: profile.stats.shaman.savesNormal,
			icon: "/img/icon/shaman_normal.png",
		},
		{
			mode: $_("stats.miceSavedHard"),
			score: profile.stats.shaman.savesHard,
			icon: "/img/icon/shaman_hard.png",
		},
		{
			mode: $_("stats.miceSavedDivine"),
			score: profile.stats.shaman.savesDivine,
			icon: "/img/icon/shaman_divine.png",
		},
		{
			mode: $_("stats.cheeseGatheredShaman"),
			score: profile.stats.shaman.cheese,
			icon: "/img/icon/cheese_coin.png",
		},
	];
</script>

<Table {headers} {data} title={$_("stats.shaman")}>
	<svelte:fragment slot="row" let:row>
		<StatsTableRow {headers} {row} />
	</svelte:fragment>
</Table>
