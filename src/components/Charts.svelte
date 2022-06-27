<script lang="ts">
  import { scaleOrdinal, schemePaired } from 'd3';
  import type { TData } from 'src/types';
  import Scatter from './Scatter.svelte';
  import ShowSelected from './ShowSelected.svelte';
  export let data: TData[], chartConfigs;

  $: colorScale = scaleOrdinal(schemePaired).domain(data.map(chartConfigs.colorValue));
</script>

<div class="space-y-2">
  <Scatter
    data={data.filter((row) => row.dataset === 'pets')}
    title="Oxford IIT-Pet Dataset"
    {...chartConfigs}
    {colorScale}
  />
  <Scatter
    data={data.filter((row) => row.dataset === 'planet')}
    title="Kaggle Planet Dataset"
    {...chartConfigs}
    {colorScale}
  />
</div>
<ShowSelected {data} />
