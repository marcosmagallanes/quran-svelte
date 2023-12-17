<script>
	import transliterateArabic from '$lib/transliterateArabic';

	import * as Card from '$lib/components/ui/card';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import { Button } from '$lib/components/ui/button';
	import { MoreHorizontal } from 'lucide-svelte';

	const bismillah = 'بِسْمِ ٱللَّهِ ٱلرَّحْمَـٰنِ ٱلرَّحِيمِ';

	/**
	 * @typedef {Object} Data
	 * @property {number} id
	 * @property {string} name
	 * @property {string} transliteration
	 * @property {string} translation
	 * @property {string} type
	 * @property {number} total_verses
	 * @property {Object.<string, string>} verses
	 */

	/** @type {Data} */
	export let data;
	const { id, verses } = data;

	// console.log(`[...slug]/+page.svelte: `, data);
</script>

<div class="grid gap-5">
	{#each Object.entries(verses) as [verseid, verse]}
		{#if verseid === '1' && verse.includes(bismillah)}
			<p class="text-center text-3xl font-['Uthman']">{bismillah}</p>
		{/if}
		<Card.Root>
			<Card.Header class="flex-row items-center gap-1">
				<Button class="!m-0" variant="ghost" size="icon">
					{id}:{verseid}
				</Button>
				<DropdownMenu.Root>
					<DropdownMenu.Trigger asChild let:builder>
						<Button class="!m-0" variant="ghost" size="icon" builders={[builder]}
							><MoreHorizontal class="p-1" /></Button
						>
					</DropdownMenu.Trigger>
					<DropdownMenu.Content>
						<DropdownMenu.Group>
							<DropdownMenu.Item>Copy</DropdownMenu.Item>
							<DropdownMenu.Item>Bookmark</DropdownMenu.Item>
							<DropdownMenu.Item>Play</DropdownMenu.Item>
							<DropdownMenu.Item>Research</DropdownMenu.Item>
						</DropdownMenu.Group>
					</DropdownMenu.Content>
				</DropdownMenu.Root>
			</Card.Header>
			<Card.Content dir="rtl">
				<p class="flex flex-wrap gap-3">
					{#each verse.split(' ') as word}
						<span class="flex flex-col items-center justify-center select-none text-xs gap-1"
							><span class="text-3xl font-['Uthman'] select-auto block">{word}</span
							>{transliterateArabic(word)}</span
						>
					{/each}
				</p>
			</Card.Content>
		</Card.Root>
	{/each}
</div>

<style>
	@font-face {
		font-family: 'Uthman';
		src: url('$lib/assets/fonts/UthmanTN_v2-0.ttf');
		font-display: swap;
	}
</style>
