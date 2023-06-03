<script lang="ts">
	import { Input } from '$components/ui/input';
	import { Tabs } from '$components/ui/tabs';
	import { onMount } from 'svelte';
	import TabsList from '../lib/components/ui/tabs/TabsList.svelte';
	import TabsTrigger from '../lib/components/ui/tabs/TabsTrigger.svelte';
	import TabsContent from '../lib/components/ui/tabs/TabsContent.svelte';

	let startLocation = '';
	onMount(() => {
		navigator.geolocation.getCurrentPosition(
			(pos) => {
				startLocation = `${pos.coords.latitude}, ${pos.coords.longitude}`;
			},
			console.error,
			{
				enableHighAccuracy: true,
			}
		);
	});
</script>

<Tabs value="vehicle">
	<TabsList class="grid w-full grid-cols-2">
		<TabsTrigger value="vehicle">Vehicle</TabsTrigger>
		<TabsTrigger value="route">Route</TabsTrigger>
	</TabsList>
	<TabsContent value="vehicle" />
	<TabsContent value="route">
		<div class="flex flex-col">
			<h2 class="text-center w-full">Trip Details</h2>
			<Input bind:value={startLocation} placeholder="Start location" />
		</div>
	</TabsContent>
</Tabs>
