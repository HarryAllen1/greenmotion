<script lang="ts">
	import { calculatePedestrianCalories } from 'greenmotion-wasm';
	import { onMount } from 'svelte';

	let model = localStorage.getItem('model');
	let year = localStorage.getItem('year');
	let make = localStorage.getItem('make');
	console.log(model, year, make);

	let mpg = 0;
	
	let biking = true;
	let weightRange = 2;

	//miles
	let vehicleDistance = 0;
	//minutes
	let vehicleTime = 0;

	let pedestrianDistance = 0;
	let pedestrianTime = 0;

	let pedestrianCalories = 0;

	let gallons = 0;
	let emissions = 0;
	let carJoules = 0;
	let wastedJoules = 0;

	onMount(() => {
		if (model && year && make) {
		fetch(`/carMPG/${year}-${make}-${model}`)
			.then((res) => res.json())
			.then((data) => {
				console.log(data);
				console.log(data.cityMpg);
				mpg = data.cityMpg;	
				vehicleDistance = Number(localStorage.getItem('distance')) ?? 4;
				vehicleTime = Number(localStorage.getItem('time')) ?? 14;
				pedestrianDistance = Number(localStorage.getItem('pDistance')) ?? 4.1;
				pedestrianTime = Number(localStorage.getItem('pTime')) ?? 13;
				pedestrianCalories = calculatePedestrianCalories(biking, weightRange);
				gallons = vehicleDistance / Number(mpg);
				emissions = 8.887 * gallons;
				carJoules = 1200 * vehicleDistance * 4.184;
				wastedJoules = carJoules - pedestrianCalories * 4.184;
			});
		}
	});
</script>

{#if !model || !year || !make}
	<h1>Choose a car first</h1>
{:else}
	<h1>Statistics</h1>
	<div>
		<label for="weight">Weight Range:</label>
		<select bind:value={weightRange}>
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
		<label for="vehicleDistance">Distance by Car (km): {vehicleDistance}</label>
	</div>
	<div>
		<label for="vehicleTime">Time by Car (min): {vehicleTime}</label>
	</div>
	<div>
		<label for="pedestrianDistance"
			>Distance by {biking ? 'Bike' : 'Foot'} (km): {pedestrianDistance}</label
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
