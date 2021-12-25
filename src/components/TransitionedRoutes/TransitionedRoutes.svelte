<script lang="ts">
	import { browser } from "$app/env";
	import { onMount } from "svelte";
	import { fly } from "svelte/transition";

	export let level: number = 1;
	export let deep = false;
	export let path = "";
	let key: string;
	let transitioning = false;

	const transitionConfig = {
		duration: 150,
		x: 128,
	};

	$: watchedPath = path
		.split("/")
		.slice(level, !deep ? level + 1 : undefined)
		.join("/");

	$: {
		if (watchedPath !== key) key = watchedPath;
	}

	onMount(() => {
		key = watchedPath;
	});

	// disable scrollbar when transitioning
	$: if (browser) {
		const body = document.body;
		body.style.overflow = transitioning ? "hidden" : "auto";
	}
</script>

{#key key}
	<div
		in:fly={{ delay: transitionConfig.duration * 2, ...transitionConfig }}
		out:fly={transitionConfig}
		on:introstart={() => (transitioning = true)}
		on:introend={() => (transitioning = false)}
	>
		<slot />
	</div>
{/key}
