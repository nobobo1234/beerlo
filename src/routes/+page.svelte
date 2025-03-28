<script lang="ts">
  import PlayerForm from "$lib/components/PlayerForm.svelte";
  import Leaderboard from "$lib/components/Leaderboard.svelte";
  import ResultAnimation from "$lib/components/ResultAnimation.svelte";
  import type { Player } from "$lib/types";

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

<h1>Welkom bij Bierlo</h1>

<PlayerForm {players} {currentUser} on:matchRecorded={handleMatchRecorded} />

<ResultAnimation visible={showResult} />

<Leaderboard {players} />

<style>
</style>
