<script lang="ts">
  import type { Player } from "$lib/types";
  export let players: Player[] = [];
  import { onMount } from "svelte";

  // Get all players from the database
  let allPlayers: Player[] = [];
  let isLoading = true;
  let error: string | null = null;

  onMount(async () => {
    try {
      const response = await fetch("/api/players");
      if (!response.ok) {
        throw new Error("Failed to fetch players");
      }
      allPlayers = await response.json();
      isLoading = false;
    } catch (err) {
      console.error("Error fetching players:", err);
      error = "Could not load players. Please try again later.";
      isLoading = false;
    }
  });
</script>

<div class="friends-page">
  <h1>Friends</h1>
  <ul>
    {#each players as player}
      <li>{player.name}</li>
    {/each}
  </ul>

  <div class="all-players">
    {#if isLoading}
      <p>Loading players...</p>
    {:else if error}
      <p class="error">{error}</p>
    {:else}
      {#each allPlayers as player}
        <div class="player-card">
          <h2>{player.name}</h2>
          <p>ELO: {player.elo}</p>
        </div>
      {/each}
    {/if}
  </div>
</div>

<style>
  .friends-page {
    padding: 20px;
  }

  .error {
    color: red;
  }

  .player-card {
    border: 1px solid #ddd;
    padding: 10px;
    margin: 10px 0;
    border-radius: 4px;
  }
</style>
