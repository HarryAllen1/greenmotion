<script lang="ts">
	import { onMount } from "svelte";

    let year = '2012';
    let make = 'Honda';
    let model = 'Accord';

    let makes = [] as string[];

    function getMakes() {
        fetch(`/carMPG/${year}`)
            .then((res) => res.json())
            .then((data) => {
                makes = data;
        });
        console.log(makes)
        make = 'Honda';
        getModels();
    }

    let models = [] as string[];
    function getModels() {
        fetch(`/carMPG/${year}-${make}`)
            .then((res) => res.json())
            .then((data) => {
                models = data;
        });
        model = 'Accord';
        console.log(models)
    }
    onMount(() => {
        getMakes();
    });
</script>
<h2>Choose Car:</h2>
<label for="year">Year:</label>
<input type="number" id="year" min="1984" max="2024" on:change={getMakes} bind:value={year} />
<br/>
<label for="make">Make:</label>
<select id="make" bind:value={make} on:change={getModels}>
    <option value="" disabled selected>Choose Make</option>
    {#each makes as m}
        <option value={m}>{m}</option>
    {/each}
</select>
<br/>
<label for="model">Model:</label>
<select id="model" bind:value={model}>
    <option value="" disabled selected>Choose Model</option>
    {#each models as m}
        <option value={m}>{m}</option>
    {/each}
</select>

