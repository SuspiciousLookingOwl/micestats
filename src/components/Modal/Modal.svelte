<script lang="ts">
	import { Icon } from "@components";
	import { fade } from "svelte/transition";

	export let show = false;
	let container: HTMLDivElement;

	let classes = "";
	export { classes as class };

	const onClick = (e: MouseEvent) => {
		if (e.target === container) show = false;
	};
</script>

{#if show}
	<div
		bind:this={container}
		transition:fade={{ duration: 100 }}
		class="modal-container"
		on:click={onClick}
	>
		<div class="modal-content {classes}">
			<div class="float-right p-4">
				<button on:click={() => (show = false)}>
					<Icon name="close" size="lg" class="fill-gray-400 hover:fill-gray-300" />
				</button>
			</div>
			<div>
				<slot />
			</div>
		</div>
	</div>
{/if}

<style lang="postcss">
	.modal-container {
		@apply w-screen h-screen flex bg-black bg-opacity-80 items-center justify-center fixed top-0 left-0;
		z-index: 10000;
	}

	.modal-content {
		@apply bg-neutral-900 p-4 rounded-lg;
		max-height: calc(100vh - 2rem);
		max-width: calc(100vw - 2rem);
	}
</style>
