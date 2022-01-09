<script lang="ts">
	import { Text } from "@components";
	import classNames from "classnames";
	import type { Route } from "./NavigationBar.svelte";

	//#region props
	export let route: Route;
	export let isActive: boolean;
	export let el: HTMLAnchorElement;
	let classes = "";
	export { classes as class };
	//#endregion

	//#region classes
	$: anchorClass = classNames(
		"cursor-pointer hover:text-shadow hover:transition-all py-2 uppercase",
		classes
	);
	//#endregion
</script>

<a bind:this={el} href={route.path} class={anchorClass}>
	<Text
		variant="subtitle1"
		class={classNames({ "font-medium text-white text-shadow": isActive })}
	>
		{route.name}
	</Text>
</a>
