<script lang="ts" context="module">
	export type SpinnerSize = "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
</script>

<script lang="ts">
	export let size: SpinnerSize = "md";

	let baseClass = "absolute rounded-full";
	let classes = "";
	$: {
		classes = "h-8 w-8 border-4"; //md
		if (size === "xs") classes = "h-4 w-4 border-2";
		else if (size === "sm") classes = "h-6 w-6 border-4";
		else if (size === "lg") classes = "h-12 w-12 border-4";
		else if (size === "xl") classes = "h-16 w-16 border-4";
		else if (size === "2xl") classes = "h-24 w-24 border-8";
	}
</script>

<div class="relative !border-0 {classes}">
	<div class="{baseClass} border-white border-opacity-10 {classes}" />
	<div class="{baseClass} animate-spin border-transparent border-t-primary-400 {classes}" />
</div>
