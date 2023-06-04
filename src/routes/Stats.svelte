<script lang="ts">
	let vehicleMpg = 22;
	let biking = true;
	//0-7 for the ranges
	let weight = 2;

	//kilometers
	let vehicleDistance = 4;
	//minutes
	let vehicleTime = 14;

	let pedestrianDistance = 3.4;
	let pedestrianTime = 72;

	const pedestrianCalories = biking ? (40 + 5 * weight + (60 + 10 * weight)) / 2 : 55 + weight * 5;

	let gallons = vehicleDistance / vehicleMpg;
	let emissions = 0;
	let carCalories = 0;

	let wastedCalories = carCalories - pedestrianCalories;
</script>

<h1>STATISTICS</h1>
<div>
	<label for="vehicleMpg">Vehicle MPG:</label>
	<p>{vehicleMpg}</p>
</div>
<div>
	<label for="biking">Biking:</label>
	<p>{biking}</p>
</div>
<div>
	<label for="weight">Weight Range:</label>
	<p>{weight}</p>
</div>

<div>
	<label for="vehicleDistance">Distance by Car (km):</label>
	<p>{vehicleDistance}</p>
</div>
<div>
	<label for="vehicleTime">Time by Car (min):</label>
	<p>{vehicleTime}</p>
</div>
<div>
	<label for="pedestrianDistance">Distance by {biking ? 'Bike' : 'Foot'} (km):</label>
	<p>{pedestrianDistance}</p>
</div>
<div>
	<label for="pedestrianTime">Time by {biking ? 'Bike' : 'Foot'} (min):</label>
	<p>{pedestrianTime}</p>
</div>
<div>
	<label for="pedestrianCalories">Calories Burned by {biking ? 'Bike' : 'Foot'} (min):</label>
</div>
