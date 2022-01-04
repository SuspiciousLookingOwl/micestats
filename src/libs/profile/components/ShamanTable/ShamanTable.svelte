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
			mode: $_("stats.miceSavedNormal"),
			score: profile.stats.shaman.savesNormal,
			up: profile.period.shaman.savesNormal,
			ratio: profile.stats.ratio.shaman.savesNormal,
			icon: "https://www.transformice.com/images/x_transformice/x_divers/x_mc0.jpg",
		},
		{
			mode: $_("stats.miceSavedHard"),
			score: profile.stats.shaman.savesHard,
			up: profile.period.shaman.savesHard,
			ratio: profile.stats.ratio.shaman.savesHard,
			icon: "https://www.transformice.com/images/x_transformice/x_divers/x_mc1.jpg",
		},
		{
			mode: $_("stats.miceSavedDivine"),
			score: profile.stats.shaman.savesDivine,
			up: profile.period.shaman.savesDivine,
			ratio: profile.stats.ratio.shaman.savesDivine,
			icon: "https://www.transformice.com/images/x_transformice/x_divers/x_mc2.jpg",
		},
		{
			mode: $_("stats.cheeseGatheredShaman"),
			score: profile.stats.shaman.cheese,
			up: profile.period.shaman.cheese,
			ratio: profile.stats.ratio.shaman.cheese,
			icon: "https://www.transformice.com/images/x_transformice/x_inventaire/800.jpg",
		},
	];
</script>

<Table {headers} {data} title={$_("stats.shaman")}>
	<svelte:fragment slot="row" let:row>
		<StatsTableRow {headers} {row} />
	</svelte:fragment>
</Table>
