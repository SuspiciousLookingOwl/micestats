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
	import NavigationBarItem from "./NavigationBarItem.svelte";

	//#region props
	export let routes: Route[] = [];
	//#endregion

	//#region state
	let routesElement: HTMLAnchorElement[] = [];
	let underlineStyle = "";
	//#endregion

	// compute underline border style
	$: {
		const activeRouteIndex = routes.findIndex((r) => isActivePath($page.path, r));
		const activeRouteElement = routesElement[activeRouteIndex];

		if (activeRouteElement) {
			const style = getComputedStyle(activeRouteElement);
			const elementPaddingX = parseFloat(style.paddingLeft) + parseFloat(style.paddingRight);

			const width = activeRouteElement.offsetWidth - elementPaddingX;
			const { offsetHeight, offsetLeft } = activeRouteElement;

			underlineStyle = `
				width: ${width}px; 
				left: ${offsetLeft}px; 
				height: ${offsetHeight + 2}px;`;
		} else {
			underlineStyle = "";
		}
	}

	const isActivePath = (currentPath: string, route: Route) => {
		return (
			route.path === currentPath ||
			(!route.exact && currentPath.startsWith(route.path)) ||
			!!route.alias?.includes(currentPath)
		);
	};
</script>

<div class="navbar">
	<div class="border-b border-opacity-25 space-x-8 pb-3">
		{#each routes as route, i}
			<NavigationBarItem
				{route}
				bind:el={routesElement[i]}
				isActive={isActivePath($page.path, route)}
			/>
		{/each}
	</div>

	<!-- underline -->
	<div
		class="absolute border-b border-white box-border transition-all -z-10"
		style={underlineStyle}
	/>
</div>

<style lang="postcss">
	.navbar {
		@apply flex flex-row;
		@apply relative;
		z-index: 1000;
	}
</style>
