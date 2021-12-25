<script lang="ts">
	import { Icon, Text, type Icons } from "@components";

	export let icon: Icons | null = null;
	export let large = false;
	export let text = "";
	export let href = "";
	export let redirect = true;

	$: classes = large ? "py-2 font-bold" : "";
</script>

<a
	{href}
	target={!redirect ? "_blank" : ""}
	class="flex items-center space-x-4 rounded px-2 {classes}"
>
	{#if icon}
		<Icon name={icon} size={!large ? "lg" : "xl"} class="fill-current" />
	{/if}

	<Text variant={large ? "title4" : "body1"}>{text}</Text>
</a>
