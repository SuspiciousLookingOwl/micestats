<script lang="ts">
	import { Spinner, type IconSize } from "@components";

	type T = $$Generic;

	export let promise: Promise<T>;
	export let size: IconSize = "md";
</script>

{#await promise}
	<Spinner {size} />
{:then value}
	<slot {value} />
{/await}
