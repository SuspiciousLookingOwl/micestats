<script lang="ts" context="module">
	export interface Route {
		name: string;
		path: string;
		alias?: string[];
		exact?: boolean;
	}
</script>

<script lang="ts">
	import { page } from "$app/stores";
	import { sizeObserver } from "@actions";
	import type { TextVariant } from "@components/Text/Text.svelte";
	import classNames from "classnames";
	import NavigationBarItem from "./NavigationBarItem.svelte";

	//#region props
	export let routes: Route[] = [];
	export let bordered = false;
	export let textVariant: TextVariant = "subtitle1";
	export let itemClass = "";
	//#endregion

	//#region state
	let routesElement: HTMLAnchorElement[] = [];
	let underlineStyle = "";
	//#endregion

	// compute underline border style
	$: activeRouteIndex = routes.findIndex((r) => isActivePath($page.path, r));
	$: activeRouteElement = routesElement[activeRouteIndex];
	$: activeRouteElement && resize();
	const resize = () => {
		if (activeRouteElement) {
			const { offsetWidth, offsetLeft } = activeRouteElement;

			underlineStyle = `
				width: ${offsetWidth}px; 
				left: ${offsetLeft}px;`;
		} else {
			underlineStyle = "";
		}
	};

	const isActivePath = (currentPath: string, route: Route) => {
		return (
			route.path === currentPath ||
			(!route.exact && currentPath.startsWith(route.path)) ||
			!!route.alias?.includes(currentPath)
		);
	};
</script>

<div class="navbar">
	<div
		class={classNames("relative mx-auto lg:mx-0  text-center", {
			"border-b border-opacity-25": bordered,
		})}
	>
		<div use:sizeObserver on:sizechange={resize} class="flex flex-col lg:flex-row align-middle">
			{#each routes as route, i}
				<NavigationBarItem
					{route}
					{textVariant}
					bind:el={routesElement[i]}
					isActive={isActivePath($page.path, route)}
					class={itemClass}
				/>
			{/each}
		</div>

		<!-- underline -->
		<div
			class="hidden lg:block absolute border-b border-white box-border transition-all -z-10 !m-0"
			style={underlineStyle}
		/>
	</div>
</div>

<style lang="postcss">
	.navbar {
		@apply flex flex-row;
		z-index: 1000;
	}
</style>
