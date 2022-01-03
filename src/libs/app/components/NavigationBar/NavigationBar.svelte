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
	import { Text } from "@components";

	export let routes: Route[] = [];
	let routesElement: HTMLAnchorElement[] = [];
	let underlineStyle = "";

	const isActivePath = (currentPath: string, route: Route) => {
		return (
			route.path === currentPath ||
			(!route.exact && currentPath.startsWith(route.path)) ||
			route.alias?.includes(currentPath)
		);
	};

	// compute underline border style
	$: {
		const activeRouteIndex = routes.findIndex((r) => isActivePath($page.path, r));
		const activeRouteElement = routesElement[activeRouteIndex];

		if (activeRouteElement) {
			const style = getComputedStyle(activeRouteElement);
			const elementPaddingX = parseFloat(style.paddingLeft) + parseFloat(style.paddingRight);

			const width = activeRouteElement.offsetWidth - elementPaddingX;
			const height = activeRouteElement.offsetHeight;
			const left = activeRouteElement.offsetLeft;

			underlineStyle = `width: ${width}px; left: ${left}px; height: ${height + 1}px;`;
		} else {
			underlineStyle = "";
		}
	}
</script>

<div class="navbar">
	{#each routes as route, i}
		<a
			bind:this={routesElement[i]}
			href={route.path}
			class="cursor-pointer hover:text-shadow hover:transition-all px-4 py-2"
		>
			<Text
				variant="subtitle1"
				class={isActivePath($page.path, route) ? "font-medium text-white text-shadow" : ""}
			>
				{route.name}
			</Text>
		</a>
	{/each}

	{#if $$slots.right}
		<div class="flex-grow text-right px-4">
			<slot name="right" />
		</div>
	{/if}

	<div
		class="absolute border-b-2 border-white box-border transition-all -z-10"
		style={underlineStyle}
	/>
</div>

<style lang="postcss">
	.navbar {
		@apply flex flex-row;
		@apply space-x-4;
		@apply border-b border-opacity-25;
		@apply relative;
		z-index: 1000;
	}
</style>
