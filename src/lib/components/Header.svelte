<script lang="ts">
	// ui
	import TopAppBar, { Row, Section, Title } from '@smui/top-app-bar';
	import IconButton from '@smui/icon-button';
	import Select, { Option } from '@smui/select';

	// Custom Store
	import autodeskStore from '$lib/contextStore/autodeskStore';

	let selectedFacility: Autodesk.Tandem.DtFacility;
	let selectedView: Autodesk.Tandem.CompactView;

	const onFacilityChanged = async (event: CustomEvent) => {
		if ($autodeskStore.viewer && $autodeskStore.facility !== event.detail.value) {
			await autodeskStore.updateFacility(event.detail.value, $autodeskStore.viewer);
			if ($autodeskStore.selectedView) {
				selectedView = $autodeskStore.selectedView;
			}
		}
	};
	const onViewChanged = async (event: CustomEvent) => {
		if (
			$autodeskStore.app &&
			$autodeskStore.facility &&
			$autodeskStore.selectedView !== event.detail.value
		) {
			await autodeskStore.updateView($autodeskStore.facility, event.detail.value);
		}
	};

	$: if ($autodeskStore.facility) {
		selectedFacility = $autodeskStore.facility;
	}
	$: if ($autodeskStore.selectedView) {
		selectedView = $autodeskStore.selectedView;
	}
</script>

<TopAppBar variant="static" color={'secondary'}>
	<Row>
		<Section>
			<IconButton class="material-icons">menu</IconButton>
			<Title>Tandem SvelteKit Viewer</Title>
		</Section>
		<Section align="end" toolbar>
			<div>
				<Select
					bind:value={selectedFacility}
					label="Facility"
					class="shaped-outlined"
					variant="outlined"
					on:SMUISelect:change={onFacilityChanged}
				>
					{#each $autodeskStore.facilities as facility}
						{#if facility.settings.props['Identity Data']['Project Name'].length > 0}
							<Option value={facility}
								>{facility.settings.props['Identity Data']['Project Name']}</Option
							>
						{:else}
							<Option value={facility}
								>{facility.settings.props['Identity Data']['Building Name']}</Option
							>
						{/if}
					{/each}
				</Select>
				{#if $autodeskStore.facility}
					<Select
						bind:value={selectedView}
						label="View"
						class="shaped-outlined"
						variant="outlined"
						on:SMUISelect:change={onViewChanged}
					>
						{#each $autodeskStore.views as view}
							<Option value={view}>{view.viewName}</Option>
						{/each}
					</Select>
				{/if}
			</div>
		</Section>
	</Row>
</TopAppBar>

<style>
	* :global(.shaped-outlined),
	* :global(.shaped-outlined .mdc-select__anchor) {
		border-radius: 28px;
	}
	* :global(.shaped-outlined .mdc-text-field__input) {
		padding-left: 32px;
		padding-right: 0;
	}
	* :global(.shaped-outlined .mdc-notched-outline .mdc-notched-outline__leading) {
		border-radius: 28px 0 0 28px;
		width: 28px;
	}
	* :global(.shaped-outlined .mdc-notched-outline .mdc-notched-outline__trailing) {
		border-radius: 0 28px 28px 0;
	}
	* :global(.shaped-outlined .mdc-notched-outline .mdc-notched-outline__notch) {
		max-width: calc(100% - 28px * 2);
	}
	*
		:global(
			.shaped-outlined.mdc-select--with-leading-icon
				.mdc-notched-outline:not(.mdc-notched-outline--notched)
				.mdc-floating-label
		) {
		left: 16px;
	}
</style>
