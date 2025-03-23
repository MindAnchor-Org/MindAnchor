<script lang="ts">
  import { currentPage } from "../../lib/store";
  import { onMount } from "svelte";
  import Chart from "chart.js/auto";

  let chartContainer: HTMLCanvasElement;
  let entertainmentPercentage: number = 0;
  let shoppingPercentage: number = 0;
  let socialMediaPercentage: number = 0;

  // NO-SOCIAL-MEDIA STREAK VARIABLES
  let lastSocialMediaVisit: string = "Unknown"; // Last distracted date & time
  let elapsedDays: number = 0; // Days since last distraction
  let elapsedHours: number = 0; // Hours since last distraction
  let progress: number = 0; // Progress bar percentage

  onMount(() => {
    chrome.storage.local.get({ domainDurations: {}, lastSocialMediaVisit: null }, (data) => {
      const domainDurations = data.domainDurations || {};
      const lastVisitTimestamp = data.lastSocialMediaVisit;

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
      const entertainmentDomains = ["netflix.com", "youtube.com", "spotify.com", "hulu.com", "disneyplus.com"];
      const shoppingDomains = ["amazon.com", "ebay.com", "walmart.com", "etsy.com", "bestbuy.com"];
      const socialMediaDomains = ["facebook.com", "instagram.com", "twitter.com", "linkedin.com", "tiktok.com"];

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
          // Update last social media visit timestamp only if social media was visited
          chrome.storage.local.set({ lastSocialMediaVisit: Date.now() });
        }
      });

      // Calculate the percentages
      entertainmentPercentage = (entertainmentDuration / totalDuration) * 100;
      shoppingPercentage = (shoppingDuration / totalDuration) * 100;
      socialMediaPercentage = (socialMediaDuration / totalDuration) * 100;

      // Handle NaN cases
      if (isNaN(entertainmentPercentage)) entertainmentPercentage = 0;
      if (isNaN(shoppingPercentage)) shoppingPercentage = 0;
      if (isNaN(socialMediaPercentage)) socialMediaPercentage = 0;

      // NO-SOCIAL-MEDIA STREAK LOGIC
      if (lastVisitTimestamp) {
        const now = new Date();
        const lastVisitDate = new Date(lastVisitTimestamp);

        // Store original timestamp for display
        lastSocialMediaVisit = lastVisitDate.toLocaleString(); // ✅ Keeps actual time

        // Calculate elapsed days
        const nowMidnight = new Date(now);
        nowMidnight.setHours(0, 0, 0, 0);

        const lastVisitMidnight = new Date(lastVisitDate);
        lastVisitMidnight.setHours(0, 0, 0, 0);

        elapsedDays = Math.floor((nowMidnight.getTime() - lastVisitMidnight.getTime()) / (1000 * 60 * 60 * 24));

        // Calculate elapsed hours
        elapsedHours = Math.floor((now.getTime() - lastVisitDate.getTime()) / (1000 * 60 * 60));

        // Calculate progress bar percentage
        progress = (elapsedHours / 24) * 100;
      }

      // Update the progress bar dynamically
      updateProgressBar(progress);

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

  // Function to update the progress bar
  function updateProgressBar(progress: number): void {
    const progressBar: HTMLElement | null = document.querySelector(".progress-bar-complete");

    if (progressBar) {
      progressBar.style.width = `${progress}%`;
    }
  }

  // Navigation functions
  function goToBlackList_WhiteListPage() {
    currentPage.set("BlackList_WhiteListPage");
  }
  function goToSettings() {
    currentPage.set("Settings");
  }
  function goToSubscription() {
    currentPage.set("Subscription");
  }
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
    font-size: 17px;
    font-weight: bold;
    text-align: center;
  }

  .chart-container, .statements-container, .game-container {
    margin-left: auto;
    margin-right: auto;
  }

  .chart-container {
    width: 600px;
    height: 200px;
  }

  .statements-container, .game-container {
    line-height: 30px;
    width: 600px;
    ul li {
      font-size: 14px;
      text-align: justify;
      list-style: square;
    }
  }

  .statements-container {
    height: 200px;
    
  }

  .game-container {
    margin-bottom: 15px;
    
  }

  .progress-bar-complete {
    width: 100%;
    height: 5px;
    background-color: #40ca2d;
    border-radius: 5px;
    overflow: hidden;
  }

  .progress-bar-total {
    width: 100%;
    height: 5px;
    background-color: rgb(151, 151, 151);
    border-radius: 5px;
    overflow: hidden;
    z-index: -1;
  }

  .green, .red {
    font-weight: bolder;
  }

  .green {
    color: #108a00;
  }

  .red {
    color: #990000;
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
    <br><br><br><br>
    <div class="statements-container">
        <h1>How long have you browsed these popular website categories?</h1>
      <ul>
        <li>Entertainment: {entertainmentPercentage.toFixed(2)}% of your browsing experience was spent on Entertainment (Netflix, YouTube, Spotify, Hulu, Disney+)</li>
        <li>Shopping: {shoppingPercentage.toFixed(2)}% of your browsing experience was spent on Shopping (Amazon, eBay, Walmart, Etsy, Best Buy)</li>
        <li>Social Media: {socialMediaPercentage.toFixed(2)}% of your browsing experience was spent on Social Media (Facebook, Instagram, Twitter, LinkedIn, TikTok)</li>
      </ul>
    </div>
    <br><br>
    <div class="game-container">
      <h1>Challenge for you: NO-SOCIAL-MEDIA STREAK!</h1>
      <ul>
        <li>You were last distracted by social media on <span class="red">{lastSocialMediaVisit}</span>.</li>
        <li>Since then, you have successfully avoided social media for <span class="green">{elapsedDays} days</span>.</li>
        <li>Add +1 day to your streak by avoiding social media for <span class="green">{elapsedHours} hours</span>.</li>
      </ul>
      <div class="progress-bar-total">
        <div class="progress-bar-complete"></div>
      </div>  
    </div>     
</div>
