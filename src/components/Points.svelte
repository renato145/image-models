<script lang="ts">
  export let cx: number,
    cy: number,
    r = 18;
</script>

<circle {cx} {cy} {r} class="points" />

<style>
  .points {
    @apply fill-blue-800/50 hover:fill-red-500;
  }
</style>
