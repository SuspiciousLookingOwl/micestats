<script lang="ts">
	import { background, SearchInput } from "@libs/app";
	import { onMount } from "svelte";
	import { _ } from "svelte-i18n";

	let isFocused = false;

	background.setXOffset(0.3);
	background.setScale();

	onMount(() => {
		setTimeout(() => (isFocused = true), 500);
	});
</script>

<svelte:head>
	<title>{$_("nav.search")} | Micestats</title>
</svelte:head>

<div class="w-full">
	<SearchInput {isFocused} />
</div>
