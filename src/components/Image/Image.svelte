<script lang="ts">
	import { Modal } from "@components/Modal";
	import { onMount } from "svelte";
	import { fade } from "svelte/transition";

	export let src: string;
	export let alt = "";
	export let skeleton = true;
	export let lazy = true;
	export let clickable = false;

	let classes = "";
	export { classes as class };

	let isLoading = false;
	let image: HTMLImageElement;
	let showModal = false;

	onMount(() => {
		image.onload = () => (isLoading = false);
		image.onloadstart = () => (isLoading = true);
	});

	const onClick = () => {
		if (clickable) showModal = true;
	};
</script>

<div>
	<div class="relative">
		<div on:click={onClick} class:cursor-pointer={clickable} class={classes}>
			<img
				bind:this={image}
				{src}
				{alt}
				class="{isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity {classes}"
				loading={lazy ? "lazy" : "auto"}
			/>

			{#if isLoading && skeleton}
				<div
					out:fade={{ duration: 100 }}
					class="bg-white bg-opacity-5 animate-pulse absolute top-0 left-0 {classes}"
				/>
			{/if}
		</div>
	</div>
</div>

<Modal bind:show={showModal}>
	<img
		{src}
		{alt}
		class="{isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity w-screen max-w-lg"
	/>
</Modal>
