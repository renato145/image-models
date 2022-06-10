<script lang="ts">
  import { selectedIdxs } from '../store';
  import type { TData } from '../types';
  export let data: TData[];
</script>

<div>
  {#if $selectedIdxs.length === 0}
    <p>Empty selection</p>
  {:else}
    {#each $selectedIdxs as i}
      <p>{data[i].model}</p>
    {/each}
  {/if}
</div>
