import { browser } from '$app/environment';
import { PUBLIC_GOOGLE_MAPS_API_KEY } from '$env/static/public';
import { Loader } from '@googlemaps/js-api-loader';

if (!browser) throw new Error("This file can't be imported on the server");

await new Loader({
	apiKey: PUBLIC_GOOGLE_MAPS_API_KEY,
	version: 'weekly',
	libraries: ['places'],
}).load();

export const { Map: GoogleMap } = (await google.maps.importLibrary(
	'maps'
)) as google.maps.MapsLibrary;

export const placeAutocomplete = (query: string) => {
	const service = new google.maps.places.AutocompleteService();
	return service.getPlacePredictions({ input: query });
};
