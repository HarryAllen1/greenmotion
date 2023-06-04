<script lang="ts">
	let model = 'ford';
	let year = '2019';
	let make = 'f150';
	let mpg = '';
</script>

<main>
	<h1>Make API Call</h1>
	<div>
		<label for="make">Make:</label>
		<input type="text" id="model" bind:value={make} />
	</div>
	<div>
		<label for="model">Model:</label>
		<input type="text" id="model" bind:value={model} />
	</div>

	<div>
		<label for="year">Year:</label>
		<input type="text" id="year" bind:value={year} />
	</div>

	<button />
	<div>
		<label for="mpg">MPG:</label>
		<input type="text" id="mpg" bind:value={mpg} />
	</div>
	<!-- fetch carMPG/year-make-model -->
	<button
		on:click={() => {
			fetch(`http://localhost:3000/carMPG/${year}-${make}-${model}`)
				.then((res) => res.json())
				.then((data) => {
					mpg = data.mpg;
				});
		}}>Get MPG</button
	>
	<div>
		<label for="mpg">MPG:</label>
		<input type="text" id="mpg" bind:value={mpg} />
	</div>
</main>

<style>
	main {
		padding: 20px;
	}

	label {
		margin-bottom: 5px;
		display: block;
	}

	input {
		margin-bottom: 10px;
		padding: 5px;
		width: 200px;
	}

	button {
		padding: 10px 20px;
		background-color: #007bff;
		color: white;
		border: none;
		cursor: pointer;
	}
</style>
