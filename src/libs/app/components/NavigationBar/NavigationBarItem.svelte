<script lang="ts">
	import { Text } from "@components";
	import classNames from "classnames";
	import type { Route } from "./NavigationBar.svelte";

	//#region props
	export let route: Route;
	export let isActive: boolean;
	export let el: HTMLAnchorElement;
	//#endregion
</script>

<a
	bind:this={el}
	href={route.path}
	class="cursor-pointer hover:text-shadow hover:transition-all px-4 py-2 uppercase"
>
	<Text
		variant="subtitle1"
		class={classNames({ "font-medium text-white text-shadow": isActive })}
	>
		{route.name}
	</Text>
</a>
