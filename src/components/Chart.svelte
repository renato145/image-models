<script lang="ts">
  import { select, scaleLinear, extent, axisBottom, axisLeft } from 'd3';

  export let data,
    xValue: (any) => number,
    yValue: (any) => number,
    margin: { top: number; right: number; left: number; bottom: number };
  let width, height, xAxisNode, yAxisNode;

  $: x = scaleLinear()
    .domain(extent(data, xValue))
    .range([margin.left, width - margin.right]);
  $: xAxis = axisBottom(x);
  $: select(xAxisNode).call(xAxis).selectAll('text').attr('class', 'x-tick-labels');

  $: y = scaleLinear()
    .domain(extent(data, yValue))
    .range([margin.top, height - margin.bottom]);
  $: yAxis = axisLeft(y).ticks(5);
  $: select(yAxisNode).call(yAxis).selectAll('text').attr('class', 'x-tick-labels');

  $: {
    console.log({ width, height });
    console.log(x.domain());
    console.log(x.range());
  }

  console.log(data[0]);
</script>

<div bind:clientWidth={width} bind:clientHeight={height}>
  <svg class="bg-gray-300 w-full min-h-[300px]">
    <g bind:this={xAxisNode} transform={`translate(0,${height - margin.bottom})`} />
    <g bind:this={yAxisNode} transform={`translate(${margin.left},0)`} />
  </svg>
</div>

<style>
  :global(.x-tick-labels) {
    @apply text-lg;
  }
</style>
