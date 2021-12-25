<script lang="ts" context="module">
	export type Variant =
		| "title1"
		| "title2"
		| "title3"
		| "title4"
		| "subtitle1"
		| "subtitle2"
		| "body1"
		| "body2"
		| "caption";
</script>

<script lang="ts">
	export let variant: Variant = "body1";
	export let _: Variant = variant; // shortcut

	let classes = "";
	export { classes as class };
</script>

<span class="text-{_ ?? variant} {classes}">
	<slot />
</span>

<style lang="postcss">
	.text-title1 {
		@apply text-3xl xl:text-4xl 2xl:text-6xl;
	}

	.text-title2 {
		@apply text-2xl xl:text-3xl 2xl:text-4xl;
	}

	.text-title3 {
		@apply text-2xl xl:text-3xl;
	}

	.text-title4 {
		@apply text-xl xl:text-2xl;
	}

	.text-subtitle1 {
		@apply text-lg xl:text-xl;
	}

	.text-subtitle2 {
		@apply text-lg;
	}

	.text-body1 {
		@apply text-base;
	}

	.text-body2 {
		@apply text-sm;
	}

	.text-caption {
		@apply text-xs font-mono;
	}
</style>
