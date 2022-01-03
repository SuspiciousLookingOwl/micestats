<script lang="ts">
	import { Image, Text } from "@components";

	export let icon: string = "";
	export let value: string;
</script>

<div class="flex items-center md:space-x-4">
	<Image src={icon} alt={value} class="w-9 h-9 hidden md:block" />
	<Text>{value}</Text>
</div>
