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
				icon: "https://www.transformice.com/images/x_transformice/x_badges/x_288.png",
			},
			{
				key: "score",
				value: profile.stats.defilante.rounds,
				format: thousandSeparator,
			},
			{
				key: "up",
				value: profile.period.defilante.rounds,
				format: thousandSeparator,
			},
		],
		[
			{
				key: "mode",
				value: "Completed Rounds",
				icon: "https://www.transformice.com/images/x_transformice/x_badges/x_287.png",
			},
			{
				key: "score",
				value: profile.stats.defilante.finished,
				format: thousandSeparator,
			},
			{
				key: "up",
				value: profile.period.defilante.finished,
				format: thousandSeparator,
			},
			{
				key: "ratio",
				value: profile.stats.ratio.defilante.finished,
				format: toPercentage,
			},
		],
		[
			{
				key: "mode",
				value: "Points Gathered",
				icon: "https://www.transformice.com/images/x_transformice/x_badges/x_286.png",
			},
			{
				key: "score",
				value: profile.stats.defilante.points,
				format: thousandSeparator,
			},
			{
				key: "up",
				value: profile.period.defilante.points,
				format: thousandSeparator,
			},
			{
				key: "ratio",
				value: profile.stats.ratio.defilante.points,
				format: toPercentage,
			},
		],
	];
</script>

<Table headers={tableHeaders} data={tableData} title="Defilante">
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
