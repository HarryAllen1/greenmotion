export const GET = async ({ fetch, params }) => {
	const id = `menu/options?year=${params.year}&make=${params.make}&model=${params.model}`;
	const res = await fetch(`https://www.fueleconomy.gov/ws/rest/vehicle/${id}`, {
		headers: {
			Accept: 'application/json',
		},
	});
	const item = await res.json();

	const vehicleId = item.menuItem[0].value;
	const mpgRes = await fetch(`https://www.fueleconomy.gov/ws/rest/vehicle/${vehicleId}`, {
		headers: {
			Accept: 'application/json',
		},
	});
	const mpgData = await mpgRes.json();
	console.log(mpgData);
	const cityMpg = mpgData.city08;
	const highwayMpg = mpgData.highway08;

	const response = {
		cityMpg: cityMpg || 'N/A',
		highwayMpg: highwayMpg || 'N/A',
	};

	return new Response(JSON.stringify(response), {
		headers: { 'Content-Type': 'application/json' },
	});
};
