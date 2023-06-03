import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET = (async ({ fetch, params }) => {
	const id = `menu/make?year=${params.year}`;
	const res = await fetch(`https://www.fueleconomy.gov/ws/rest/vehicle/${id}`, {
		headers: {
			Accept: 'application/json',
		},
	});
	const js = await res.json();
	if (js === null) {
		return json({ makes: [] });
	}
	const item = js as { menuItem: { text: string; value: string }[] };

	const makes = item.menuItem.map((item) => item.text);
	const results = makes.map(async (make) => {
		const makeId = item.menuItem.find((item) => item.text === make)?.value;
		const modelRes = await fetch(
			`https://www.fueleconomy.gov/ws/rest/vehicle/menu/model?year=${params.year}&make=${makeId}`,
			{
				headers: {
					Accept: 'application/json',
				},
			}
		);
		const modelData = (await modelRes.json()) as {
			menuItem: { text: string; value: string }[] | { text: string; value: string };
		};

		const menuItem = modelData.menuItem;
		//if modelData.menuItem is not an array
		if (Array.isArray(menuItem)) {
			const models = menuItem.map((item) => item.text);
			console.log(models);
			return { make, models: models };
		} else {
			console.log(menuItem.text);
			return { make, models: [menuItem.text] };
		}
	});
	return json(await Promise.all(results));
}) as RequestHandler;
