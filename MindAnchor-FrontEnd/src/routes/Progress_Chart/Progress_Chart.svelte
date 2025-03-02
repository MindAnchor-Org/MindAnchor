<script lang="ts">
  import { currentPage } from "../../lib/store";

  import { onMount } from "svelte";
  import Chart from "chart.js/auto";

  let chartContainer: HTMLCanvasElement | null = null;
  let rawData: Record<string, number[]> = {}; // JSON data structure
  let selectedRange: "days" | "weeks" | "months" | "year" = "days";
  let chartInstance: Chart | null = null;

  // Fetch the JSON file containing browsing durations
  async function fetchData(): Promise<void> {
    try {
      const response = await fetch("progress_data.json"); // Ensure the JSON file is in your extension directory
      rawData = await response.json();
      updateChart();
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  // Extract & aggregate data based on selected range
  function getChartData() {
    const categories = ["Education", "Technology", "News", "Sports", "Entertainment", "Gaming", "Social Media", "Shopping", "Travel"];
    const aggregatedData: number[] = new Array(categories.length).fill(0);

    Object.keys(rawData).forEach((date: string) => {
      const duration: number[] = rawData[date];

      if (Array.isArray(duration) && duration.length === categories.length) {
        const dateObj = new Date(date);
        const now = new Date();

        if (
          (selectedRange === "days" && dateObj.toDateString() === now.toDateString()) ||
          (selectedRange === "weeks" && getWeekNumber(dateObj) === getWeekNumber(now)) ||
          (selectedRange === "months" && dateObj.getMonth() === now.getMonth() && dateObj.getFullYear() === now.getFullYear()) ||
          (selectedRange === "year" && dateObj.getFullYear() === now.getFullYear())
        ) {
          duration.forEach((time, index) => {
            aggregatedData[index] += time;
          });
        }
      }
    });

    return {
      labels: categories,
      datasets: [
        {
          label: "Browsing Time",
          data: aggregatedData,
          backgroundColor: ["#ff6384", "#36a2eb", "#ffcd56", "#4bc0c0", "#9966ff", "#ff9f40", "#c9cbcf", "#33cc33", "#ff6666"],
          borderWidth: 1
        }
      ]
    };
  }

  function getWeekNumber(date: Date): number {
    const firstJan = new Date(date.getFullYear(), 0, 1);
    const dayOfYear = Math.floor((date.getTime() - firstJan.getTime()) / (1000 * 60 * 60 * 24));
    return Math.ceil((dayOfYear + firstJan.getDay() + 1) / 7);
  }

  // Function to update chart when filter changes
  function updateChart(): void {
    if (chartInstance) {
      chartInstance.destroy(); // Prevent overlapping charts
    }

    if (chartContainer) {
      chartInstance = new Chart(chartContainer, {
        type: "pie",
        data: getChartData(),
        options: {
          responsive: true,
          maintainAspectRatio: false
        }
      });
    }
  }

  // Fetch data when component mounts
  onMount(fetchData);

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