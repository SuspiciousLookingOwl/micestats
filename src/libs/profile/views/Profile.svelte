<script lang="ts">
	import { Card } from "@components";
	import type { PlayerEntity } from "@entities";
	import {
		DefilanteTable,
		MouseTable,
		RacingTable,
		ShamanTable,
		SideProfileOverview,
		SurvivorTable,
	} from "../components";

	export let profile: PlayerEntity | null = null;

	const tables = [ShamanTable, MouseTable, RacingTable, SurvivorTable, DefilanteTable];
</script>

{#if profile}
	<div class="space-y-4">
		<div class="lg:flex flex-row">
			<SideProfileOverview {profile} />

			<div class="mx-1 my-2" />

			<div class="space-y-2 flex-grow">
				{#each tables as table}
					<Card class="p-2 md:p-6">
						<svelte:component this={table} {profile} />
					</Card>
				{/each}
			</div>
		</div>
	</div>
{/if}
