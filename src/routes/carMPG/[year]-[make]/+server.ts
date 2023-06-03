import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET = (async ({ fetch, params }) => {
	const id = `menu/model?year=${params.year}&make=${params.make}`;
	const res = await fetch(`https://www.fueleconomy.gov/ws/rest/vehicle/${id}`, {
		headers: {
			Accept: 'application/json',
		},
	});
	const js = await res.json();
	const item = js as { menuItem: { text: string; value: string }[] };

	const models = item.menuItem.map((item) => item.text);
	return json(models);
}) as RequestHandler;
