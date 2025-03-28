<script lang="ts">
  import type { User } from "$lib/types";
  export let user: User;
</script>

<div class="header">
  <div class="user-section">
    <span class="user-name">Welcome, {user.name}! (ELO: {user.elo})</span>
    <form method="POST" action="/logout">
      <button type="submit" class="sign-out-btn">Sign Out</button>
    </form>
  </div>
</div>

<style>
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
  }

  .user-section {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .user-name {
    color: #495057;
    font-size: 1.1rem;
  }

  .sign-out-btn {
    padding: 0.8rem 1.5rem;
    background: #ff6b6b;
    color: white;
    border-radius: 0.5rem;
    text-decoration: none;
    font-size: 1rem;
    transition: all 0.3s ease;
    border: none;
    cursor: pointer;
  }

  .sign-out-btn:hover {
    background: #ff5252;
  }
</style>
