<script lang="ts">
  import { select, scaleLinear, extent, axisBottom, axisLeft } from 'd3';
  import Point from '../components/Points.svelte';

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

  $: coords = data.map((row) => ({
    x: x(xValue(row)),
    y: y(yValue(row))
  }));

  $: console.log(yAxis);
</script>

<div bind:clientWidth={width} bind:clientHeight={height}>
  <svg class="min-h-[300px] w-full bg-gray-300">
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
      {#each coords as { x, y }}
        <Point cx={x} cy={y} />
      {/each}
    {/if}
  </svg>
</div>

<style>
  :global(.tick-labels) {
    @apply text-lg;
  }

  .grid-lines {
    @apply stroke-black/20 stroke-2;
    stroke-dasharray: 15 12;
  }
</style>
