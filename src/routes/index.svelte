<script lang="ts">
  import { csv } from 'd3';
  import Scatter from '../components/Chart.svelte';
  import type { TData } from '../types';

  async function getData() {
    const data = await csv(
      'https://raw.githubusercontent.com/rwightman/pytorch-image-models/master/results/results-imagenet.csv',
      (row: any) =>
        ({
          ...row,
          top1: +row.top1,
          top1_err: +row.top1_err,
          top5: +row.top5,
          top5_err: +row.top5_err,
          param_count: +row.param_count,
          img_size: +row.img_size,
          cropt_pct: +row.cropt_pct
        } as TData)
    );
    return data;
  }

  const data = getData();
</script>

<div class="container mx-auto mt-4 rounded-lg bg-slate-50 p-8 ">
  <h1>Image models</h1>

  <div class="mt-4">
    {#await data}
      <p>...loading data</p>
    {:then data}
      <Scatter
        data={data.slice(0, 25)}
        xValue={(row) => row.param_count}
        yValue={(row) => row.top1}
        margin={{
          top: 50,
          right: 20,
          left: 80,
          bottom: 55
        }}
        title="Image models"
        xLabel="Param count"
        yLabel="Top 1"
        pointsRadius={5}
        pointHoverRadius={8}
      />
    {/await}
  </div>
</div>
