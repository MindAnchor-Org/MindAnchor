<script lang="ts">
  import { currentPage } from "../../lib/store";
  import { onMount } from "svelte";
  import Chart from "chart.js/auto";

  let chartContainer: HTMLCanvasElement;
  let entertainmentPercentage: number = 0;
  let shoppingPercentage: number = 0;
  let socialMediaPercentage: number = 0;

  // Fetch domain durations from chrome storage and update the chart
  onMount(() => {
    chrome.storage.local.get({ domainDurations: {} }, (data) => {
      const domainDurations = data.domainDurations || {};

      // Convert object into an array of [domain, duration] pairs
      const domainArray: [string, number][] = Object.entries(domainDurations) as [string, number][];

      // Sort array in descending order based on duration
      domainArray.sort((a, b) => b[1] - a[1]);

      // Get top 11 domains
      const topDomains = domainArray.slice(0, 11);

      // Extract labels (domain names) and data (durations)
      const domainLabels = topDomains.map(([domain]) => domain);
      const domainData = topDomains.map(([, duration]) => duration);

      // Calculate total duration
      const totalDuration = domainData.reduce((acc, duration) => acc + duration, 0);

      // Category-specific domain lists
      const entertainmentDomains = [
        'netflix.com', 'youtube.com', 'spotify.com', 
        'hulu.com', 'disneyplus.com'
      ];

      const shoppingDomains = [
        'www.amazon.com', 'www.ebay.com', 'www.walmart.com', 
        'www.etsy.com', 'www.bestbuy.com'
      ];

      const socialMediaDomains = [
        'www.facebook.com', 'www.instagram.com', 'www.twitter.com', 
        'www.linkedin.com', 'www.tiktok.com'
      ];

      // Calculate durations for each category
      let entertainmentDuration = 0;
      let shoppingDuration = 0;
      let socialMediaDuration = 0;

      topDomains.forEach(([domain, duration]) => {
        if (entertainmentDomains.includes(domain)) {
          entertainmentDuration += duration;
        } else if (shoppingDomains.includes(domain)) {
          shoppingDuration += duration;
        } else if (socialMediaDomains.includes(domain)) {
          socialMediaDuration += duration;
        }
      });

      // Calculate the percentages
      entertainmentPercentage = (entertainmentDuration / totalDuration) * 100;
      shoppingPercentage = (shoppingDuration / totalDuration) * 100;
      socialMediaPercentage = (socialMediaDuration / totalDuration) * 100;

      // Update the chart
      if (chartContainer) {
        new Chart(chartContainer, {
          type: "pie",
          data: {
            labels: domainLabels,
            datasets: [
              {
                label: "Domain Usage Time",
                data: domainData,
                backgroundColor: [
                  "#87CEEB", "#4169E1", "#000080", "#89CFF0", "#191970", 
                  "#40E0D0", "#4682B4", "#1E90FF", "#007BA7", "#5F9EA0", "#00BFFF"
                ],
                borderWidth: 1
              }
            ]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                position: "bottom"
              }
            }
          }
        });
      }
    });
  });

  // Navigation functions
  function goToBlackList_WhiteListPage() {
      currentPage.set('BlackList_WhiteListPage');
  }
  function goToSettings() {
      currentPage.set('Settings');
  }
  function goToSubscription() {
      currentPage.set('Subscription');
  }

  // Function to update the progress bar
  function updateProgressBar(challengeIndex: number, progress: number): void {
      const progressBar: HTMLElement | null = document.querySelectorAll('.progress-bar-complete')[challengeIndex] as HTMLElement | null;

      if (progressBar) {
          progressBar.style.width = `${progress}%`;
      }
  }

  // Example: Initialize progress for the challenges
  onMount(() => {
    // These can be dynamic values or from the progress data
    updateProgressBar(0, 60); // "1-Hour Focus Sprint"
    updateProgressBar(1, 80); // "Morning Warrior"
    updateProgressBar(2, 50); // "Evening Productivity"
    updateProgressBar(3, 30); // "Distraction Reduction Challenge"
  });
</script>

<style>
  :global(html, body) {
    margin: 0;
    padding: 0;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
    font-family: 'Inria Sans', sans-serif;
  }

  .container {
    width: 984px;
    border: 1px solid #0e0c0c;
    background-color: #fff;
    padding: 20px;
    box-sizing: border-box;
    overflow: hidden;
    font-family: 'Inria Sans', sans-serif;
  }

  .page1-header {
      display: flex;
      height: 25px;
      margin-bottom: 10px;
  }

  .page1-header h1 {
    font-size: 1.5em;
    margin-left: 10;
    margin-right: 400px;
    font-weight: bold;
  }

  .nav-container {
    display: flex;
    justify-content: space-around;
    border-bottom: 2px solid #000080;
    padding: 10px 20px;
  }

  .nav-item {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 10px 15px;
    font-size: 16px;
    font-weight: 600;
    text-decoration: none;
    color: black;
    cursor: pointer;
  }

  .nav-item:hover {
    background-color: #e0e7ff;
  }

  .nav-item-active {
    background-color: #c7d2fe;
    align-items: center;
    gap: 8px;
    padding: 10px 15px;
    font-size: 16px;
    font-weight: 600;
    text-decoration: none;
  }

  h1 {
    font-size: 15px;
    font-weight: bolder;
    text-align: center;
  }

  .chart-container, .summary-container, .game-container {
    margin-left: auto;
    margin-right: auto;
  }

  .chart-container {
    width: 600px;
    height: 300px;
  }

  .summary-container {
    width: 300px;
    height: 300px;
  }

  .game-container {
    width: 600px;
    height: 300px;
  }

  .challenge {
      margin: 15px 0;
  }

  .challenge-title {
      font-weight: bold;
      font-size: 1.2em;
  }

  .challenge-desc {
      font-weight: lighter;
      font-size: 0.9em;
      color: #666;
  }

  .progress-bar-complete {
    width: 100%;
    height: 10px;
    background-color: #2e9221;
    border-radius: 5px;
    overflow: hidden;
  }

  .progress-bar-total {
    width: 100%;
    height: 10px;
    background-color: rgb(151, 151, 151);
    border-radius: 5px;
    overflow: hidden;
    z-index: -1;
  }
</style>

<div class="container">
    <div class="page1-header">
        <img src="/cover.png" alt="MindAnchor Logo" width="25px" height="2px">
        <h1>MindAnchor</h1>
    </div>
    <hr>
    <nav class="nav-container">
        <div class="nav-item">
            <button class="icon" on:click={goToBlackList_WhiteListPage} type="button">
                📅 Schedules
            </button>
        </div>
        <div class="nav-item-active">
            <button class="icon">
              📊 User Progress
            </button>
        </div>    
        <div class="nav-item">
            <button class="icon" on:click={goToSubscription} type="button">
              $ Subscription
            </button>
        </div>
        <div class="nav-item">
            <button class="icon" on:click={goToSettings} type="button">
              ⚙️ Settings
            </button>
        </div>
    </nav>
    <br>
    <div class="chart-container">
        <h1>Top 11 domains you have accessed the most</h1><br>
        <canvas bind:this={chartContainer}></canvas>
    </div>
    <br><br><br>
    <div class="summary-container">
        <h1>Improvements and reductions so far</h1>
        <p>Entertainment: {entertainmentPercentage.toFixed(2)}% of your browsing experience was spent on Entertainment (Netflix, YouTube, Spotify, Hulu, Disney+)</p>
        <p>Shopping: {shoppingPercentage.toFixed(2)}% of your browsing experience was spent on Shopping (Amazon, eBay, Walmart, Etsy, Best Buy)</p>
        <p>Social Media: {socialMediaPercentage.toFixed(2)}% of your browsing experience was spent on Social Media (Facebook, Instagram, Twitter, LinkedIn, TikTok)</p>
    </div>
    <div class="game-container">
        <h1>Daily Missions</h1>          
          <div class="challenge">
            <p class="challenge-title">"1-Hour Focus Sprint"</p>
            <p class="challenge-desc">Avoid distractions for an hour.</p>
            <div class="progress-bar-total">
              <div class="progress-bar-complete"></div>
            </div>
          </div>
        
          <div class="challenge">
            <p class="challenge-title">"Morning Warrior"</p>
            <p class="challenge-desc">No distractions before noon.</p>
            <div class="progress-bar-total">
              <div class="progress-bar-complete"></div>
            </div>
          </div>
        
          <div class="challenge">
            <p class="challenge-title">"Evening Productivity"</p>
            <p class="challenge-desc">Focus before winding down.</p>
            <div class="progress-bar-total">
              <div class="progress-bar-complete"></div>
            </div>
          </div>
        
          <div class="challenge">
            <p class="challenge-title">"Distraction Reduction Challenge"</p>
            <p class="challenge-desc">Take breaks when necessary.</p>
            <div class="progress-bar-total">
              <div class="progress-bar-complete"></div>
            </div>
          </div>
    </div>
</div>
