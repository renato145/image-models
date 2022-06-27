<script lang="ts">
  import { scaleOrdinal, schemePaired } from 'd3';
  import type { TData } from 'src/types';
  import FamilyFilter from './FamilyFilter.svelte';
  import Scatter from './Scatter.svelte';
  import ShowSelected from './ShowSelected.svelte';
  import { selectedFamilies } from '../store';

  export let data: TData[], chartConfigs;

  $: colorScale = scaleOrdinal(schemePaired).domain(data.map(chartConfigs.colorValue));
  $: allFamilies = colorScale.domain();
  $: filterFamily = (row: TData) => $selectedFamilies.indexOf(row.family) !== -1;
</script>

<div class="space-y-2">
  <FamilyFilter {allFamilies} {colorScale} />
  <Scatter
    data={data.filter((row) => row.dataset === 'pets').filter(filterFamily)}
    title="Oxford IIT-Pet Dataset"
    {...chartConfigs}
    {colorScale}
  />
  <Scatter
    data={data.filter((row) => row.dataset === 'planet').filter(filterFamily)}
    title="Kaggle Planet Dataset"
    {...chartConfigs}
    {colorScale}
  />
</div>
<ShowSelected {data} />
