<script>
	import { Input } from "@components";
	import { _ } from "svelte-i18n";

	export let value = "";
</script>

<Input
	bind:value
	placeholder={$_("compare.searchProfilePlaceholder")}
	extraContainerClass="bg-neutral-700 bg-opacity-95"
/>
