<script>
    import { onMount } from 'svelte';

    let countdown = 10;

    onMount(() => {
        const timer = setInterval(() => {
            if (countdown > 0) {
                countdown -= 1;
            } else {
                clearInterval(timer);
                // Redirect to dashboard or next page
                window.location.href = '/dashboard'; // Update the URL as needed
            }
        }, 1000);

        return () => clearInterval(timer);
    });

    function handleExperienceNow() {
        // Redirect to dashboard or next page
        window.location.href = '/dashboard'; // Update the URL as needed
    }
</script>

<style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f4f4f4;
      margin: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100vh;
    }
  
    .container {
      text-align: center;
      background: white;
      border-radius: 10px;
      padding: 20px;
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
      width: 400px;
    }
  
    .button {
      background-color: #007bff;
      color: white;
      padding: 10px 20px;
      border: none;
      border-radius: 5px;
      font-size: 16px;
      cursor: pointer;
    }
  
    .button:hover {
      background-color: #0056b3;
    }
  </style>

<div class="container">
    <h1>Welcome to MindAnchor!</h1>
    <p>
      Hi! Thank you for installing MindAnchor. <br />
      You will be directed to the dashboard in {countdown} seconds, or you can
      experience MindAnchor now with the button below. :D
    </p>
    <button class="button" on:click="{() => (window.location.href = '/dashboard.html')}">
      Experience MindAnchor Now!
    </button>
  </div>