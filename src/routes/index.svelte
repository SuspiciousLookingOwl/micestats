<script lang="ts">
	import { background } from "@libs/app";
	import { Home } from "@libs/home";
	import { onMount } from "svelte";

	onMount(() => {
		background.setScale();
	});
</script>

<Home />
