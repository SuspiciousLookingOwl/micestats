<script lang="ts">
	import { goto } from "$app/navigation";
	import { page } from "$app/stores";
	import { Card, NavigationBar, Select } from "@components";
	import type { PlayerEntity } from "@entities";
	import { _ } from "svelte-i18n";

	export let profile: PlayerEntity;

	$: routes = [
		{
			name: $_("profile.profile"),
			path: `/p/${profile.slugName}/profile`,
			alias: [`/p/${profile.slugName}`],
		},
		...(profile.shop.outfits.length
			? [
					{
						name: $_("profile.outfits"),
						path: `/p/${profile.slugName}/outfits`,
					},
			  ]
			: []),
		{
			name: $_("profile.titles"),
			path: `/p/${profile.slugName}/titles`,
		},
		{
			name: $_("stats.shaman"),
			path: `/p/${profile.slugName}/shaman`,
		},
		{
			name: $_("stats.mouse"),
			path: `/p/${profile.slugName}/mouse`,
		},
		{
			name: $_("stats.racing"),
			path: `/p/${profile.slugName}/racing`,
		},
		{
			name: $_("stats.survivor"),
			path: `/p/${profile.slugName}/survivor`,
		},
		{
			name: $_("stats.defilante"),
			path: `/p/${profile.slugName}/defilante`,
		},
	];

	$: routesOptions = routes.map((r) => {
		return {
			label: r.name,
			value: r.path,
		};
	});
</script>

<div class="hidden lg:block">
	<Card class="p-0 rounded">
		<NavigationBar {routes} textVariant="body1" itemClass="px-4" />
	</Card>
</div>
<div class="block lg:hidden w-full">
	<Select
		value={routesOptions.find((r) => r.value === $page.path)}
		options={routesOptions}
		on:change={(e) => e.detail && goto(e.detail.value)}
	/>
</div>
