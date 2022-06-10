<script lang="ts">
  export let x: number,
    y: number,
    r: number,
    hoverR: number,
    hoverPoint: [number, number],
    dialogPadding = 5,
    dialogTitle = '',
    dialogContent: string[] = [];
  $: dialogYPosition = r * 2 + dialogPadding;
  $: hovered = hoverPoint !== undefined && hoverPoint[0] === x && hoverPoint[1] === y;
  $: highlight = locked || hovered;
  let locked = false;
  // on:mouseenter={() => (highlight = true)} on:mouseleave={() => (highlight = locked || false)}
</script>

<div
  class="absolute -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-700"
  style:top={`${y}px`}
  style:left={`${x}px`}
  style:height={`${(highlight ? hoverR : r) * 2}px`}
  style:width={`${(highlight ? hoverR : r) * 2}px`}
  style:opacity={highlight ? 1 : 0.5}
  on:click={() => (locked = !locked)}
/>

{#if highlight}
  <div
    class="absolute z-10 -translate-x-1/2 rounded bg-white/70 p-2 shadow ring-2 ring-slate-300 backdrop-blur-sm"
    style:top={`${y + dialogYPosition}px`}
    style:left={`${x + r}px`}
  >
    <p class="font-semibold">{dialogTitle}</p>
    {#each dialogContent as s}
      <p class="text-sm">{s}</p>
    {/each}
  </div>
{/if}
