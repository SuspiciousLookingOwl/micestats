<script lang="ts">
	import { _ } from "svelte-i18n";
</script>

<div class="h-screen w-screen fixed flex flex-col justify-center">
	<div class="max-w-5xl space-y-8">
		<div class="font-brand text-6xl">{$_("error.title")}</div>
		<div class="text-2xl">
			<a class="underline underline-offset-8" href="/">{$_("error.subtitle")}</a>
		</div>
	</div>
</div>
