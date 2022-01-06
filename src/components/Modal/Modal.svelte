<script lang="ts">
	import { Icon } from "@components";
	import classNames from "classnames";
	import { fade } from "svelte/transition";

	//#region props
	export let isShown = false;
	let classes = "";
	export { classes as class };
	//#endregion

	//#region state
	let container: HTMLDivElement;
	//#endregion

	//#region event handlers
	const onClick = (e: MouseEvent) => {
		if (e.target === container) isShown = false;
	};
	//#endregion
</script>

{#if isShown}
	<div
		on:click={onClick}
		bind:this={container}
		transition:fade={{ duration: 100 }}
		class="modal-background"
	>
		<div class={classNames("modal-container", classes)}>
			<div class="float-right p-4">
				<button on:click={() => (isShown = false)}>
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
	.modal-background {
		@apply w-screen h-screen flex bg-black bg-opacity-80 items-center justify-center fixed top-0 left-0 !m-0;
		z-index: 10000;
	}

	.modal-container {
		@apply bg-neutral-900 p-4 rounded-lg;
		max-height: calc(100vh - 2rem);
		max-width: calc(100vw - 2rem);
	}
</style>
