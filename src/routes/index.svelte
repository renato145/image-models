<script lang="ts">
  import { csv } from 'd3';
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
    console.log(data[0]);
    return data;
  }

  const data = getData();
</script>

<div class="container mx-auto mt-4 rounded-xl bg-slate-50 p-8 ">
  <h1>Image models</h1>

  {#await data}
    <p>...waiting</p>
  {:then data}
    {#each data as row}
      <p>{row.model} - {row.top1} - {row.top5}</p>
    {/each}
  {/await}
</div>
