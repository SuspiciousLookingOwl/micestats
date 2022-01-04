<script lang="ts">
	import { goto } from "$app/navigation";
	import type { LeaderboardType } from "@api";
	import { Table, type Header } from "@components";
	import {
		BasePlayerEntity,
		type PlayerLeaderboardEntity,
		type TribeLeaderboardEntity,
	} from "@entities";
	import { thousandSeparator } from "@utils";
	import { _ } from "svelte-i18n";
	import type { Writable } from "svelte/store";

	export let page: Writable<number>;
	export let limit: Writable<number>;
	export let isLoading: boolean;
	export let data: (PlayerLeaderboardEntity | TribeLeaderboardEntity)[];
	export let type: LeaderboardType = "overall";

	const tableKeys = {
		stats: ["rounds", "cheese", "first", "savesNormal", "score"],
		rounds: ["rounds", "cheese", "first", "savesNormal", "score"],
		cheese: ["rounds", "cheese", "first", "savesNormal", "score"],
		first: ["rounds", "cheese", "first", "savesNormal", "score"],
		bootcamp: ["bootcamp"],
		shaman: ["rounds", "savesNormal", "savesHard", "savesDivine", "score"],
		racing: ["rounds", "finished", "first", "podium", "score"],
		survivor: ["rounds", "shaman", "survivor", "killed", "score"],
		defilante: ["rounds", "finished", "points", "score"],
		overall: ["score"],
	};

	$: headers = <Header[]>[
		{
			key: "rank",
			label: "Rank",
			value: (_, i) => ($page - 1) * $limit + i + 1,
		},
		{
			key: "name",
			label: "Name",
		},
		...tableKeys[type].map((s) => {
			return {
				key: s,
				label: $_(`leaderboard.${s}`),
				format: thousandSeparator,
			};
		}),
	];

	const navigate = ({ target }: PlayerLeaderboardEntity | TribeLeaderboardEntity) => {
		const path = target instanceof BasePlayerEntity ? "p" : "t";
		goto(`/${path}/${target.slugName}`);
	};
</script>

<Table
	{headers}
	{data}
	{isLoading}
	skeletonCount={$limit}
	tableClass="overflow-x-auto"
	tableBodyClass="bg-black bg-opacity-75 backdrop-blur-3xl divide-y"
	tableRowClass="cursor-pointer"
	on:rowclick={({ detail }) => navigate(detail.row)}
>
	<tr slot="skeleton" class="h-[3.75rem] animate-pulse bg-white bg-opacity-5">
		<td colspan="100" />
	</tr>
</Table>
