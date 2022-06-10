<script lang="ts">
  import { select, scaleLinear, extent, axisBottom, axisLeft, quadtree } from 'd3';
  import ChartContainer from './ChartContainer.svelte';
  import Highlight from './Highlight.svelte';

  export let data: any,
    xValue: (any) => number,
    yValue: (any) => number,
    margin: { top: number; right: number; left: number; bottom: number },
    pointsRadius = 10,
    pointHoverRadius = 20,
    title = 'Title',
    xLabel = 'X label',
    yLabel = 'Y label',
    labelsOffset = 12;
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
    found = finder.find(x, y, pointHoverRadius);
  }
</script>

<ChartContainer bind:width bind:height let:mouseX let:mouseY>
  <svg class="min-h-[300px] w-full bg-gray-300" on:mousemove={() => findItem(mouseX, mouseY)}>
    {#if width && height}
      <!-- Axes -->
      <rect x={margin.left} y={margin.top} width={innerSize.width} height={innerSize.height} class="fill-white" />
      <g bind:this={xAxisNode} transform={`translate(0,${height - margin.bottom})`} />
      <g bind:this={yAxisNode} transform={`translate(${margin.left},0)`} />
      <!-- Grid -->
      {#each x.ticks() as tick}
        <line transform={`translate(${x(tick)},${margin.top})`} y2={innerSize.height} class="grid-lines" />
      {/each}
      {#each y.ticks(nTicksY) as tick}
        <line transform={`translate(${margin.left},${y(tick)})`} x2={innerSize.width} class="grid-lines" />
      {/each}
      <!-- Labels -->
      <text x={width / 2} y={15} alignment-baseline="hanging" class="chart-title">{title}</text>
      <text x={margin.left + innerSize.width / 2} y={height - labelsOffset} class="ax-label">{xLabel}</text>
      <g transform={`translate(${labelsOffset}, ${margin.top + innerSize.height / 2})`}>
        <text transform="rotate(-90)" class="ax-label" alignment-baseline="hanging">{yLabel}</text>
      </g>
      <!-- Scatter -->
      {#each coords as [x, y]}
        <circle cx={x} cy={y} r={pointsRadius} class="fill-blue-700/50" />
      {/each}
      <!-- <circle cx={mouseX} cy={mouseY} r={10} class="fill-emerald-800/75" /> -->
    {/if}
  </svg>
  {#if found}
    <Highlight x={found[0]} y={found[1]} radius={pointHoverRadius} pointClass="bg-blue-700" />
  {/if}
  <Highlight x={200} y={120} radius={pointHoverRadius} pointClass="bg-blue-700" />
</ChartContainer>

<style>
  :global(.tick-labels) {
    @apply text-sm;
  }

  .grid-lines {
    @apply stroke-black/20 stroke-2;
    stroke-dasharray: 15 12;
  }
  .chart-title {
    @apply text-2xl font-bold;
    text-anchor: middle;
  }

  .ax-label {
    @apply text-xl font-bold;
    text-anchor: middle;
  }
</style>
