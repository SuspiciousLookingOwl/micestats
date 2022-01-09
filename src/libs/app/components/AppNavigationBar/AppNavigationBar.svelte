<script lang="ts">
	import { NavigationBar, Text } from "@components";
	import { _ } from "svelte-i18n";

	const routes = [
		{
			name: $_("nav.home"),
			path: "/",
			exact: true,
		},
		{
			name: $_("nav.leaderboards"),
			path: "/leaderboards",
		},
		{
			name: $_("nav.search"),
			path: "/search",
		},
		{
			name: $_("nav.about"),
			path: "/about",
		},
	];
</script>

<div class="hidden lg:block">
	<div class="flex flex-row">
		<NavigationBar {routes} bordered />
		<div class="flex flex-grow justify-end">
			<a href="/">
				<Text variant="title2" class="text-shadow-md font-brand text-center px-4">
					Cheeseformice
				</Text>
			</a>
		</div>
	</div>
</div>
