<script lang="ts">
	import { onMount } from 'svelte';

	let year = '2012';
	let make = 'Honda';
	let model = 'Accord';

	let makes: string[] = [];
	let models: string[] = [];

	const getMakes = async () => {
		const res = await fetch(`/carMPG/${year}`);
		const json = await res.json();
		makes = json;
		make = 'Honda';
		await getModels();
	};

	const getModels = async () => {
		const res = await fetch(`/carMPG/${year}-${make}`);
		const json = await res.json();
		models = json;
		model = 'Accord';
	};

	const updateLocalStorage = () => {
		localStorage.setItem('year', year);
		localStorage.setItem('make', make);
		localStorage.setItem('model', model);
	};

	onMount(async () => {
		await getMakes();
	});
</script>

<div class="flex flex-col">
	<h2 class="text-center">Choose Car</h2>
	<label for="year">Year:</label>
	<input type="number" id="year" min={1984} max={2024} on:change={getMakes} bind:value={year} />
	<label for="make">Make:</label>
	<select id="make" bind:value={make} on:change={getModels}>
		<option value="" disabled selected>Choose Make</option>
		{#each makes as m}
			<option value={m}>{m}</option>
		{/each}
	</select>
	<label for="model">Model:</label>
	<select id="model" bind:value={model} on:change={updateLocalStorage}>
		<option value="" disabled selected>Choose Model</option>
		{#each models as m}
			<option value={m}>{m}</option>
		{/each}
	</select>
</div>
