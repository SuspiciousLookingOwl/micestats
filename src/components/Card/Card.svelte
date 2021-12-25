<script lang="ts">
	export let hoverable = false;
	let classes = "";
	export { classes as class };

	$: hoverClasses = hoverable ? "hover:bg-black hover:bg-opacity-50" : "";
</script>

<div class="bg-black bg-opacity-75 rounded-md p-2 transition-colors {hoverClasses} {classes}">
	<slot />
</div>
