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
				value: "Mice Saved (Normal)",
				icon: "https://www.transformice.com/images/x_transformice/x_divers/x_mc0.jpg",
			},
			{
				key: "score",
				value: profile.stats.shaman.savesNormal,
				format: thousandSeparator,
			},
			{
				key: "up",
				value: profile.period.shaman.savesNormal,
				format: thousandSeparator,
			},
			{
				key: "ratio",
				value: profile.stats.ratio.shaman.savesNormal,
				format: toPercentage,
			},
		],
		[
			{
				key: "mode",
				value: "Mice Saved (Hard)",
				icon: "https://www.transformice.com/images/x_transformice/x_divers/x_mc1.jpg",
			},
			{
				key: "score",
				value: profile.stats.shaman.savesHard,
				format: thousandSeparator,
			},
			{
				key: "up",
				value: profile.period.shaman.savesHard,
				format: thousandSeparator,
			},
			{
				key: "ratio",
				value: profile.stats.ratio.shaman.savesHard,
				format: toPercentage,
			},
		],
		[
			{
				key: "mode",
				value: "Mice Saved (Divine)",
				icon: "https://www.transformice.com/images/x_transformice/x_divers/x_mc2.jpg",
			},
			{
				key: "score",
				value: profile.stats.shaman.savesDivine,
				format: thousandSeparator,
			},
			{
				key: "up",
				value: profile.period.shaman.savesDivine,
				format: thousandSeparator,
			},
			{
				key: "ratio",
				value: profile.stats.ratio.shaman.savesDivine,
				format: toPercentage,
			},
		],
		[
			{
				key: "mode",
				value: "Cheese Gathered",
				icon: "https://www.transformice.com/images/x_transformice/x_inventaire/800.jpg",
			},
			{
				key: "score",
				value: profile.stats.shaman.cheese,
				format: thousandSeparator,
			},
			{
				key: "up",
				value: profile.period.shaman.cheese,
				format: thousandSeparator,
			},
			{
				key: "ratio",
				value: profile.stats.ratio.shaman.cheese,
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
