<script lang="ts">
	import { DefaultCell, Table } from "@components";
	import type { PlayerEntity } from "@entities";
	import { thousandSeparator } from "@utils";
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
				icon: "https://www.transformice.com/images/x_transformice/x_inventaire/2259.jpg",
			},
			{
				key: "score",
				value: profile.stats.mouse.rounds,
				format: thousandSeparator,
			},
			{
				key: "up",
				value: profile.period.mouse.rounds,
				format: thousandSeparator,
			},
		],
		[
			{
				key: "mode",
				value: "Gathered Cheese",
				icon: "https://www.transformice.com/images/x_transformice/x_inventaire/800.jpg",
			},
			{
				key: "score",
				value: profile.stats.mouse.cheese,
				format: thousandSeparator,
			},
			{
				key: "up",
				value: profile.period.mouse.cheese,
				format: thousandSeparator,
			},
		],
		[
			{
				key: "mode",
				value: "Cheese Gathered First",
				icon: "https://www.transformice.com/images/x_transformice/x_inventaire/2254.jpg",
			},
			{
				key: "score",
				value: profile.stats.mouse.first,
				format: thousandSeparator,
			},
			{
				key: "up",
				value: profile.period.mouse.first,
				format: thousandSeparator,
			},
		],
		[
			{
				key: "mode",
				value: "Bootcamp",
				icon: "https://www.transformice.com/images/x_transformice/x_inventaire/2261.jpg",
			},
			{
				key: "score",
				value: profile.stats.mouse.bootcamp,
				format: thousandSeparator,
			},
			{
				key: "up",
				value: profile.period.mouse.bootcamp,
				format: thousandSeparator,
			},
		],
	];
</script>

<Table headers={tableHeaders} data={tableData} title="Mouse">
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
