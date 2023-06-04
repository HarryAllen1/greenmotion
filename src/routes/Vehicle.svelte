<script lang="ts">
	import { onMount } from "svelte";

    let year = localStorage.getItem('year') || '2012';
    
    let makes = [] as string[];
    let make = localStorage.getItem('make') || '';
    let models = [] as string[];
    let model = localStorage.getItem('model') || '';

    function getMakes() {
        fetch(`/carMPG/${year}`)
            .then((res) => res.json())
            .then((data) => {
                makes = data;
                
            console.log(makes)
            if (!makes.includes(make)) {
            make = makes[0];
        }
        getModels();
        });
    }
    function getModels() {
        if (!make) {
            return;
        }
        fetch(`/carMPG/${year}-${make}`)
            .then((res) => res.json())
            .then((data) => {
                models = data;
                
        if (!models.includes(model)) {
            model = models[0];
        }
        console.log(models)
        updateLocalStorage();
        });
    }

    function updateLocalStorage() {
        localStorage.setItem('year', year);
        localStorage.setItem('make', make);
        localStorage.setItem('model', model);
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
{#if models.length > 0}
    <label for="model">Model:</label>
    <select id="model" bind:value={model} on:change={updateLocalStorage}>
        <option value="" disabled selected>Choose Model</option>
        {#each models as m}
            <option value={m}>{m}</option>
        {/each}
    </select>
{/if}

