<script lang="ts">
	import { Tabs, TabsContent, TabsList, TabsTrigger } from '$components/ui/tabs';
	import { Pane, Splitpanes } from 'svelte-splitpanes';
	import Route from './Route.svelte';
	import Stats from './Stats.svelte';
	import Vehicle from './Vehicle.svelte';
	import { carData, drivingData } from './data';

	$: vehicleDistance = $drivingData.distance;
	$: ({ make, model, year } = $carData);
</script>

<div class="h-[100vh]">
	<Splitpanes horizontal dblClickSplitter={false}>
		<Pane size={45}>
			<Tabs value="vehicle">
				<TabsList class="grid w-full grid-cols-2">
					<TabsTrigger value="vehicle">Vehicle</TabsTrigger>
					<TabsTrigger value="route">Route</TabsTrigger>
				</TabsList>
				<TabsContent value="vehicle" class="p-4 pt-0">
					<Vehicle />
				</TabsContent>
				<TabsContent value="route" class="p-4 pt-0">
					<Route />
				</TabsContent>
			</Tabs>
		</Pane>
		{#if vehicleDistance && make && model && year}
			<Pane class="p-4 pt-0 h-full overflow-y-scroll">
				<Stats />
			</Pane>
		{/if}
	</Splitpanes>
</div>
