import { PUBLIC_GOOGLE_MAPS_API_KEY } from '$env/static/public';
import { Loader } from '@googlemaps/js-api-loader';

await new Loader({
	apiKey: PUBLIC_GOOGLE_MAPS_API_KEY,
	version: 'weekly',
}).load();

export const { Map: GoogleMap } = (await google.maps.importLibrary(
	'maps'
)) as google.maps.MapsLibrary;
