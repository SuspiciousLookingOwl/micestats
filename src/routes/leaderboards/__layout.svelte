<script context="module" lang="ts">
	import { TransitionedRoutes } from "@components";
	import type { Load } from "@sveltejs/kit";

	export const load: Load = async ({ page }) => {
		return { props: { path: page.path } };
	};
</script>

<script lang="ts">
	export let path: string;
</script>

<TransitionedRoutes level={2} deep {path}>
	<slot />
</TransitionedRoutes>
