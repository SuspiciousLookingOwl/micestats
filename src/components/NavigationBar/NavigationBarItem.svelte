<script lang="ts">
	import { goto } from "$app/navigation";
	import { page } from "$app/stores";
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

	//#region event handlers
	let onClick = (e: MouseEvent) => {
		const routes = [route.path, ...(route.alias || [])];
		e.preventDefault();
		if (routes.includes($page.path)) return;
		goto(route.path);
	};
	//#endregion

	//#region classes
	$: anchorClass = classNames(
		"cursor-pointer hover:text-shadow hover:transition-all py-2 px-4 uppercase",
		classes
	);
	//#endregion
</script>

<a bind:this={el} href={route.path} on:click={onClick} class={anchorClass}>
	<Text
		variant="subtitle1"
		class={classNames({ "font-medium text-white text-shadow": isActive })}
	>
		{route.name}
	</Text>
</a>
