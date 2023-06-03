<script lang="ts">
	import { Tabs } from '$components/ui/tabs';
	import { TabsContent } from '$components/ui/tabs';
	import { TabsList } from '$components/ui/tabs';
	import { TabsTrigger } from '$components/ui/tabs';
	import Route from './Route.svelte';
	import Vehicle from './Vehicle.svelte';
	import Stats from './Stats.svelte';
</script>
<div>
<Tabs value="vehicle">
	<TabsList class="grid w-full grid-cols-2">
		<TabsTrigger value="vehicle">Vehicle</TabsTrigger>
		<TabsTrigger value="route">Route</TabsTrigger>
	</TabsList>
	<TabsContent value="vehicle">
		<Vehicle />
	</TabsContent>
	<TabsContent value="route">
		<Route />
	</TabsContent>
</Tabs>
<Stats />
</div>
