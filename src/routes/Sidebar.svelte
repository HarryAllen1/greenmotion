<script lang="ts">
	import { Input } from '$components/ui/input';
	import { onMount } from 'svelte';

	let startLocation = '';
	onMount(() => {
		navigator.geolocation.getCurrentPosition(
			(pos) => {
				startLocation = `${pos.coords.latitude}, ${pos.coords.longitude}`;
			},
			console.error,
			{
				enableHighAccuracy: true,
			}
		);
	});
</script>

<div class="flex flex-col">
	<h2 class="text-center w-full">Trip Details</h2>
	<Input bind:value={startLocation} placeholder="Start location" />
</div>
