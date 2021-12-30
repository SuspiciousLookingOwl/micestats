<script lang="ts">
	import { _ } from "svelte-i18n";
</script>

<div class="flex flex-col justify-center my-32">
	<div class="space-y-8">
		<div class="font-brand text-6xl">{$_("error.title")}</div>
		<div class="text-2xl">
			<a class="underline underline-offset-8" href="/">{$_("error.subtitle")}</a>
		</div>
	</div>
</div>
