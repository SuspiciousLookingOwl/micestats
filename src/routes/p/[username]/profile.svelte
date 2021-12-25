<script lang="ts">
	import type { PlayerEntity } from "@entities";
	import { Profile } from "@libs/profile";
	import { getContext } from "svelte";
	import type { Writable } from "svelte/store";

	const profile = getContext<Writable<PlayerEntity>>("profile");
</script>

<!-- default view -->
<Profile profile={$profile} />
