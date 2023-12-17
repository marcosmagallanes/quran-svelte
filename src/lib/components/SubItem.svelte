<!-- SubItem.svelte -->
<script lang="ts">
	import { Command } from 'cmdk-sv';

	type $$Props = Command.ItemProps & {
		search?: string;
	};

	export let search: $$Props['search'] = undefined;
</script>

{#if search}
	<Command.Item {...$$restProps}>
		<slot />
	</Command.Item>
{/if}
