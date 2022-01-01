<script lang="ts">
	import { Card, Image, Text } from "@components";
	import type { PlayerEntity } from "@entities";
	import { _ } from "svelte-i18n";

	export let profile: PlayerEntity;
</script>

<Card>
	<div class="p-4">
		<div class="flex items-center font-brand space-x-4">
			<Image src={profile.headUrl} class="w-24 h-32 -rotate-2 scale-110" lazy={false} />
			<div class="flex flex-col space-y-4">
				<Text variant="title2" class="font-brand text-shadow">
					{profile.name}
				</Text>
				<Text variant="subtitle1" class="font-brand">
					{$_("profile.stats.level", { values: { level: profile.level } })}
				</Text>
			</div>
		</div>
		<!-- <a href="/p/{$profileValue.name.replace('#', '-')}/profile">Navigate</a>
		<a href="/p/{$profileValue.name.replace('#', '-')}/stats">Navigate</a> -->
	</div>
</Card>
