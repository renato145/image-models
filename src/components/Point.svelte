<script lang="ts">
  export let x: number,
    y: number,
    r: number,
    hoverR: number,
    dialogPadding = 5;
  $: dialogYPosition = r * 2 + dialogPadding;
  let highlight = false,
    locked = false;
</script>

<div
  class="absolute -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-700"
  style:top={`${y}px`}
  style:left={`${x}px`}
  style:height={`${(highlight ? hoverR : r) * 2}px`}
  style:width={`${(highlight ? hoverR : r) * 2}px`}
  style:opacity={highlight ? 1 : 0.5}
  on:click={() => (locked = !locked)}
  on:mouseenter={() => (highlight = true)}
  on:mouseleave={() => (highlight = locked || false)}
/>

{#if highlight}
  <div
    class="absolute -translate-x-1/2 bg-green-400 p-2"
    style:top={`${y + dialogYPosition}px`}
    style:left={`${x + r}px`}
  >
    <p>outside</p>
    <p>({x.toFixed()},{y.toFixed()}) ({x.toFixed()},{y.toFixed()}) {locked}</p>
  </div>
{/if}
