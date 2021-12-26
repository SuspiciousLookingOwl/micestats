<script lang="ts">
	import { Icon } from "@components";
</script>

<div class="h-14" />

<div class="bottom-nav">
	<a class="item" href="/">
		<Icon name="home" size="lg" class="fill-current mx-auto" />
	</a>
	<a class="item" href="/leaderboard">
		<Icon name="leaderboard" size="xl" class="fill-current mx-auto" />
	</a>
	<a class="item" href="/search">
		<Icon name="search" size="lg" class="fill-current mx-auto" />
	</a>
	<div class="item" on:click={() => alert("Coming Soon")}>
		<Icon name="menu" size="lg" class="fill-current mx-auto" />
	</div>
</div>

<style lang="postcss">
	.bottom-nav {
		@apply grid grid-cols-4;
		@apply fixed w-screen bottom-0 h-14;
		@apply bg-gray-900 lg:hidden;
		z-index: 1000;
	}

	.item {
		@apply flex w-full h-full items-center justify-center;
	}
</style>
