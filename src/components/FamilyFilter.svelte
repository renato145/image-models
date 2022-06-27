<script lang="ts">
  import type { ScaleOrdinal } from 'd3';
  import { selectedFamilies } from '../store';

  export let allFamilies: string[], colorScale: ScaleOrdinal<string, string>;

  $: data = allFamilies.map((d) => ({
    family: d,
    selected: $selectedFamilies.indexOf(d) !== -1,
    color: colorScale(d)
  }));

  function toogle(family: string) {
    selectedFamilies.update((d) => {
      const i = d.indexOf(family);
      if (i === -1) {
        d.push(family);
      } else {
        d.splice(i, 1);
      }
      return d;
    });
  }
</script>

<div class="flex flex-wrap gap-2">
  {#each data as d}
    <button
      class="btn text-gray-800 font-semibold p-2"
      style:background-color={d.selected ? d.color : '#ddd'}
      on:click={() => toogle(d.family)}
    >
      {d.family}
    </button>
  {/each}
</div>
