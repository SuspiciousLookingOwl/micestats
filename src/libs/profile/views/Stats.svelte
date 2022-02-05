<script lang="ts">
	import { Card, Heatmap, Text, type HeatmapColorSchema, type HeatmapData } from "@components";
	import type { PlayerEntity } from "@entities";
	import { onMount } from "svelte";
	import { _ } from "svelte-i18n";
	import {
		DefilanteTable,
		MouseTable,
		RacingTable,
		ShamanTable,
		SurvivorTable,
	} from "../components";

	export let profile: PlayerEntity;
	export let type: "shaman" | "mouse" | "racing" | "survivor" | "defilante";

	const tableComponents = {
		shaman: ShamanTable,
		mouse: MouseTable,
		racing: RacingTable,
		survivor: SurvivorTable,
		defilante: DefilanteTable,
	};

	// generate data
	let heatMaps: Record<string, HeatmapData[]> = {};

	onMount(async () => {
		const changelog = await profile.getChangelogs();
		heatMaps = changelog[type];
	});

	// color schema
	const colors: HeatmapColorSchema = [
		[0, "#FFFFFF23"],
		[1, "#5E124D"],
		[25, "#8D1B73"],
		[50, "#D831B2"],
		[100, "#E576CC"],
		[200, "#EFA9DF"],
		[Infinity, "#EFA9DF"],
	];
</script>

<Card class="p-2 md:p-6 flex flex-col space-y-6 lg:space-y-12">
	<svelte:component this={tableComponents[type]} {profile} />

	{#each Object.entries(heatMaps) as [key, data]}
		<div class="space-y-2">
			<Text div variant="title3" class="font-brand">{$_(`leaderboard.${key}`)}</Text>
			<div class="text-center">
				<Heatmap {data} {colors} width={1024}>
					<Text
						variant="body2"
						slot="tooltip"
						let:data={d}
						class="px-2 py-1 bg-neutral-800 rounded"
					>
						{#if d}
							{d.date.toDateString()} - <b>{d.value}</b>
						{/if}
					</Text>
				</Heatmap>
			</div>
		</div>
	{/each}
</Card>
