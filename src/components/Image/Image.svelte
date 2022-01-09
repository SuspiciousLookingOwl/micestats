<script lang="ts">
	import { Modal } from "@components/Modal";
	import classNames from "classnames";
	import { fade } from "svelte/transition";

	//#region props
	export let src: string;
	export let alt = "";
	export let skeleton = true;
	export let lazy = true;
	export let expandable = false;
	export let autoReload = false;
	let classes = ""; // TODO separate class props to each elements
	export { classes as class };
	//#endregion

	//#region state
	let isLoading = false;
	let isModalShown = false;
	//#endregion

	//#region event handlers
	const onClick = () => {
		if (expandable) isModalShown = true;
	};

	const onError = (err: Event & { currentTarget: EventTarget & HTMLElement }) => {
		if (autoReload) {
			// TODO reload image without resetting cache
			const img = err.target as HTMLImageElement;
			setTimeout(() => {
				img.src = img.src + "?r=" + Date.now();
			}, 1000);
		}
	};
	//#endregion

	//#region classes
	$: containerClass = classNames("relative", classes, { "cursor-pointer": expandable });
	$: imgClass = classNames("transition-opacity", classes, {
		"opacity-0": isLoading,
		"opacity-100": !isLoading,
	});
	$: skeletonClass = classNames(
		"bg-white bg-opacity-5 animate-pulse z-10 absolute top-0",
		classes
	);
	$: modalImgClass = classNames("transition-opacity w-screen max-w-lg", {
		"opacity-0": isLoading,
		"opacity-100": !isLoading,
	});
	//#endregion
</script>

<div>
	<div on:click={onClick} class={containerClass}>
		<img
			{src}
			{alt}
			on:loadstart={() => (isLoading = true)}
			on:load={() => (isLoading = false)}
			on:error={onError}
			loading={lazy ? "lazy" : "auto"}
			class={imgClass}
		/>

		{#if isLoading && skeleton}
			<div transition:fade={{ duration: 100 }} class={skeletonClass} />
		{/if}
	</div>
</div>

{#if expandable}
	<Modal bind:isShown={isModalShown}>
		<img {src} {alt} class={modalImgClass} />
	</Modal>
{/if}
