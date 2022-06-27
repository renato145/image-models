<script lang="ts">
  import { getData } from '../utils/getData';
  import Scatter from '../components/Chart.svelte';
  import ShowSelected from '../components/ShowSelected.svelte';
  import type { TData } from '../types';

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
</script>

<div class="container mx-auto mt-4 flex flex-col rounded-lg bg-slate-50 p-8">
  <h1>The best vision models for fine-tuning</h1>

  <div class="mt-8">
    {#await data}
      <p>...loading data</p>
    {:then data}
      <Scatter
        data={data.slice(0, 30)}
        xValue={(row) => row.fit_time}
        yValue={(row) => row.error_rate}
        dataTitle={(row) => row.model_name}
        {dataContent}
        margin={{
          top: 50,
          right: 20,
          left: 80,
          bottom: 55
        }}
        title="Image models"
        xLabel="Fit time"
        yLabel="Error rate"
        height={400}
        pointsRadius={5}
        pointHoverRadius={8}
        xOffset={5}
        yOffset={0.01}
      />
      <ShowSelected {data} />
    {/await}
  </div>
</div>
