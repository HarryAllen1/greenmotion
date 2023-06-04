<script lang="ts">
	let model = localStorage.getItem('model');
	let year = localStorage.getItem('year');
	let make = localStorage.getItem('make');
	//fetch mpg from carMPG/year-make-model
	let mpg = 0;
	fetch(`/carMPG/${year}-${make}-${model}`)
		.then((res) => res.json())
		.then((data) => {
			mpg = data.mpg;
		});

	let biking = true;
	let weightRange = 2;

	//miles
	let vehicleDistance = Number(localStorage.getItem('distance')) || 0;
	//minutes
	let vehicleTime = Number(localStorage.getItem('time')) || 0;

	let pedestrianDistance = Number(localStorage.getItem('pDistance')) || 0;
	let pedestrianTime = Number(localStorage.getItem('pTime')) || 0;

	let pedestrianCalories = biking
		? (40 + 5 * weightRange + (60 + 10 * weightRange)) / 2
		: 55 + weightRange * 5;

	let gallons = vehicleDistance / mpg;
	let emissions = 8.887 * gallons;
	let carJoules = 1200 * vehicleDistance * 4.184;
	let wastedJoules = carJoules - pedestrianCalories * 4.184;
</script>

{#if model == undefined}
	<h1>Choose a car first</h1>
{:else}
	<h1>Statistics</h1>
	<div>
		<label for="weight">Weight Range:</label>
		<select bind:value={weightRange}>
			<option value="0">100-120</option>
			<option value="1">121-140</option>
			<option value="2">141-160</option>
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
		<label for="pedestrianCalories"
			>Calories Burned by {biking ? 'Bike' : 'Foot'} (min): {pedestrianCalories}</label
		>
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
