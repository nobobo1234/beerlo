<script lang="ts">
  import type { LayoutProps } from "./$types";
  import UserHeader from "$lib/components/UserHeader.svelte";
  import "../app.css";

  const { data, children }: LayoutProps = $props();
</script>

{#if data.user}
  <UserHeader user={data.user} />
{/if}
<div class="container">
  {@render children()}
</div>

<style lang="scss">
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
