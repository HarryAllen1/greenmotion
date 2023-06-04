<script>
	import { Input } from '$components/ui/input';
	import { onMount } from 'svelte';
	import { map } from './map';
	import { get } from 'svelte/store';

	let startLocation = '';
	let endLocation = '';

	onMount(() => {
		const directionsService = new google.maps.DirectionsService();
		const directionsRenderer = new google.maps.DirectionsRenderer();
		const placesService = new google.maps.places.PlacesService(get(map));

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

<div class="flex flex-col gap-4">
	<h2 class="text-center w-full">Trip Details</h2>
	<Input bind:value={startLocation} placeholder="Start location" />
	<Input bind:value={endLocation} placeholder="End location" />
</div>
