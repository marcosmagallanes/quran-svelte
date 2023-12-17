<script>
	import { Skeleton } from '$lib/components/ui/skeleton';

	let VerseList = import('./VerseList.svelte').then((module) => module.default);

	/** @type {import('./$types').PageData} */
	export let data;
	const { id, name, transliteration, translation, type, total_verses, verses } = data;

	// console.log(verses);
	// console.log(`[...slug]/+page.svelte: `, data);
</script>

<main class="p-7 grid gap-9">
	<div class="text-center">
		<h1 class="text-3xl font-['Uthman']">{name}</h1>
		<h2 class="text-xs">{transliteration} - {translation}</h2>
	</div>
	{#await VerseList}
		<Skeleton class="h-12 w-full rounded-full" />
		<Skeleton class="h-16 w-full rounded-full" />
		<Skeleton class="h-12 w-full rounded-full" />
	{:then component}
		<svelte:component this={component} {data} />
	{:catch error}
		<p class="text-red-500">{error.message}</p>
	{/await}
</main>

<style>
	@font-face {
		font-family: 'Uthman';
		src: url('$lib/assets/fonts/UthmanTN_v2-0.ttf');
		font-display: swap;
	}
</style>
