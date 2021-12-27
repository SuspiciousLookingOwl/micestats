<script lang="ts">
	import { Modal } from "@components/Modal";
	import { fade } from "svelte/transition";

	export let src: string;
	export let alt = "";
	export let skeleton = true;
	export let lazy = true;
	export let expandable = false;

	let classes = "";
	export { classes as class };

	let isLoading = false;
	let showModal = false;

	const onClick = () => {
		if (expandable) showModal = true;
	};
</script>

<div>
	<div on:click={onClick} class:cursor-pointer={expandable} class="relative {classes}">
		<img
			on:loadstart={() => (isLoading = true)}
			on:load={() => (isLoading = false)}
			{src}
			{alt}
			class="{isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity {classes}"
			loading={lazy ? "lazy" : "auto"}
		/>

		{#if isLoading && skeleton}
			<div
				transition:fade={{ duration: 100 }}
				class="bg-white bg-opacity-5 animate-pulse z-10 absolute top-0 {classes}"
			/>
		{/if}
	</div>
</div>

{#if expandable}
	<Modal bind:show={showModal}>
		<img
			{src}
			{alt}
			class="{isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity w-screen max-w-lg"
		/>
	</Modal>
{/if}
