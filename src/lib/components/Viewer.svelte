<script lang="ts">
	import { onMount } from 'svelte';
	import { getAccessToken } from '$lib/clientUtils/aps';

	// Custom Store
	import autodeskStore from '$lib/contextStore/autodeskStore';

	let app: Autodesk.Tandem.DtApp;
	let container: HTMLDivElement;
	let viewer: Autodesk.Viewing.GuiViewer3D;
	let mounted = false;

	async function _getAccessToken(callback: (token: string, expires: number) => void) {
		const token = await getAccessToken();
		callback(token.access_token, token.expires_in);
	}

	function initViewer(container: HTMLDivElement) {
		return new Promise(function (resolve) {
			Autodesk.Viewing.Initializer(
				{
					getAccessToken: _getAccessToken,
					env: 'DtProduction',
					api: 'dt',
					useCookie: false,
					productId: 'Digital Twins',
					corsWorker: true,
					config3d: {
						extensions: ['Autodesk.BoxSelection'],
						screenModeDelegate: Autodesk.Viewing.NullScreenModeDelegate
					}
				},
				function () {
					const viewer = new Autodesk.Viewing.GuiViewer3D(container);
					viewer.start();
					resolve(viewer);
				}
			);
		});
	}

	onMount(async function () {
		mounted = true;
		if (window.hasOwnProperty('Autodesk')) {
			setup();
		}
	});

	async function onScriptLoaded() {
		if (mounted && !viewer) {
			setup();
		}
	}

	const handleViewerInitialized = (event: CustomEvent) => {
		console.log(`handle viewer initialized`);
	};

	const handleViewerUninitialized = (event: CustomEvent) => {
		console.log(`handle viewer uninitialized`);
	};

	async function setup() {
		viewer = await initViewer(container) as Autodesk.Viewing.GuiViewer3D;
		viewer.addEventListener(Autodesk.Viewing.VIEWER_INITIALIZED, handleViewerInitialized);
		viewer.addEventListener(Autodesk.Viewing.VIEWER_UNINITIALIZED, handleViewerUninitialized);
		viewer.addEventListener('toolbarCreated', (event: any) => {
			console.log(`toolbarCreated`);
			event.target.toolbar.addClass('adsk-toolbar-vertical');
			event.target.toolbar.container.style['justify-content'] = 'unset';
			event.target.toolbar.container.style['top'] = '175px';
		});
		// create Tandem application
		app = new Autodesk.Tandem.DtApp();
		autodeskStore.appInitialized(app, viewer);
	}
</script>

<svelte:head>
	<link rel="stylesheet" href="https://tandem.autodesk.com/viewer/style.css" />
	<script src="https://tandem.autodesk.com/viewer/viewer3D.js" on:load={onScriptLoaded}></script>
</svelte:head>

<div bind:this={container}></div>

<style>
</style>
