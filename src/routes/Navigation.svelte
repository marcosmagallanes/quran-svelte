<script lang="ts">
	import { onMount, tick } from 'svelte';
	import { goto } from '$app/navigation';
	import { toggleMode } from 'mode-watcher';
	import Fuse from 'fuse.js';

	import * as Command from '$lib/components/ui/command';
	import { Button, buttonVariants } from '$lib/components/ui/button';
	import { Sun, Moon } from 'lucide-svelte';
	import chapters from '$lib/content/quran/chapters.json';

	const fuse = new Fuse(chapters, {
		keys: ['transliteration'],
		shouldSort: true,
		isCaseSensitive: false,
		ignoreLocation: true,
		includeScore: true
	});

	let open = false;
	let search: string = '';
	$: results = fuse.search(search, { limit: 5 }).map(({ item }) => item);

	async function itemSelected(value: string) {
		await tick();
		await goto(value);
		search = '';
		open = false;
	}

	onMount(() => {
		function handleKeydown(e: KeyboardEvent) {
			if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
				e.preventDefault();
				open = !open;
			}
		}
		document.addEventListener('keydown', handleKeydown);
		return () => {
			document.removeEventListener('keydown', handleKeydown);
		};
	});
</script>

<Command.Dialog bind:open shouldFilter={false}>
	<Command.Input placeholder="Type a command or search..." bind:value={search} />
	<Command.List>
		<Command.Empty>No results found.</Command.Empty>
		<Command.Group>
			{#each results as { transliteration, id }}
				<Command.Item onSelect={async () => await itemSelected(id.toString())} value={id.toString()}
					>{id} - {transliteration}</Command.Item
				>
			{/each}
		</Command.Group>
		<Command.Group heading="Suggestions">
			<Command.Item>Settings</Command.Item>
			<Command.Item>Keyboard Shortcuts</Command.Item>
		</Command.Group>
	</Command.List>
</Command.Dialog>

<nav class="flex items-center justify-between border-b gap-3 p-3">
	<a href="/" class={buttonVariants({ variant: 'ghost', class: 'font-bold' })}> revertQuran </a>

	<Button
		variant="outline"
		class="relative justify-start text-sm text-muted-foreground w-80"
		on:click={() => (open = true)}
		><span class="inline-flex">Search...</span>
		<kbd
			class="pointer-events-none absolute right-1.5 h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 flex"
		>
			<span class="text-xs">⌘</span>K
		</kbd>
	</Button>

	<Button on:click={toggleMode} variant="outline" size="icon">
		<Sun
			class="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
		/>
		<Moon
			class="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
		/>
		<span class="sr-only">Toggle theme</span>
	</Button>
</nav>
