<script lang="ts">
	let vehicleMpg = 22;
	let biking = true;
	//0-7 for the ranges
	let weightRange = 2;
    let weight = (weightRange>0 ? 101+20*weightRange : 100) +"-"+(120+20*weightRange);
	//miles
	let vehicleDistance = 4.1;
	//minutes
	let vehicleTime = 14;

	let pedestrianDistance = 3.4;
	let pedestrianTime = 72;

	let pedestrianCalories = biking ? (40 + 5 * weightRange + (60 + 10 * weightRange)) / 2 : 55 + weightRange * 5;

	let gallons = vehicleDistance / vehicleMpg;
	let emissions = 8.887 * gallons;
	let carJoules = 1200 * vehicleDistance * 4.184;
    let wastedJoules = carJoules - pedestrianCalories * 4.184;
</script>

<h1>Statistics</h1>
<div>
	<label for="vehicleMpg">Vehicle MPG: {vehicleMpg}</label>
</div>
<div>
	<label for="biking">Biking: {biking ? 'Yes' : 'No'}</label>
</div>
<div>
	<label for="weight">Weight Range: {weight}</label>
</div>

<div>
	<label for="vehicleDistance">Distance by Car (km): {vehicleDistance}</label>
</div>
<div>
	<label for="vehicleTime">Time by Car (min): {vehicleTime}</label>
</div>
<div>
	<label for="pedestrianDistance">Distance by {biking ? 'Bike' : 'Foot'} (km): {pedestrianDistance}</label>
</div>
<div>
	<label for="pedestrianTime">Time by {biking ? 'Bike' : 'Foot'} (min): {pedestrianTime}</label>
</div>
<div>
	<label for="pedestrianCalories">Calories Burned by {biking ? 'Bike' : 'Foot'} (min): {pedestrianCalories}</label>
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

