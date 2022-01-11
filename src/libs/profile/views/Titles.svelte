<script lang="ts">
	import { AsyncLoader } from "@components";
	import Card from "@components/Card/Card.svelte";
	import type { PlayerEntity } from "@entities";

	export let profile: PlayerEntity;
</script>

<Card class="p-2 md:p-6">
	<AsyncLoader promise={profile.getTitles()} let:value variant="dots">
		<div class="space-y-2">
			{#each value as { id, title }}
				<div>
					<a href="https://transformice.fandom.com/wiki/Title#{id}" target="_blank">
						{title}
					</a>
				</div>
			{/each}
		</div>
	</AsyncLoader>
</Card>
