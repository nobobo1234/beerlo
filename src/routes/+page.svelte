<script lang="ts">
  import { onMount } from "svelte";
  import PlayerForm from "$lib/components/PlayerForm.svelte";
  import Leaderboard from "$lib/components/Leaderboard.svelte";
  import ResultAnimation from "$lib/components/ResultAnimation.svelte";
  import UserHeader from "$lib/components/UserHeader.svelte";
  import type { Player, User } from "$lib/types";

  export let data;

  let players: Player[] = [];
  let showResult = false;
  let currentUser: Player = data.user;

  function handleMatchRecorded(event: CustomEvent) {
    players = event.detail.players;
    showResult = true;

    // Update current user with new ELO
    currentUser = event.detail.updatedCurrentUser;

    setTimeout(() => {
      showResult = false;
    }, 3000);
  }
</script>

<div class="container">
  <h1>🍺 Beer Chug Match 🍺</h1>

  <UserHeader user={currentUser} />

  <PlayerForm {players} {currentUser} on:matchRecorded={handleMatchRecorded} />

  <ResultAnimation visible={showResult} />

  <Leaderboard {players} />
</div>

<style>
  .container {
    max-width: 800px;
    margin: 0 auto;
    padding: 2rem;
    text-align: center;
  }

  h1 {
    color: #ff6b6b;
    font-size: 2.5rem;
    margin-bottom: 2rem;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
  }
</style>
