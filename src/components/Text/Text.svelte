<script lang="ts" context="module">
	export type TextVariant =
		| "title1"
		| "title2"
		| "title3"
		| "subtitle1"
		| "subtitle2"
		| "body1"
		| "body2"
		| "caption";
</script>

<script lang="ts">
	//#region props
	export let variant: TextVariant = "body1";
	export let _: TextVariant = variant; // shortcut

	let classes = "";
	export { classes as class };
	//#endregion
</script>

<span class="break-all text-{_ ?? variant} {classes}">
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
