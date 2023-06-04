<script lang="ts">
	import { Tabs } from '$components/ui/tabs';
	import { TabsContent } from '$components/ui/tabs';
	import { TabsList } from '$components/ui/tabs';
	import { TabsTrigger } from '$components/ui/tabs';
	import { Splitpanes, Pane } from 'svelte-splitpanes';
	import Route from './Route.svelte';
	import Vehicle from './Vehicle.svelte';
	import Stats from './Stats.svelte';
</script>

<div class="h-[100vh]">
	<Splitpanes horizontal dblClickSplitter={false}>
		<Pane minSize={20} size={45}>
			<Tabs value="route">
				<TabsList class="grid w-full grid-cols-2">
					<TabsTrigger value="route">Route</TabsTrigger>
					<TabsTrigger value="vehicle">Vehicle</TabsTrigger>
				</TabsList>
				<TabsContent value="route" class="p-4 pt-0">
					<Route />
				</TabsContent>
				<TabsContent value="vehicle" class="p-4 pt-0">
					<Vehicle />
				</TabsContent>
			</Tabs>
		</Pane>
		<Pane minSize={70} class="p-4 pt-0 h-full overflow-y-scroll">
			<Stats />
		</Pane>
	</Splitpanes>
</div>
