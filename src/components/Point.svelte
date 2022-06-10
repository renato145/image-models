<script lang="ts">
  export let x: number,
    y: number,
    r: number,
    hoverR: number,
    dialogPadding = 5,
    dialogTitle = '',
    dialogContent: string[] = [];
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
    class="absolute -translate-x-1/2 bg-white/70 ring-2 ring-slate-300 rounded shadow p-2 z-10 backdrop-blur-sm"
    style:top={`${y + dialogYPosition}px`}
    style:left={`${x + r}px`}
  >
    <p class="font-semibold">{dialogTitle}</p>
    {#each dialogContent as s}
      <p class="text-sm">{s}</p>
    {/each}
  </div>
{/if}
