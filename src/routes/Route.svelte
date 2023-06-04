<script lang="ts">
	import { onMount } from 'svelte';
	import { get } from 'svelte/store';
	import { map } from './map';
	import { Button } from '$components/ui/button';

	let directionsRenderer: google.maps.DirectionsRenderer;
	let directionsService: google.maps.DirectionsService;

	let startLocation = '';
	let startEl: HTMLInputElement;
	let origin: google.maps.places.Autocomplete;
	let endLocation = '';
	let endEl: HTMLInputElement;
	let destination: google.maps.places.Autocomplete;

	let currentlyShown: 'driving' | 'walking' = 'driving';

	$: currentlyShown, route(origin, destination);

	onMount(async () => {
		directionsRenderer = new google.maps.DirectionsRenderer();
		directionsService = new google.maps.DirectionsService();
		directionsRenderer.setMap(get(map));
		origin = new google.maps.places.Autocomplete(startEl, {});
		destination = new google.maps.places.Autocomplete(endEl, {});
		origin.addListener('place_changed', () => route(origin, destination));
		destination.addListener('place_changed', () => route(origin, destination));
	});

	const route = (
		origin: google.maps.places.Autocomplete,
		destination: google.maps.places.Autocomplete
	) => {
		const originPlace = origin?.getPlace();
		const destinationPlace = destination?.getPlace();
		if (!originPlace || !destinationPlace) return;

		directionsService.route(
			{
				origin: originPlace.formatted_address ?? '',
				destination: destinationPlace.formatted_address ?? '',
				travelMode: google.maps.TravelMode.DRIVING,
			},
			(res, status) => {
				if (status === google.maps.DirectionsStatus.OK) {
					directionsRenderer.setDirections(res);
				} else {
					console.error(status);
				}
			}
		);
	};
</script>

<div class="flex flex-col gap-4">
	<h2 class="text-center w-full">Trip Details</h2>
	<input
		bind:this={startEl}
		class="flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
		bind:value={startLocation}
		placeholder="Start location"
	/>
	<input
		bind:this={endEl}
		class="flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
		bind:value={endLocation}
		placeholder="End location"
	/>
	<Button
		variant="secondary"
		on:click={() =>
			currentlyShown === 'driving' ? (currentlyShown = 'walking') : (currentlyShown = 'driving')}
	>
		{currentlyShown === 'driving' ? 'Show walking directions' : 'Show driving directions'}
	</Button>
</div>
