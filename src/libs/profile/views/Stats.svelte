<script lang="ts">
	import { Card } from "@components";
	import type { PlayerEntity } from "@entities";
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
</script>

<Card class="p-2 md:p-6">
	<svelte:component this={tableComponents[type]} {profile} />
</Card>
