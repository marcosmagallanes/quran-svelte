<script>
	import { ModeWatcher } from 'mode-watcher';
	import '../app.pcss';
	import Navigation from './Navigation.svelte';
</script>

<ModeWatcher />
<Navigation />
<main class="px-3 my-3">
	<slot />
</main>
