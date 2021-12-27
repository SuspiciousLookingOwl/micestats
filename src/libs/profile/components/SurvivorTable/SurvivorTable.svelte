<script lang="ts">
	import { DefaultCell, Table } from "@components";
	import type { PlayerEntity } from "@entities";
	import { thousandSeparator, toPercentage } from "@utils";
	import { _ } from "svelte-i18n";
	import { ModeCellContent, UpCellContent } from "..";

	export let profile: PlayerEntity;

	$: tableHeaders = [
		{
			key: "mode",
			label: $_("profile.mode"),
		},
		{
			key: "score",
			label: $_("profile.score"),
		},
		{
			key: "up",
			label: $_("profile.up"),
		},
		{
			key: "ratio",
			label: $_("profile.ratio"),
		},
	];
	$: tableData = [
		[
			{
				key: "mode",
				value: "Rounds Played",
				icon: "https://www.transformice.com/images/x_transformice/x_badges/x_120.png",
			},
			{
				key: "score",
				value: profile.stats.survivor.rounds,
				format: thousandSeparator,
			},
			{
				key: "up",
				value: profile.period.survivor.rounds,
				format: thousandSeparator,
			},
		],
		[
			{
				key: "mode",
				value: "Rounds as Shaman",
				icon: "https://www.transformice.com/images/x_transformice/x_badges/x_121.png",
			},
			{
				key: "score",
				value: profile.stats.survivor.shaman,
				format: thousandSeparator,
			},
			{
				key: "up",
				value: profile.period.survivor.shaman,
				format: thousandSeparator,
			},
			{
				key: "ratio",
				value: profile.stats.ratio.survivor.shaman,
				format: toPercentage,
			},
		],
		[
			{
				key: "mode",
				value: "Killed Mice",
				icon: "https://www.transformice.com/images/x_transformice/x_badges/x_122.png",
			},
			{
				key: "score",
				value: profile.stats.survivor.killed,
				format: thousandSeparator,
			},
			{
				key: "up",
				value: profile.period.survivor.killed,
				format: thousandSeparator,
			},
			{
				key: "ratio",
				value: profile.stats.ratio.survivor.killed,
				format: toPercentage,
			},
		],
		[
			{
				key: "mode",
				value: "Rounds Survived",
				icon: "https://www.transformice.com/images/x_transformice/x_badges/x_123.png",
			},
			{
				key: "score",
				value: profile.stats.survivor.survivor,
				format: thousandSeparator,
			},
			{
				key: "up",
				value: profile.period.survivor.survivor,
				format: thousandSeparator,
			},
			{
				key: "ratio",
				value: profile.stats.ratio.survivor.survivor,
				format: toPercentage,
			},
		],
	];
</script>

<Table headers={tableHeaders} data={tableData} title="Shaman">
	<tr slot="row" let:row>
		{#each row as cell}
			{#if cell.key === "mode"}
				<DefaultCell>
					<ModeCellContent value={cell.value} icon={cell.icon} />
				</DefaultCell>
			{:else if cell.key === "up"}
				<DefaultCell>
					<UpCellContent value={cell.value} />
				</DefaultCell>
			{:else}
				<DefaultCell {cell} />
			{/if}
		{/each}
	</tr>
</Table>
