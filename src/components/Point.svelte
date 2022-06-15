<script lang="ts">
  import { selectedIdxs } from '../store';

  export let idx: number,
    show: boolean,
    x: number,
    y: number,
    r: number,
    hoveredR: number,
    searchR: number,
    dialogPadding = 5,
    dialogTitle = '',
    dialogContent: string[] = [];
  $: dialogYPosition = r * 2 + dialogPadding;
  $: locked = $selectedIdxs.indexOf(idx) !== -1;
  let highlight = false;

  function toogleLocked() {
    selectedIdxs.update((d) => {
      const i = d.indexOf(idx);
      if (i === -1) {
        d.push(idx);
      } else {
        d.splice(i, 1);
      }
      return d;
    });
  }
</script>

{#if show}
  <div
    class="absolute -translate-x-1/2 -translate-y-1/2 rounded-full border-red-700 bg-blue-700"
    style:top={`${y}px`}
    style:left={`${x}px`}
    style:height={`${(locked || highlight ? hoveredR : r) * 2}px`}
    style:width={`${(locked || highlight ? hoveredR : r) * 2}px`}
    style:opacity={locked || highlight ? 1 : 0.5}
    style:border-width={locked ? '2px' : '0px'}
  />
  <div
    class="absolute -translate-x-1/2 -translate-y-1/2 rounded-full"
    style:top={`${y}px`}
    style:left={`${x}px`}
    style:height={`${searchR * 2}px`}
    style:width={`${searchR * 2}px`}
    on:click={() => toogleLocked()}
    on:mouseenter={() => (highlight = true)}
    on:mouseleave={() => (highlight = false)}
  />

  {#if locked || highlight}
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
{/if}
