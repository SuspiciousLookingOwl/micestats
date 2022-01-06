<script lang="ts">
	import classNames from "classnames";

	//#region props
	export let hoverable = false;
	let classes = "";
	export { classes as class };
	//#endregion

	//#region classes
	$: cardClass = classNames(
		"bg-black bg-opacity-75 rounded-md p-2",
		{ "hover:bg-black hover:bg-opacity-50 transition-colors": hoverable },
		classes
	);
	//#endregion
</script>

<div class={cardClass}>
	<slot />
</div>
