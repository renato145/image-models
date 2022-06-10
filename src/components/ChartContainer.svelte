<script lang="ts">
  export let width = 0,
    height = 0;
  let mouseX, mouseY;

  // check d3 way https://github.com/d3/d3-selection/blob/main/src/pointer.js
  function handleMouseMove(e: MouseEvent) {
    mouseX = e['layerX'];
    mouseY = e['layerY'];
  }
</script>

<div bind:clientWidth={width} bind:clientHeight={height} on:mousemove={handleMouseMove}>
  <slot {mouseX} {mouseY} />
</div>
