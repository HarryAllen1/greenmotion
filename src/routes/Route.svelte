<script lang="ts">
	import { onMount } from 'svelte';
	import { get } from 'svelte/store';
	import { map } from './map';
	import { Button } from '$components/ui/button';
	import { drivingData, bikingData, walkingData } from './data';

	let directionsRenderer: google.maps.DirectionsRenderer;
	let directionsService: google.maps.DirectionsService;

	let startLocation = '';
	let startEl: HTMLInputElement;
	let origin: google.maps.places.Autocomplete;
	let endLocation = '';
	let endEl: HTMLInputElement;
	let destination: google.maps.places.Autocomplete;

	let currentlyShown: 'driving' | 'walking' | 'biking' = 'driving';

	$: currentlyShown, void route(origin, destination);

	onMount(() => {
		directionsRenderer = new google.maps.DirectionsRenderer();
		directionsService = new google.maps.DirectionsService();
		directionsRenderer.setMap(get(map));
		origin = new google.maps.places.Autocomplete(startEl, {});
		destination = new google.maps.places.Autocomplete(endEl, {});
		origin.addListener('place_changed', () => route(origin, destination));
		destination.addListener('place_changed', () => route(origin, destination));
	});

	const route = async (
		origin: google.maps.places.Autocomplete,
		destination: google.maps.places.Autocomplete
	) => {
		const originPlace: google.maps.places.PlaceResult | undefined = origin.getPlace();
		const destinationPlace: google.maps.places.PlaceResult | undefined = destination.getPlace();

		// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
		if (!originPlace || !destinationPlace) return;

		await directionsService.route(
			{
				origin: originPlace.formatted_address ?? '',
				destination: destinationPlace.formatted_address ?? '',
				travelMode: google.maps.TravelMode.DRIVING,
			},
			(res, status) => {
				if (status === google.maps.DirectionsStatus.OK) {
					if (currentlyShown === 'driving') directionsRenderer.setDirections(res);
					$drivingData = {
						distance: res?.routes[0].legs[0].distance?.value ?? 0,
						time: res?.routes[0].legs[0].duration?.value ?? 0,
					};
				} else {
					console.error(status);
				}
			}
		);
		await directionsService.route(
			{
				origin: originPlace.formatted_address ?? '',
				destination: destinationPlace.formatted_address ?? '',
				travelMode: google.maps.TravelMode.WALKING,
			},
			(res, status) => {
				if (status === google.maps.DirectionsStatus.OK) {
					if (currentlyShown === 'walking') directionsRenderer.setDirections(res);
					$walkingData = {
						distance: res?.routes[0].legs[0].distance?.value ?? 0,
						time: res?.routes[0].legs[0].duration?.value ?? 0,
						weight: $walkingData.weight,
					};
				} else {
					console.error(status);
				}
			}
		);
		await directionsService.route(
			{
				origin: originPlace.formatted_address ?? '',
				destination: destinationPlace.formatted_address ?? '',
				travelMode: google.maps.TravelMode.BICYCLING,
			},
			(res, status) => {
				if (status === google.maps.DirectionsStatus.OK) {
					if (currentlyShown === 'biking') directionsRenderer.setDirections(res);
					$bikingData = {
						distance: res?.routes[0].legs[0].distance?.value ?? 0,
						time: res?.routes[0].legs[0].duration?.value ?? 0,
						weight: $bikingData.weight,
					};
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
			currentlyShown === 'driving'
				? (currentlyShown = 'walking')
				: currentlyShown === 'walking'
				? (currentlyShown = 'biking')
				: (currentlyShown = 'driving')}
	>
		{currentlyShown === 'driving'
			? 'Show walking directions'
			: currentlyShown === 'biking'
			? 'Show driving directions'
			: 'Show biking directions'}
	</Button>
</div>
