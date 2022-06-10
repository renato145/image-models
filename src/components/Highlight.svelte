<script lang="ts">
  export let radius: number,
    position: [number, number] | undefined,
    pointClass = '',
    dialogPadding = 5;
  $: dialogYPosition = radius * 2 + dialogPadding;
  let show = false,
    locked = false,
    x: number,
    y: number;

  $: {
    if (!locked) {
      show = position !== undefined;
      if (show) {
        x = position[0];
        y = position[1];
      }
    }
  }
</script>

{#if show}
  <div
    class={`absolute -translate-x-1/2 -translate-y-1/2 rounded-full ${pointClass}`}
    style:top={`${y}px`}
    style:left={`${x}px`}
    style:height={`${radius * 2}px`}
    style:width={`${radius * 2}px`}
    on:click={() => (locked = !locked)}
  >
    <div
      class="absolute -translate-x-1/2 bg-green-400 p-2"
      style:top={`${dialogYPosition}px`}
      style:left={`${radius}px`}
    >
      <p>outside</p>
      <p>({x.toFixed()},{y.toFixed()}) ({x.toFixed()},{y.toFixed()}) {locked}</p>
    </div>
  </div>
{/if}
