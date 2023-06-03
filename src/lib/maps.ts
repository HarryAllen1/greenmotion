import { GOOGLE_MAPS_API_KEY } from '$env/static/private';
import { Loader } from '@googlemaps/js-api-loader';

const loader = await new Loader({
	apiKey: GOOGLE_MAPS_API_KEY,
	version: 'weekly',
}).load();
