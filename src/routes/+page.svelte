<script lang="ts">
  import { onMount } from 'svelte';

  interface Player {
    name: string;
    elo: number;
  }

  let players: Player[] = [];
  let player1Name = '';
  let player2Name = '';
  let winner: string | null = null;
  let showResult = false;

  function calculateElo(winner: Player, loser: Player) {
    const K = 32; // K-factor for ELO calculation
    const expectedScore = 1 / (1 + Math.pow(10, (loser.elo - winner.elo) / 400));
    const actualScore = 1;
    
    const newWinnerElo = Math.round(winner.elo + K * (actualScore - expectedScore));
    const newLoserElo = Math.round(loser.elo + K * (0 - (1 - expectedScore)));
    
    return { newWinnerElo, newLoserElo };
  }

  function handleMatch() {
    if (!player1Name || !player2Name || !winner) return;

    let player1 = players.find(p => p.name === player1Name);
    let player2 = players.find(p => p.name === player2Name);

    if (!player1) {
      player1 = { name: player1Name, elo: 1000 };
      players = [...players, player1];
    }
    if (!player2) {
      player2 = { name: player2Name, elo: 1000 };
      players = [...players, player2];
    }

    const winnerPlayer = winner === player1Name ? player1 : player2;
    const loserPlayer = winner === player1Name ? player2 : player1;

    const { newWinnerElo, newLoserElo } = calculateElo(winnerPlayer, loserPlayer);

    players = players.map(p => {
      if (p.name === winnerPlayer.name) return { ...p, elo: newWinnerElo };
      if (p.name === loserPlayer.name) return { ...p, elo: newLoserElo };
      return p;
    });

    showResult = true;
    setTimeout(() => {
      showResult = false;
      player1Name = '';
      player2Name = '';
      winner = null;
    }, 3000);
  }
</script>

<div class="container">
  <h1>🍺 Beer Chug Match 🍺</h1>
  
  <div class="match-form">
    <div class="input-group">
      <input 
        type="text" 
        bind:value={player1Name} 
        placeholder="Player 1 Name"
        class="player-input"
      />
      <span class="vs">VS</span>
      <input 
        type="text" 
        bind:value={player2Name} 
        placeholder="Player 2 Name"
        class="player-input"
      />
    </div>

    <div class="winner-select">
      <button 
        class:selected={winner === player1Name}
        on:click={() => winner = player1Name}
        disabled={!player1Name}
      >
        {player1Name || 'Player 1'} Wins
      </button>
      <button 
        class:selected={winner === player2Name}
        on:click={() => winner = player2Name}
        disabled={!player2Name}
      >
        {player2Name || 'Player 2'} Wins
      </button>
    </div>

    <button 
      class="submit-btn" 
      on:click={handleMatch}
      disabled={!player1Name || !player2Name || !winner}
    >
      Record Match
    </button>
  </div>

  {#if showResult}
    <div class="result-animation">
      <span class="beer">🍺</span>
      <span class="beer">🍺</span>
      <span class="beer">🍺</span>
    </div>
  {/if}

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
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-20px); }
  }

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
