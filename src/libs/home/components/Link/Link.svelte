<script lang="ts">
	import { Card, Icon, Text, type Icons } from "@components";

	export let icon: Icons | null = null;
	export let large = false;
	export let text = "";
	export let href = "";
	export let redirect = true;

	$: classes = large ? "py-4 font-bold" : "p-2";
</script>

<Card hoverable class="p-0">
	<a
		{href}
		target={!redirect ? "_blank" : ""}
		class="flex items-center space-x-4 rounded px-4 {classes}"
	>
		{#if icon}
			<Icon name={icon} size={!large ? "lg" : "xl"} class="fill-current" />
		{/if}

		<Text variant={large ? "title4" : "body1"}>{text}</Text>
	</a>
</Card>
