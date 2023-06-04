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
	$: pedestrianCalories = calculatePedestrianCalories(biking, weightRange);
	$: gallons = calculateGallons(vehicleDistance, mpg);
	$: emissions = calculateEmissions(gallons);
	$: carJoules = calculateCarJoules(vehicleDistance, mpg);
	$: wastedJoules = calculateWastedJoules(carJoules, pedestrianCalories);
	$: weightRange = biking ? $bikingData.weight : $walkingData.weight;

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

	function updatePedestrianStore() {
		biking ? ($bikingData.weight = weightRange) : ($walkingData.weight = weightRange);
	}
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
			<option value="0">100-120</option>
			<option value="1">121-140</option>
			<option value="2" selected={true}>141-160</option>
			<option value="3">161-180</option>
			<option value="4">181-200</option>
			<option value="5">201-220</option>
			<option value="6">221-240</option>
			<option value="7">241-260</option>
		</select>
	</div>

	<div>
		<label for="biking">Biking: {biking ? 'Yes' : 'No'}</label>
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
