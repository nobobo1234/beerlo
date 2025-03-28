<script lang="ts">
  import type { Player } from "$lib/types";
  import type { PageProps } from "./$types";
  import { onMount } from "svelte";

  // Get all players from the database
  let allPlayers: Player[] = $state([]);

  let isLoading = $state(true);
  let error: string | null = $state("");
  const { data }: PageProps = $props();

  onMount(async () => {
    try {
      const response = await fetch("/api/players");
      if (!response.ok) {
        throw new Error("Failed to fetch players");
      }
      allPlayers = await response.json();

      // Filter out the current user from the list of players
      allPlayers = allPlayers.filter((player) => player.id !== data.user.id);

      isLoading = false;
    } catch (err) {
      console.error("Error fetching players:", err);
      error = "Could not load players. Please try again later.";
      isLoading = false;
    }
  });
</script>

<div class="friends-page">
  <h1>Vrienden</h1>
  <ul>Je hebt nog geen vrienden.</ul>

  <h2>Voeg vrienden toe</h2>
  <form method="POST" action="?/addFriend">
    <select name="friendId">
      {#each allPlayers as player}
        <option value={player.name}>{player.name}</option>
      {/each}
    </select>
    <button type="submit">Voeg vriend toe</button>
    <p class="error">{error}</p>
  </form>
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
