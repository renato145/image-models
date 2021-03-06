<script lang="ts">
  import { select, scaleLinear, extent, axisBottom, axisLeft, zoom, zoomIdentity } from 'd3';
  import type { ZoomTransform, ScaleOrdinal } from 'd3';
  import type { TData } from 'src/types';
  import ChartContainer from './ChartContainer.svelte';
  import Point from './Point.svelte';

  export let data: TData[],
    xValue: (d: TData) => number,
    yValue: (d: TData) => number,
    colorValue: (d: TData) => string,
    colorScale: ScaleOrdinal<string, string>,
    dataTitle: (d: TData) => string,
    dataContent: (d: TData) => string[],
    margin: { top: number; right: number; left: number; bottom: number },
    pointsRadius = 10,
    pointHoverRadius = 20,
    title = 'Title',
    xLabel = 'X label',
    yLabel = 'Y label',
    height = 400,
    xOffset = 0,
    yOffset = 0,
    labelsOffset = 12;
  const nTicksY = 5;
  let width,
    svgRectNode,
    xAxisNode,
    yAxisNode,
    tfm = zoomIdentity;

  $: innerSize = {
    width: width - margin.left - margin.right,
    height: height - margin.top - margin.bottom
  };
  $: chartLimits = {
    x0: margin.left,
    x1: width - margin.right,
    y0: margin.top,
    y1: height - margin.bottom
  };

  $: xExtent = extent(data, xValue);
  $: x = tfm.rescaleX(
    scaleLinear()
      .domain([xExtent[0] - xOffset, xExtent[1] + xOffset])
      .range([chartLimits.x0, chartLimits.x1])
  );

  $: xAxis = axisBottom(x);
  $: select(xAxisNode).call(xAxis).selectAll('text').attr('class', 'tick-labels');

  $: yExtent = extent(data, yValue);
  $: y = tfm.rescaleY(
    scaleLinear()
      .domain([yExtent[0] - yOffset, yExtent[1] + yOffset])
      .range([chartLimits.y1, chartLimits.y0])
  );
  $: yAxis = axisLeft(y).ticks(nTicksY);
  $: select(yAxisNode).call(yAxis).selectAll('text').attr('class', 'tick-labels');

  $: pointsData = data.map((row) => {
    const x_ = x(xValue(row));
    const y_ = y(yValue(row));
    const show =
      x_ >= chartLimits.x0 && x_ <= chartLimits.x1 && y_ >= chartLimits.y0 && y_ <= chartLimits.y1;
    return {
      idx: row.idx,
      x: x_,
      y: y_,
      show,
      color: colorScale(colorValue(row)),
      dialogTitle: dataTitle(row),
      dialogContent: dataContent(row)
    };
  });

  // Zoom
  function zoomed({ transform }: { transform: ZoomTransform }) {
    tfm = transform;
  }
  const zoomPad = 200;
  $: zoomFn = zoom()
    .translateExtent([
      [-zoomPad, -zoomPad],
      [width + zoomPad, height + zoomPad]
    ])
    .scaleExtent([0.5, 20])
    .on('zoom', zoomed);
  $: select(svgRectNode).call(zoomFn);

  function resetZoom() {
    select(svgRectNode).transition().duration(750).call(zoomFn.transform, zoomIdentity);
  }
</script>

<div class="flex flex-col">
  <ChartContainer class="rounded-lg bg-gray-300" bind:width>
    <svg {width} {height}>
      {#if width && height}
        <!-- Axes -->
        <rect
          x={margin.left}
          y={margin.top}
          width={innerSize.width}
          height={innerSize.height}
          class="fill-white"
          bind:this={svgRectNode}
        />
        <g bind:this={xAxisNode} transform={`translate(0,${height - margin.bottom})`} />
        <g bind:this={yAxisNode} transform={`translate(${margin.left},0)`} />
        <!-- Grid -->
        {#each x.ticks() as tick}
          <line
            transform={`translate(${x(tick)},${margin.top})`}
            y2={innerSize.height}
            class="grid-lines"
          />
        {/each}
        {#each y.ticks(nTicksY) as tick}
          <line
            transform={`translate(${margin.left},${y(tick)})`}
            x2={innerSize.width}
            class="grid-lines"
          />
        {/each}
        <!-- Labels -->
        <text x={width / 2} y={15} dominant-baseline="hanging" class="chart-title">{title}</text>
        <text x={margin.left + innerSize.width / 2} y={height - labelsOffset} class="ax-label"
          >{xLabel}</text
        >
        <g transform={`translate(${labelsOffset}, ${margin.top + innerSize.height / 2})`}>
          <text transform="rotate(-90)" class="ax-label" dominant-baseline="hanging">{yLabel}</text>
        </g>
      {/if}
    </svg>
    <!-- Scatter -->
    {#each pointsData as d}
      <Point
        {...d}
        {chartLimits}
        r={pointsRadius}
        hoveredR={pointHoverRadius}
        searchR={pointHoverRadius}
      />
    {/each}
  </ChartContainer>
  <button class="btn mr-2 mt-1 self-end" on:click={resetZoom}>reset zoom</button>
</div>

<style>
  :global(.tick-labels) {
    @apply text-sm;
  }

  .grid-lines {
    @apply stroke-black/20 stroke-1;
    stroke-dasharray: 8 4;
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
