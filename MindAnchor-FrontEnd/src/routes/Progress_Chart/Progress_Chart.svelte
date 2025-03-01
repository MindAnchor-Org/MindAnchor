<script lang="ts">
  import { currentPage } from "../../lib/store";

  import { onMount } from "svelte";
  import Chart from "chart.js/auto";

  let chartContainer: any;

  onMount(() => {
    if (chartContainer) {
      new Chart(chartContainer, {
        type: "pie",
        data: {
          labels: ["Red", "Blue", "Yellow"],
          datasets: [
            {
              label: "My Pie Chart",
              data: [30, 40, 30],
              backgroundColor: ["#ff6384", "#36a2eb", "#ffcd56"],
              borderWidth: 1
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false
        }
      });
    }
  });

    function goToScheduleSummaryPage(){
        currentPage.set('ScheduleSummaryPage');
    }
    function goToSettings() {
        currentPage.set('Settings');
    }
    function goToSubscription() {
        currentPage.set('Subscription');
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
  
  .page1-header img {
    display: block;
  }
  .nav-container {
    display:flex;
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

  .icon {
    font-size: 18px;
  }
</style>

<div class="container">
    <div class="page1-header">
        <img src="/icon.png" alt="MindAnchor Logo" width="25px" height="2px">
        <h1>MindAnchor</h1>
    </div>
    <hr>
    <nav class="nav-container">
        <div class="nav-item">
            <button class="icon" on:click={goToScheduleSummaryPage} type="button">
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
    <div style="width: 300px; height: 300px;">
      <canvas bind:this={chartContainer}></canvas>
    </div>
    
    
</div>