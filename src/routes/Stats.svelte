<script lang="ts">
	import { Checkbox } from '$components/ui/checkbox';
	import { Table, TableBody, TableCell, TableRow } from '$components/ui/table';
	import {
		calculateCarJoules,
		calculateEmissions,
		calculateGallons,
		calculatePedestrianCalories,
		calculateWastedJoules,
		metersToMiles,
		secondsToMinutes,
	} from 'greenmotion-wasm';
	import { onMount } from 'svelte';
	import { bikingData, carData, drivingData, walkingData } from './data';

	let model = $carData.model;
	let year = $carData.year;
	let make = $carData.make;

	let mpg = 0;
	let biking = true;
	let weightRange = 2;
	$: vehicleDistance = metersToMiles($drivingData.distance);
	$: vehicleTime = secondsToMinutes($drivingData.time);
	$: pedestrianDistance = metersToMiles(biking ? $bikingData.distance : $walkingData.distance);
	$: pedestrianTime = secondsToMinutes(biking ? $bikingData.time : $walkingData.time);
	$: pedestrianCalories = calculatePedestrianCalories(biking, weightRange) * pedestrianDistance;
	$: gallons = calculateGallons(vehicleDistance, mpg);
	$: emissions = calculateEmissions(gallons);
	$: carJoules = calculateCarJoules(vehicleDistance, mpg);
	$: wastedJoules = calculateWastedJoules(carJoules, pedestrianCalories);
	weightRange = Number(localStorage.getItem('weightRange')) || 2;
	const weights = [
		'100 - 120',
		'121 - 140',
		'141 - 160',
		'161 - 180',
		'181 - 200',
		'201 - 220',
		'221 - 240',
		'241 - 260',
	];

	console.log(weightRange);

	onMount(() => {
		if (model && year && make) {
			void fetch(`/carMPG/${year}-${make}-${model}`)
				.then((res) => res.json() as Promise<Record<string, number>>)
				// eslint-disable-next-line unicorn/prefer-top-level-await
				.then((data) => {
					mpg = data.cityMpg;
				});
		}
	});

	const updatePedestrianStore = () => {
		localStorage.setItem('weightRange', weightRange.toString());
		console.log('setting');
		console.log(localStorage.getItem('weightRange'));
		walkingData.update((data) => {
			data.weight = weightRange;
			return data;
		});
	};
</script>

{#if !model || !year || !make}
	<h2 class="text-center">Choose a car first</h2>
{:else}
	<h2 class="text-center">Statistics</h2>
	<div>
		<label for="weight">Person weight range</label>
		<select
			class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
			bind:value={weightRange}
			on:change={updatePedestrianStore}
		>
			{#each [2, 3, 4, 5, 6, 7] as weight}
				{#if weight === weightRange}
					<option value={weight} selected>{weights[weight]}</option>
				{:else}
					<option value={weight}>{weights[weight]}</option>
				{/if}
			{/each}
		</select>
	</div>

	<Table>
		<TableBody>
			<TableRow>
				<TableCell>Biking</TableCell>
				<TableCell role="checkbox">
					<Checkbox bind:checked={biking} />
				</TableCell>
			</TableRow>
			<TableRow>
				<TableCell>Vehicle MPG</TableCell>
				<TableCell>{mpg}</TableCell>
			</TableRow>
			<TableRow>
				<TableCell>Distance by Car (miles)</TableCell>
				<TableCell>{vehicleDistance}</TableCell>
			</TableRow>
			<TableRow>
				<TableCell>Time by Car (min)</TableCell>
				<TableCell>{vehicleTime}</TableCell>
			</TableRow>
			<TableRow>
				<TableCell>Distance by {biking ? 'Bike' : 'Foot'} (miles)</TableCell>
				<TableCell>{pedestrianDistance}</TableCell>
			</TableRow>
			<TableRow>
				<TableCell>Time by {biking ? 'Bike' : 'Foot'} (min)</TableCell>
				<TableCell>{pedestrianTime}</TableCell>
			</TableRow>
			<TableRow>
				<TableCell>
					Calories Burned by {biking ? 'Bike' : 'Foot'} (min)
				</TableCell>
				<TableCell>{pedestrianCalories}</TableCell>
			</TableRow>
			<TableRow>
				<TableCell>Gallons of Gas</TableCell>
				<TableCell>{gallons}</TableCell>
			</TableRow>
			<TableRow>
				<TableCell>CO2 Emissions (lbs)</TableCell>
				<TableCell>{emissions}</TableCell>
			</TableRow>
			<TableRow>
				<TableCell>Energy Used by Car (J)</TableCell>
				<TableCell>{carJoules}</TableCell>
			</TableRow>
			<TableRow>
				<TableCell>Energy Wasted by {biking ? 'Bike' : 'Foot'} (J)</TableCell>
				<TableCell>{wastedJoules}</TableCell>
			</TableRow>
		</TableBody>
	</Table>
{/if}
