<script lang="ts">
  // Add any login-related logic here if needed
</script>

<div class="container">
  <h1>🍺 Welcome to Beerlo 🍺</h1>

  <div class="login-form">
    <h2>Sign In</h2>
    <a href="/login/google" class="google-btn">
      <img
        src="https://www.google.com/favicon.ico"
        alt="Google"
        class="google-icon"
      />
      Login with Google
    </a>
  </div>
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

  .login-form {
    background: #fff;
    padding: 2rem;
    border-radius: 1rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    margin-bottom: 2rem;
  }

  h2 {
    color: #ff6b6b;
    margin-bottom: 1.5rem;
  }

  .google-btn {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.8rem 1.5rem;
    background: #fff;
    border: 2px solid #ddd;
    border-radius: 0.5rem;
    font-size: 1rem;
    color: #495057;
    text-decoration: none;
    transition: all 0.3s ease;
  }

  .google-btn:hover {
    background: #f8f9fa;
    border-color: #ff6b6b;
  }

  .google-icon {
    width: 20px;
    height: 20px;
  }
</style>
