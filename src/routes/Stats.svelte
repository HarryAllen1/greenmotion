<script lang="ts">
	import {
		calculatePedestrianCalories,
		metersToMiles,
		secondsToMinutes,
		calculateEmissions,
		calculateCarJoules,
		calculateWastedJoules,
		calculateGallons,
	} from 'greenmotion-wasm';
	import { onMount } from 'svelte';
	import { drivingData, pedestrianData, carData } from './data';


	let model = $carData.model;
	let year = $carData.year;
	let make = $carData.make;

	let mpg = 0;
	let biking = true;
	let weightRange = 2;
	$: vehicleDistance = metersToMiles($drivingData.distance);
	$: vehicleTime = secondsToMinutes($drivingData.time);
	$: pedestrianDistance = metersToMiles($pedestrianData.distance);
	$: pedestrianTime = secondsToMinutes($pedestrianData.time);
	$: pedestrianCalories = calculatePedestrianCalories(biking, weightRange);
	$: gallons = calculateGallons(vehicleDistance, mpg);
	$: emissions = calculateEmissions(gallons);
	$: carJoules = calculateCarJoules(vehicleDistance, mpg);
	$: wastedJoules = calculateWastedJoules(carJoules, pedestrianCalories);
	$: weightRange = $pedestrianData.weight;
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
		$pedestrianData = {
			distance: pedestrianDistance,
			time: pedestrianTime,
			weight: weightRange,
		};
	}
</script>

{#if !model || !year || !make}
	<h1>Choose a car first</h1>
{:else}
	<h1>Statistics</h1>
	<div>
		<label for="weight">Weight Range:</label>
		<select bind:value={weightRange} on:change={updatePedestrianStore}>
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
