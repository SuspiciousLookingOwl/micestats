<script lang="ts">
	import { background, SearchInput } from "@libs/app";
	import { onMount } from "svelte";

	let isFocused = false;

	background.setXOffset(0.3);
	background.setScale();

	onMount(() => {
		setTimeout(() => (isFocused = true), 500);
	});
</script>

<div class="w-full">
	<SearchInput {isFocused} />
</div>
