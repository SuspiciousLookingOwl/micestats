<script lang="ts">
	import { Icon, Text } from "@components";

	// TODO typing
	export let value: any;
</script>

{#if value > 0}
	<div class="flex items-center space-x-1 text-green-400">
		<Icon name="triangleTop" size="sm" class="fill-current mt-1" />
		<Text class=" font-semibold">{value}</Text>
	</div>
{/if}
