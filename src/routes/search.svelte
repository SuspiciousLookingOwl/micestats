<script lang="ts">
	import { SearchInput } from "@libs/app";
	import { onMount } from "svelte";

	let isFocused = false;
	onMount(() => {
		setTimeout(() => (isFocused = true), 500);
	});
</script>

<div class="w-full mt-8">
	<SearchInput {isFocused} />
</div>
