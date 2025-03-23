<script>
  import { onMount } from 'svelte';
  import { currentPage } from '../../lib/store';
  
  let countdown = 10;

  onMount(() => {
      const timer = setInterval(() => {
          if (countdown > 0) {
              countdown -= 1;
          } else {
              clearInterval(timer);
              // Redirect to dashboard or next page
              currentPage.set('BlackList_WhiteListPage'); // Update the URL to the next page
          }
      }, 1000);

      return () => clearInterval(timer);
  });

  function handleExperienceNow() {
      // Redirect to dashboard or next page
      currentPage.set('BlackList_WhiteListPage'); // Update the URL as needed
  }
</script>

<style>
  :global(html, body) {
      margin: 0;
      padding: 0;
      overflow: hidden; /* Prevent scrolling */
      display: flex;
      justify-content: center;
      align-items: center;
      box-sizing: border-box;
      font-family: 'Inria Sans', sans-serif;
  }

  .welcome-container {
      width: 984px;
      border: 1px solid #ccc;
      background-color: #fff;
      padding: 20px;
      box-sizing: border-box;
      overflow: hidden; /* Prevent internal scrolling */
      font-family: 'Inria Sans', sans-serif;
      text-align: center;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
  }

  .welcome-title {
      font-size: 2em;
      font-weight: bold;
      margin: 0 0 10px;
  }

  .welcome-logo {
      width: 200px; /* Adjust size as needed */
      height: auto;
      margin-top: 10px;
      margin-bottom: 20px;
  }

  p {
      font-size: 1.2em;
      margin-bottom: 10px;
      color: #333;
  }

  button {
      padding: 10px 15px;
      font-size: 1em;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      background-color: rgb(1, 1, 124);
      color: white;
  }

  button:hover {
      background-color: #000080; /* Slightly darker blue */
  }

  .page1-header {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
  }

  .page1-header h1 {
      font-size: 1.5em;
      font-weight: bold;
  }
</style>

<div class="welcome-container">
  <div class="page1-header">
      <h1>MindAnchor</h1>
  </div>
  
  <h1 class="welcome-title">Thank you for installing MindAnchor</h1>
    <img class="welcome-logo" src="/hello_palm.png" alt="MindAnchor Logo" />

  <p>You will be directed to the dashboard in {countdown} seconds</p>
  <p>or you can experience MindAnchor now with the below button.</p>
  <button on:click={handleExperienceNow}>Experience MindAnchor Now!</button>
</div>
