<script lang="ts">
  import { quadtree } from 'd3';

  export let width = 0,
    height = 0,
    searchRange: number,
    coords: [number, number][];
  let mouseX: number, mouseY: number, found: [number, number];

  $: finder = quadtree()
    .extent([
      [-1, -1],
      [width + 1, height + 1]
    ])
    .addAll(coords);

  // check d3 way https://github.com/d3/d3-selection/blob/main/src/pointer.js
  function handleMouseMove(e: MouseEvent) {
    mouseX = e['layerX'];
    mouseY = e['layerY'];
    found = finder.find(mouseX, mouseY, searchRange);
  }
</script>

<div bind:clientWidth={width} bind:clientHeight={height} on:mousemove={handleMouseMove}>
  <slot {mouseX} {mouseY} {found} />
</div>
