<script lang="ts">
	import Card from "@components/Card/Card.svelte";
	import type { PlayerEntity } from "@entities";
	import { DefilanteTable, MouseTable, RacingTable, ShamanTable, SurvivorTable } from "./Tables";

	const tables = [ShamanTable, MouseTable, RacingTable, SurvivorTable, DefilanteTable];

	export let profile: PlayerEntity;
</script>

<div class="space-y-4">
	{#each tables as table}
		<Card class="p-2 md:p-6">
			<svelte:component this={table} {profile} />
		</Card>
	{/each}
</div>
