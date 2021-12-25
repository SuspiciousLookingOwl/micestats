<script lang="ts">
	import { Icon, Input, Text } from "@components";
	import { background, useSearch } from "@libs/app";
	import { _ } from "svelte-i18n";
	import SearchResult from "./SearchResult.svelte";

	export let isFocused = false;
	let input: HTMLInputElement;

	const { keyword, isSearching, searchResult, ...search } = useSearch();

	const setFocus = (value: boolean) => {
		isFocused = value;
		isFocused ? input.focus() : input.blur();
		background.setBlur(isFocused ? 4 : undefined);
		background.setBrightness(isFocused ? 2 : undefined);
	};

	const onBodyKeyDown = (e: KeyboardEvent) => {
		if (e.ctrlKey && e.key === "k") {
			e.preventDefault();
			setFocus(true);
		} else if (e.key === "Escape") {
			e.preventDefault();
			setFocus(false);
		}
	};

	$: input && setFocus(isFocused);
</script>

<svelte:body on:keydown={onBodyKeyDown} />

<div class="flex w-full bg-opacity-10 bg-white rounded relative z-20">
	<Input
		type="text"
		variant="lg"
		bind:input
		bind:value={$keyword}
		on:focus={() => setFocus(true)}
		on:blur={() => setFocus(false)}
		placeholder={$_("home.searchPlaceholder")}
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

	{#if keyword && isFocused}
		<div class="w-full absolute top-16 2xl:mt-2 z-30">
			<SearchResult players={$searchResult} isFetching={$isSearching} />
		</div>
	{/if}
</div>

{#if isFocused}
	<div class="fixed top-0 left-0 w-screen h-screen z-10" />
{/if}
