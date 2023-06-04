import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import type { MPGData } from './types';

export const GET = (async ({ fetch, params }) => {
	const id = `menu/options?year=${params.year}&make=${params.make}&model=${params.model}`;
	const res = await fetch(`https://www.fueleconomy.gov/ws/rest/vehicle/${id}`, {
		headers: {
			Accept: 'application/json',
		},
	});
	const item = (await res.json()) as { menuItem: { text: string; value: string }[] };

	const vehicleId = item.menuItem[0]?.value;
	if (!vehicleId) return json({ cityMpg: 'N/A', highwayMpg: 'N/A' });
	const mpgRes = await fetch(`https://www.fueleconomy.gov/ws/rest/vehicle/${vehicleId}`, {
		headers: {
			Accept: 'application/json',
		},
	});
	const mpgData = (await mpgRes.json()) as MPGData;

	const cityMpg = mpgData.city08;
	const highwayMpg = mpgData.highway08;

	const response = {
		cityMpg: cityMpg || 'N/A',
		highwayMpg: highwayMpg || 'N/A',
	};
	return json(response);
}) satisfies RequestHandler;
