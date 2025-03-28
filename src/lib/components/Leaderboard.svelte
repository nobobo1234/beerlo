<script lang="ts">
  import type { Player } from "$lib/types";
  export let players: Player[] = [];
</script>

{#if players.length > 0}
  <div class="leaderboard">
    <h2>🏆 Leaderboard 🏆</h2>
    <div class="player-list">
      {#each [...players].sort((a, b) => b.elo - a.elo) as player, i}
        <div class="player-card">
          <span class="rank">#{i + 1}</span>
          <span class="name">{player.name}</span>
          <span class="elo">ELO: {player.elo}</span>
        </div>
      {/each}
    </div>
  </div>
{/if}

<style>
  .leaderboard {
    background: #fff;
    padding: 2rem;
    border-radius: 1rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }

  h2 {
    color: #ff6b6b;
    margin-bottom: 1.5rem;
  }

  .player-list {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .player-card {
    display: flex;
    align-items: center;
    padding: 1rem;
    background: #f8f9fa;
    border-radius: 0.5rem;
    gap: 1rem;
  }

  .rank {
    font-weight: bold;
    color: #ff6b6b;
  }

  .name {
    flex: 1;
    text-align: left;
  }

  .elo {
    color: #495057;
  }
</style>
