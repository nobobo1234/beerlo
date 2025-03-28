<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import type { Player } from "$lib/types";

  const dispatch = createEventDispatcher();

  export let players: Player[] = [];
  export let currentUser: Player;

  let player1Name = currentUser.name;
  let player2Name = "";
  let winner: string | null = null;

  function calculateElo(winner: Player, loser: Player) {
    const K = 32; // K-factor for ELO calculation
    const expectedScore =
      1 / (1 + Math.pow(10, (loser.elo - winner.elo) / 400));
    const actualScore = 1;

    const newWinnerElo = Math.round(
      winner.elo + K * (actualScore - expectedScore)
    );
    const newLoserElo = Math.round(loser.elo + K * (0 - (1 - expectedScore)));

    return { newWinnerElo, newLoserElo };
  }

  function handleMatch() {
    if (!player2Name || !winner) return;

    // Player 1 is always the current user
    let player1 = currentUser;
    let player2 = players.find((p) => p.name === player2Name);

    if (!player2) {
      player2 = { name: player2Name, elo: 1000 };
      players = [...players, player2];
    }

    const winnerPlayer = winner === player1.name ? player1 : player2;
    const loserPlayer = winner === player1.name ? player2 : player1;

    const { newWinnerElo, newLoserElo } = calculateElo(
      winnerPlayer,
      loserPlayer
    );

    const updatedPlayers = players.map((p) => {
      if (p.name === winnerPlayer.name) return { ...p, elo: newWinnerElo };
      if (p.name === loserPlayer.name) return { ...p, elo: newLoserElo };
      return p;
    });

    // Update current user's ELO if they were involved in the match
    const updatedCurrentUser = {
      ...currentUser,
      elo: currentUser.name === winnerPlayer.name ? newWinnerElo : newLoserElo,
    };

    dispatch("matchRecorded", {
      players: updatedPlayers,
      winner: winnerPlayer.name,
      updatedCurrentUser,
    });

    // Reset form (just player 2, player 1 is fixed as current user)
    setTimeout(() => {
      player2Name = "";
      winner = null;
    }, 3000);
  }
</script>

<div class="match-form">
  <div class="input-group">
    <div class="player-input current-player">
      <span class="player-label">You</span>
      <span class="player-name"
        >{currentUser.name} (ELO: {currentUser.elo})</span
      >
    </div>
    <span class="vs">VS</span>
    <input
      type="text"
      bind:value={player2Name}
      placeholder="Opponent Name"
      class="player-input"
    />
  </div>

  <div class="winner-select">
    <button
      class:selected={winner === currentUser.name}
      on:click={() => (winner = currentUser.name)}
    >
      You Win
    </button>
    <button
      class:selected={winner === player2Name}
      on:click={() => (winner = player2Name)}
      disabled={!player2Name}
    >
      {player2Name || "Opponent"} Wins
    </button>
  </div>

  <button
    class="submit-btn"
    on:click={handleMatch}
    disabled={!player2Name || !winner}
  >
    Record Match
  </button>
</div>

<style>
  .match-form {
    background: #fff;
    padding: 2rem;
    border-radius: 1rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    margin-bottom: 2rem;
  }

  .input-group {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 1.5rem;
  }

  .player-input {
    flex: 1;
    padding: 0.8rem;
    border: 2px solid #ddd;
    border-radius: 0.5rem;
    font-size: 1rem;
  }

  .current-player {
    display: flex;
    flex-direction: column;
    gap: 0.3rem;
    background-color: #f9f9f9;
  }

  .player-label {
    font-size: 0.8rem;
    color: #777;
    text-align: left;
  }

  .player-name {
    font-weight: bold;
    color: #333;
    text-align: left;
  }

  .vs {
    font-weight: bold;
    color: #ff6b6b;
    font-size: 1.2rem;
  }

  .winner-select {
    display: flex;
    gap: 1rem;
    margin-bottom: 1.5rem;
  }

  button {
    padding: 0.8rem 1.5rem;
    border: none;
    border-radius: 0.5rem;
    font-size: 1rem;
    cursor: pointer;
    transition: all 0.3s ease;
    background: #f8f9fa;
    color: #495057;
  }

  button:hover:not(:disabled) {
    background: #e9ecef;
  }

  button.selected {
    background: #ff6b6b;
    color: white;
  }

  button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .submit-btn {
    background: #4ecdc4;
    color: white;
    font-weight: bold;
    padding: 1rem 2rem;
  }

  .submit-btn:hover:not(:disabled) {
    background: #45b7ae;
  }
</style>
