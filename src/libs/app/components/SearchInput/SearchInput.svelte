<script lang="ts">
	import { clickOutside } from "@actions";
	import { Icon, Input, Text } from "@components";
	import { background, SearchResult, useSearch } from "@libs/app";
	import { _ } from "svelte-i18n";

	//#region props
	export let isFocused = false;
	//#endregion

	//#region state
	const { keyword, isSearching, searchResult, ...search } = useSearch();
	//#endregion

	//#region reactive
	let input: HTMLInputElement;
	$: input && setFocus(isFocused);
	//#endregion

	//#region event handlers
	const onBodyKeyDown = (e: KeyboardEvent) => {
		if (e.ctrlKey && e.key === "k") {
			e.preventDefault();
			setFocus(true);
		} else if (e.key === "Escape") {
			e.preventDefault();
			setFocus(false);
		}
	};

	const onBodyClick = (e: MouseEvent) => {};
	//#endregion

	const setFocus = (value: boolean) => {
		isFocused = value;
		isFocused ? input.focus() : input.blur();
		background.setBlur(isFocused ? 4 : undefined);
		background.setBrightness(isFocused ? 2 : undefined);
	};
</script>

<svelte:body on:keydown={onBodyKeyDown} on:click={onBodyClick} />

<div
	class="flex w-full bg-opacity-10 bg-white rounded relative z-20"
	use:clickOutside
	on:outclick={() => setFocus(false)}
>
	<Input
		type="text"
		variant="lg"
		placeholder={$_("home.searchPlaceholder")}
		bind:input
		bind:value={$keyword}
		on:focus={() => setFocus(true)}
		containerClass="bg-neutral-700 bg-opacity-95"
	>
		<div
			slot="suffix"
			class="cursor-pointer px-5 min-w-max flex space-x-4 items-center"
			on:click={() => setFocus(true)}
		>
			<Text variant="body2" class="hidden lg:block">Ctrl + K</Text>
			<Icon name="search" size="lg" class="fill-current" on:click={search.fetch} />
		</div>
	</Input>

	{#if isFocused}
		<div class="w-full absolute top-16 2xl:mt-2 z-30">
			<SearchResult players={$searchResult} isFetching={$isSearching} keyword={$keyword} />
		</div>
	{/if}
</div>

{#if isFocused}
	<div class="fixed top-0 left-0 w-screen h-screen z-10" />
{/if}
