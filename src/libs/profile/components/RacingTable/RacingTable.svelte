<script lang="ts">
	import { DefaultCell, Table, type Row } from "@components";
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

	let tableData: Row[];
	$: tableData = [
		[
			{
				key: "mode",
				value: "Rounds Played",
				icon: "https://www.transformice.com/images/x_transformice/x_badges/x_124.png",
			},
			{
				key: "score",
				value: profile.stats.racing.rounds,
				format: thousandSeparator,
			},
			{
				key: "up",
				value: profile.period.racing.rounds,
				format: thousandSeparator,
			},
		],
		[
			{
				key: "mode",
				value: "Completed Rounds",
				icon: "https://www.transformice.com/images/x_transformice/x_badges/x_125.png",
			},
			{
				key: "score",
				value: profile.stats.racing.finished,
				format: thousandSeparator,
			},
			{
				key: "up",
				value: profile.period.racing.finished,
				format: thousandSeparator,
			},
		],
		[
			{
				key: "mode",
				value: "Number of Podiums",
				icon: "https://www.transformice.com/images/x_transformice/x_badges/x_127.png",
			},
			{
				key: "score",
				value: profile.stats.racing.podium,
				format: thousandSeparator,
			},
			{
				key: "up",
				value: profile.period.racing.podium,
				format: thousandSeparator,
			},
		],
		[
			{
				key: "mode",
				value: "Number of Firsts",
				icon: "https://www.transformice.com/images/x_transformice/x_badges/x_126.png",
			},
			{
				key: "score",
				value: profile.stats.racing.first,
				format: thousandSeparator,
			},
			{
				key: "up",
				value: profile.period.racing.first,
				format: thousandSeparator,
			},
		],
	];
</script>

<Table headers={tableHeaders} data={tableData} title="Racing">
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
