<script lang="ts">
  import { csv } from 'd3';
  import Scatter from '../components/Chart.svelte';
  import ShowSelected from '../components/ShowSelected.svelte';
  import type { TData } from '../types';

  async function getData(): Promise<TData[]> {
    const data = await csv(
      'https://raw.githubusercontent.com/rwightman/pytorch-image-models/master/results/results-imagenet.csv',
      (row: any, idx) => ({
        idx,
        model: row.model,
        interpolation: row.interpolation,
        top1: +row.top1,
        top1_err: +row.top1_err,
        top5: +row.top5,
        top5_err: +row.top5_err,
        param_count: +row.param_count,
        img_size: +row.img_size,
        cropt_pct: +row.cropt_pct
      })
    );
    return data;
  }
  const data = getData();

  function dataContent(row: TData) {
    return [
      `img sz: ${row.img_size}`,
      `Top 1: ${row.top1}`,
      `Top 5: ${row.top5}`,
      `# params: ${row.param_count}`,
      `Cropt %: ${row.cropt_pct}`
    ];
  }
</script>

<div class="flex flex-col container mx-auto mt-4 rounded-lg bg-slate-50 p-8">
  <h1>The best vision models for fine-tuning</h1>

  <div class="mt-8">
    {#await data}
      <p>...loading data</p>
    {:then data}
      <Scatter
        data={data.slice(0, 30)}
        xValue={(row) => row.param_count}
        yValue={(row) => row.top1}
        dataTitle={(row) => row.model}
        {dataContent}
        margin={{
          top: 50,
          right: 20,
          left: 80,
          bottom: 55
        }}
        title="Image models"
        xLabel="Param count"
        yLabel="Top 1"
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
