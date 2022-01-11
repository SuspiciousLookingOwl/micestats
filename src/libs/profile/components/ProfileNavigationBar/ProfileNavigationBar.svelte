<script lang="ts">
	import { Card, NavigationBar } from "@components";
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
</script>

<Card class="mt-2 p-0 rounded">
	<NavigationBar {routes} textVariant="body1" itemClass="px-4" />
</Card>
