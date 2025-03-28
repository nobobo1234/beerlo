<script lang="ts">
  export let visible = false;
</script>

{#if visible}
  <div class="result-animation">
    <span class="beer">🍺</span>
    <span class="beer">🍺</span>
    <span class="beer">🍺</span>
  </div>
{/if}

<style>
  .result-animation {
    margin: 2rem 0;
  }

  .beer {
    font-size: 2rem;
    margin: 0 0.5rem;
    animation: bounce 0.5s infinite;
  }

  .beer:nth-child(2) {
    animation-delay: 0.1s;
  }

  .beer:nth-child(3) {
    animation-delay: 0.2s;
  }

  @keyframes bounce {
    0%,
    100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-20px);
    }
  }
</style>
