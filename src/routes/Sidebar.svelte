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

<div>
	<Splitpanes horizontal dblClickSplitter={false}>
		<Pane minSize={20} size={80}>
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
		</Pane>
		<Pane minSize={40}>
			<Stats />
		</Pane>
	</Splitpanes>
</div>
