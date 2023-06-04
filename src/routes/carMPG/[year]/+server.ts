import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET = (async ({ fetch, params }) => {
	const id = `menu/make?year=${params.year}`;
	const res = await fetch(`https://www.fueleconomy.gov/ws/rest/vehicle/${id}`, {
		headers: {
			Accept: 'application/json',
		},
	});
	const item = (await res.json()) as { menuItem: { text: string; value: string }[] };
	return json(item.menuItem.map((item) => item.text));
}) as RequestHandler;
