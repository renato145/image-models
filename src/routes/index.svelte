<script lang="ts">
  import { getData } from '../utils/getData';
  import type { TData } from '../types';
  import Charts from '../components/Charts.svelte';

  const data = getData();
  function dataContent(row: TData) {
    return [
      `Dataset: ${row.dataset}`,
      `Family: ${row.family}`,
      `Score: ${row.score}`,
      `Error rate: ${row.error_rate}`,
      `Fit time: ${row.fit_time}`,
      `GPU mem: ${row.GPU_mem}`
    ];
  }
  const chartConfigs = {
    xValue: (row) => row.fit_time,
    yValue: (row) => row.error_rate,
    colorValue: (row) => row.family,
    dataTitle: (row) => row.model_name,
    dataContent,
    margin: {
      top: 50,
      right: 20,
      left: 80,
      bottom: 55
    },
    xLabel: 'Fit time',
    yLabel: 'Error rate',
    height: 400,
    pointsRadius: 6,
    pointHoverRadius: 10,
    xOffset: 5,
    yOffset: 0.01
  };
</script>

<div class="container mx-auto mt-4 flex flex-col rounded-lg bg-slate-50 p-8">
  <h1>The best vision models for fine-tuning</h1>

  <div class="mt-8">
    {#await data}
      <p>...loading data</p>
    {:then data}
      <Charts {data} {chartConfigs} />
    {/await}
  </div>
</div>
