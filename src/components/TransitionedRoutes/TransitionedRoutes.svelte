<script lang="ts">
	import { browser } from "$app/env";
	import { onMount } from "svelte";
	import { fly } from "svelte/transition";

	const transitionConfig = {
		duration: 150,
		x: 128,
	};

	//#region props
	export let level: number = 1;
	export let deep = false;
	export let path = "";
	//#endregion

	//#region state
	let key: string;
	let transitioning = false;
	//#endregion

	//#region reactive
	$: watchedPath = path
		.split("/")
		.slice(level, !deep ? level + 1 : undefined)
		.join("/");
	$: if (watchedPath !== key) key = watchedPath;
	$: if (browser) {
		// disable scrollbar when transitioning
		const body = document.body;
		body.style.overflow = transitioning ? "hidden" : "auto";
	}
	//#endregion

	//#region event handlers
	onMount(() => (key = watchedPath));
	//#endregion
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
