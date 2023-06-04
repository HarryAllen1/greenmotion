<script lang="ts">
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
		"100 - 120",
		"121 - 140",
		"141 - 160",
		"161 - 180",
		"181 - 200",
		"201 - 220",
		"221 - 240",
		"241 - 260",
	]

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

	const updatePedestrianStore = () =>
		console.log(weightRange);
		localStorage.setItem('weightRange', weightRange.toString());
		walkingData.update((data) => {
			data.weight = weightRange;
			return data;
		});
</script>

{#if !model || !year || !make}
	<h2 class="text-center">Choose a car first</h2>
{:else}
	<h2 class="text-center">Statistics</h2>
	<div>
		<label for="weight">Weight Range:</label>
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

	<div>
		<label for="biking">Biking: </label>
		<input type="checkbox" bind:checked={biking} />
	</div>

	<div>
		<label for="vehicleMpg">Vehicle MPG: {mpg}</label>
	</div>

	<div>
		<label for="vehicleDistance">Distance by Car (miles): {vehicleDistance}</label>
	</div>
	<div>
		<label for="vehicleTime">Time by Car (min): {vehicleTime}</label>
	</div>
	<div>
		<label for="pedestrianDistance"
			>Distance by {biking ? 'Bike' : 'Foot'} (miles): {pedestrianDistance}</label
		>
	</div>
	<div>
		<label for="pedestrianTime">Time by {biking ? 'Bike' : 'Foot'} (min): {pedestrianTime}</label>
	</div>
	<div>
		<label for="pedestrianCalories">
			Calories Burned by {biking ? 'Bike' : 'Foot'} (min): {pedestrianCalories}
		</label>
	</div>
	<div>
		<label for="gallons">Gallons of Gas: {gallons}</label>
	</div>
	<div>
		<label for="emissions">Emissions (grams): {emissions}</label>
	</div>
	<div>
		<label for="carCalories">Energy Burned by Car (joules): {Math.round(carJoules)}</label>
	</div>
	<div>
		<label for="wastedCalories">Wasted energy (joules): {Math.round(wastedJoules)}</label>
	</div>
{/if}
