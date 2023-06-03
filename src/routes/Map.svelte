<script lang="ts">
	import { onMount } from 'svelte';
	import bluedot from './bluedot.png';
	import { map } from './map';

	let mapEl: HTMLDivElement;

	onMount(async () => {
		const { GoogleMap } = await import('$lib/maps');
		const m = new GoogleMap(mapEl, {
			center: {
				lat: 0,
				lng: 0,
			},
			zoom: 15,
			mapId: '8ce1a75c61989e12',
		});
		navigator.geolocation.getCurrentPosition(
			(pos) => {
				m.setCenter({ lat: pos.coords.latitude, lng: pos.coords.longitude });
				const locationMarker = new google.maps.Marker({
					map: m,
					position: {
						lat: pos.coords.latitude,
						lng: pos.coords.longitude,
					},
					icon: {
						url: bluedot[0],
						scaledSize: new google.maps.Size(32, 32),
					},
				});
				locationMarker.setMap(m);
			},
			console.error,
			{ enableHighAccuracy: true }
		);
		map.set(m);
	});
</script>

<div id="map" class="w-full h-[100vh]" bind:this={mapEl} />
