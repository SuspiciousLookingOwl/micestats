<script lang="ts">
	import { background } from "@libs/app/stores/background";

	const { transformStyle, classes, image } = background;

	$: style = Object.values({
		backgroundImage: `background-image: url(${$image})`,
		transform: `transform: ${$transformStyle}`,
	}).join(";");
</script>

<!-- This is to prevent white vignette when bg image isn't loaded yet -->
<div class="fixed" />

<div class="background {$classes}" {style} />

<style lang="postcss">
	.fixed {
		@apply h-screen w-screen bg-neutral-900;
		position: fixed;
		z-index: -10001;
	}

	.background {
		@apply fixed bg-cover h-screen w-screen;
		@apply transition-all duration-200 transform-gpu;
		z-index: -10000;
	}
</style>
