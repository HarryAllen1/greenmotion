<script lang="ts">
	import { onMount } from 'svelte';
	import Map from './Map.svelte';
	import Sidebar from './Sidebar.svelte';

	onMount(async () => {
		const { placeAutocomplete } = await import('../lib/maps');
		console.log(await placeAutocomplete('lon'));
	});
</script>

<div class="w-full grid grid-cols-[1fr_3fr]">
	<Sidebar />
	<Map />
</div>
