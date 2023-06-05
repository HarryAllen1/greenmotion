<script lang="ts">
	import { Tabs, TabsContent, TabsList, TabsTrigger } from '$components/ui/tabs';
	import { Pane, Splitpanes } from 'svelte-splitpanes';
	import Route from './Route.svelte';
	import Stats from './Stats.svelte';
	import Vehicle from './Vehicle.svelte';
</script>

<div class="h-[100vh]">
	<Splitpanes horizontal dblClickSplitter={false}>
		<Pane minSize={10} size={45}>
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
		<Pane minSize={10} class="p-4 pt-0 h-full overflow-y-scroll">
			<Stats />
		</Pane>
	</Splitpanes>
</div>
