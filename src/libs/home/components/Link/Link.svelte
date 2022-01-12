<script lang="ts">
	import { browser } from "$app/env";
	import { Card, Icon, Text, type Icons } from "@components";
	import classNames from "classnames";

	//#region props
	export let icon: Icons | null = null;
	export let text: string;
	export let href: string;
	export let fallback: string | undefined = "";
	export let large = false;
	export let redirect = true;
	//#endregion

	//#region event handlers
	const onClick = () => {
		if (!fallback || !browser) return;
		let timeout: NodeJS.Timeout;
		window.onblur = () => clearTimeout(timeout);
		timeout = setTimeout(() => {
			if (redirect) window.open(fallback);
			else document.location.href = fallback || "";
		});
	};
	//#endregion

	//#region classes
	$: anchorClass = classNames("flex items-center space-x-4 rounded px-4", {
		"py-4 font-bold": large,
		"p-2": !large,
	});
	//#endregion
</script>

<Card hoverable class="p-0">
	<a
		{href}
		on:click={onClick}
		target={!redirect ? "_blank" : ""}
		rel={!redirect ? "noopener" : ""}
		class={anchorClass}
	>
		{#if icon}
			<Icon name={icon} size={!large ? "lg" : "xl"} class="fill-current" />
		{/if}

		<Text variant={large ? "title3" : "body1"}>{text}</Text>
	</a>
</Card>
