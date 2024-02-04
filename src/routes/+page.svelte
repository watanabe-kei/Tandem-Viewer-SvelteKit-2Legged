<script lang="ts">
	import { onMount } from 'svelte';
	import Viewer from '$lib/components/Viewer.svelte';
	import Header from '$lib/components/Header.svelte';

	onMount(async () => {});
</script>

<main>
	<div id="header">
		<Header />
	</div>
	<div id="content">
		<Viewer
			on:selectionChanged={(ev) => console.log('Selected IDs: ' + ev.detail.dbids.join(','))}
		/>
	</div>
</main>

<style>
	#header,
	#content {
		position: absolute;
		left: 0;
		right: 0;
	}

	#header {
		top: 0;
		height: 4em;
		display: flex;
		align-items: center;
		justify-content: end;
		/* padding: 0 1em; */
	}

	#content {
		top: 4em;
		bottom: 0;
	}
</style>
