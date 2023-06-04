<script lang="ts">
	import { onMount } from 'svelte';
	import { Input } from '$components/ui/input';

	let year = localStorage.getItem('year') ?? '2021';
	let make = localStorage.getItem('make') ?? 'Honda';
	let model = localStorage.getItem('model') ?? 'Accord';

	let makes: string[] = [];
	let models: string[] = [];

	const getMakes = async () => {
		const res = await fetch(`/carMPG/${year}`);
		const json = (await res.json()) as string[];
		makes = json;
		if (makes.includes(make)) {
			await getModels();
		} else {
			make = makes[0];
			await getModels();
		}
	};

	const getModels = async () => {
		const res = await fetch(`/carMPG/${year}-${make}`);
		const json = (await res.json()) as string[];
		models = json;
		if (models.includes(model)) {
			updateLocalStorage();
		} else {
			model = models[0];
			updateLocalStorage();
		}
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
	<h2 class="text-center">Input Car Details</h2>
	<label for="year">Year:</label>
	<Input type="number" id="year" min={1984} max={2024} on:change={getMakes} bind:value={year} />
	<label for="make">Make:</label>
	<select
		class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
		id="make"
		bind:value={make}
		on:change={getModels}
	>
		<option value="" disabled selected>Choose Make</option>
		{#each makes as m}
			<option value={m}>{m}</option>
		{/each}
	</select>
	<label for="model">Model:</label>
	<select
		class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
		id="model"
		bind:value={model}
		on:change={updateLocalStorage}
	>
		<option value="" disabled selected>Choose Model</option>
		{#each models as m}
			<option value={m}>{m}</option>
		{/each}
	</select>
</div>
