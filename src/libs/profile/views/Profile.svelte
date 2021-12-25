<script lang="ts">
	import { Card } from "@components";
	import type { PlayerEntity } from "@entities";
	import { getContext } from "svelte";
	import type { Writable } from "svelte/store";
	import {
		DefilanteTable,
		MouseTable,
		RacingTable,
		ShamanTable,
		SideProfileOverview,
	} from "../components";

	let profile = getContext<Writable<PlayerEntity>>("profile");
</script>

{#if profile}
	<div class="space-y-4 md:font-semibold">
		<div class="lg:flex flex-row ">
			<SideProfileOverview profile={$profile} />

			<div class="mx-1 my-2" />

			<div class="space-y-2 flex-grow">
				<Card class="p-2 md:p-6">
					<ShamanTable profile={$profile} />
				</Card>
				<Card class="p-2 md:p-6">
					<MouseTable profile={$profile} />
				</Card>
				<Card class="p-2 md:p-6">
					<RacingTable profile={$profile} />
				</Card>
				<Card class="p-2 md:p-6">
					<DefilanteTable profile={$profile} />
				</Card>
			</div>
		</div>
	</div>
{/if}
