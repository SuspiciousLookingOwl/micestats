<script lang="ts">
	import { Icon } from "@components";
</script>

<div class="h-14" />

<div class="grid grid-cols-4 fixed w-screen bottom-0 h-14 bg-gray-900 lg:hidden">
	<a class="item" href="/">
		<Icon name="home" size="lg" class="fill-current mx-auto" />
	</a>
	<a class="item" href="leaderboard">
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
	.item {
		@apply flex w-full h-full items-center justify-center;
	}
</style>
