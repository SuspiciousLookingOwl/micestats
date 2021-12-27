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
</script>

{#if profile}
	<div class="space-y-4 md:font-semibold">
		<div class="lg:flex flex-row ">
			<SideProfileOverview {profile} />

			<div class="mx-1 my-2" />

			<div class="space-y-2 flex-grow">
				<Card class="p-2 md:p-6">
					<ShamanTable {profile} />
				</Card>
				<Card class="p-2 md:p-6">
					<MouseTable {profile} />
				</Card>
				<Card class="p-2 md:p-6">
					<RacingTable {profile} />
				</Card>
				<Card class="p-2 md:p-6">
					<SurvivorTable {profile} />
				</Card>
				<Card class="p-2 md:p-6">
					<DefilanteTable {profile} />
				</Card>
			</div>
		</div>
	</div>
{/if}
