<script lang="ts">
  import { selectedIdxs } from '../store';

  export let idx: number,
    show: boolean,
    x: number,
    y: number,
    r: number,
    color: string,
    chartLimits: {
      x0: number;
      x1: number;
      y0: number;
      y1: number;
    },
    hoveredR: number,
    searchR: number,
    dialogPadding = 5,
    dialogTitle = '',
    dialogContent: string[] = [];

  $: highlighted = $selectedIdxs.indexOf(idx) !== -1;
  let locked = false;

  function highlight_on() {
    selectedIdxs.update((d) => {
      if (d.indexOf(idx) === -1) {
        d.push(idx);
      }
      return d;
    });
  }

  function highlight_off() {
    if (!locked) {
      selectedIdxs.update((d) => {
        const i = d.indexOf(idx);
        if (i !== -1) {
          d.splice(i, 1);
        }
        return d;
      });
    }
  }

  let dialogWidth = 0,
    dialogHeight = 0,
    dialogXPos = 0,
    dialogYPos = 0;
  $: {
    dialogXPos = Math.min(
      Math.max(chartLimits.x0 + dialogWidth / 2, x + r),
      chartLimits.x1 - dialogWidth / 2
    );
  }
  $: {
    const pad = r * 2 + dialogPadding;
    dialogYPos = y + pad;
    if (dialogYPos + dialogHeight > chartLimits.y1) {
      dialogYPos = y - dialogHeight - pad;
    }
  }
</script>

{#if show}
  <div
    class="absolute z-10 -translate-x-1/2 -translate-y-1/2 rounded-full red"
    style:top={`${y}px`}
    style:left={`${x}px`}
    style:height={`${(highlighted ? hoveredR : r) * 2}px`}
    style:width={`${(highlighted ? hoveredR : r) * 2}px`}
    style:background-color={color}
    style:opacity={highlighted ? 1 : 0.6}
    style:border-color={highlighted ? 'rgb(220, 38, 38)' : 'black'}
    style:border-width={highlighted ? '2px' : '1px'}
  />
  <div
    class="absolute z-30 -translate-x-1/2 -translate-y-1/2 rounded-full"
    style:top={`${y}px`}
    style:left={`${x}px`}
    style:height={`${searchR * 2}px`}
    style:width={`${searchR * 2}px`}
    on:click={() => (locked = !locked)}
    on:mouseenter={() => highlight_on()}
    on:mouseleave={() => highlight_off()}
  />

  {#if highlighted}
    <div
      class="absolute z-20 -translate-x-1/2 rounded bg-white/70 p-2 shadow ring-2 ring-slate-300 backdrop-blur-sm"
      style:top={`${dialogYPos}px`}
      style:left={`${dialogXPos}px`}
      bind:clientWidth={dialogWidth}
      bind:clientHeight={dialogHeight}
    >
      <p class="font-semibold">{dialogTitle}</p>
      {#each dialogContent as s}
        <p class="text-sm">{s}</p>
      {/each}
    </div>
  {/if}
{/if}
