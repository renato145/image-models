<script lang="ts">
  import { select, scaleLinear, extent, axisBottom, axisLeft, quadtree } from 'd3';
  import ChartContainer from './ChartContainer.svelte';

  export let data: any,
    xValue: (any) => number,
    yValue: (any) => number,
    margin: { top: number; right: number; left: number; bottom: number };
  const nTicksY = 5;
  let width, height, xAxisNode, yAxisNode;

  $: innerSize = {
    width: width - margin.left - margin.right,
    height: height - margin.top - margin.bottom
  };

  $: x = scaleLinear()
    .domain(extent(data, xValue))
    .range([margin.left, width - margin.right]);
  $: xAxis = axisBottom(x);
  $: select(xAxisNode).call(xAxis).selectAll('text').attr('class', 'tick-labels');

  $: y = scaleLinear()
    .domain(extent(data, yValue))
    .range([height - margin.bottom, margin.top]);
  $: yAxis = axisLeft(y).ticks(nTicksY);
  $: select(yAxisNode).call(yAxis).selectAll('text').attr('class', 'tick-labels');

  $: coords = data.map((row) => [x(xValue(row)), y(yValue(row))]);

  $: finder = quadtree()
    .extent([
      [-1, -1],
      [width + 1, height + 1]
    ])
    .addAll(coords);

  let found;
  function findItem(x: number, y: number) {
    found = finder.find(x, y, 20);
  }
</script>

<ChartContainer bind:width bind:height let:mouseX let:mouseY>
  <svg class="min-h-[300px] w-full bg-gray-300" on:mousemove={() => findItem(mouseX, mouseY)}>
    {#if width && height}
      <rect x={margin.left} y={margin.top} width={innerSize.width} height={innerSize.height} class="fill-white" />
      <g bind:this={xAxisNode} transform={`translate(0,${height - margin.bottom})`} />
      <g bind:this={yAxisNode} transform={`translate(${margin.left},0)`} />
      {#each x.ticks() as tick}
        <line transform={`translate(${x(tick)},${margin.top})`} y2={innerSize.height} class="grid-lines" />
      {/each}
      {#each y.ticks(nTicksY) as tick}
        <line transform={`translate(${margin.left},${y(tick)})`} x2={innerSize.width} class="grid-lines" />
      {/each}
      {#each coords as [x, y]}
        <circle cx={x} cy={y} r={10} class="fill-blue-800/50" />
      {/each}
      <!-- <circle cx={mouseX} cy={mouseY} r={10} class="fill-emerald-800/75" /> -->
      {#if found}
        <circle cx={found[0]} cy={found[1]} r={20} class="fill-red-800/50" />
      {/if}
    {/if}
  </svg>
</ChartContainer>

<style>
  :global(.tick-labels) {
    @apply text-lg;
  }

  .grid-lines {
    @apply stroke-black/20 stroke-2;
    stroke-dasharray: 15 12;
  }
</style>
