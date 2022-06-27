<script lang="ts">
  import { selectedIdxs } from '../store';
  import type { TData } from '../types';
  export let data: TData[];

  function resetHighlights(e: KeyboardEvent) {
    if (e.code === 'Escape') {
      selectedIdxs.set([]);
    }
  }
</script>

<svelte:window on:keydown={resetHighlights} />

<div>
  {#if $selectedIdxs.length === 0}
    <p>Empty selection</p>
  {:else}
    {#each $selectedIdxs as i}
      <p>{data[i].model_name}</p>
    {/each}
  {/if}
</div>
