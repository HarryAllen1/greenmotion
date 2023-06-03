<script lang="ts">
	import { onMount } from 'svelte';

	let model = 'ford';
	let year = '2019';
	/** @type {import('./$types').PageData} */
	export let data;
</script>

<main>
	<h1>Make API Call</h1>

	<div>
		<label for="model">Model:</label>
		<input type="text" id="model" bind:value={model} />
	</div>

	<div>
		<label for="year">Year:</label>
		<input type="text" id="year" bind:value={year} />
	</div>

	<button
		on:click={() => {
			data = {
				model,
				year
			};
		}}
	/>
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
