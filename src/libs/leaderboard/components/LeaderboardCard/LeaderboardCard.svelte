<script lang="ts">
	import { Card, Image, Text } from "@components";

	export let title = "";
	export let image = "";
	export let href = "";
</script>

<a {href}>
	<Card class="max-w-lg text-center relative cursor-pointer" hoverable>
		<Image src={image} class="w-full" />
		<div
			class="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-40 hover:bg-opacity-10 transition"
		>
			<Text variant="title3" class="font-brand text-shadow">{title}</Text>
		</div>
	</Card>
</a>
