<script lang="ts">
  import { currentPage, currentScheduleId, isBionified, scheduleStore, type Schedule } from "../../lib/store";
  import { onMount, onDestroy } from "svelte";
  let countdown = 30; 
  let interval: number | null = null;
  let schedule: Schedule | null = null;
  let isBionicEnabled = false;
  let blacklisturls: string | null = null;
  let whitelisturls : string[] | null = null; 
  let selectedBlacklistCategories: string[];
  let selectedWhitelistCategories: string[];

  onMount(() => {
    if (chartCanvas) {
      new Chart(chartCanvas, {
        type: "pie",

        data: {
          labels: ["8.34%", "12.5%", "16.67%", "20.83%", "41.66%"],
          datasets: [
            {
              data: [8.34, 12.5, 16.67, 20.83, 41.66], // Percentage values
              backgroundColor: [ "#e6effc", "#9ec1ff", "#aecbef", "#5a7ebb", "#2e1a78"],
              borderWidth: 1
            }
          ]
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              display: false
          },
          tooltip: {
            enabled: true
          }
          }
        }
      });
    }

    const interval = setInterval(() => {
      if (countdown > 0) countdown--;
        else clearInterval(interval);
      }, 1000);

  


  

    
  });

  //onMount(() => {
    /**const interval = setInterval(() =>{
      countdown--;
      if(countdown <= 0){
        clearInterval(interval);
        window.close();
      }
    }, 1000);**/
  
  //});
    
</script>

<main>
  <!-- Header Section -->
  <div class="header">
    <img src="src/MindAnchor-Logo.png" alt="MindAnchor Logo" class="logo">
    <h1>MindAnchor</h1>
    
  </div>
  <hr class="header-hr">
  

  <!-- Schedule Details -->
  <div class="schedule">
    <p><strong>Schedule Name:</strong> &lt;name&gt;</p>
    <div class="schedule-time">
      <p><strong>Start Time Date:</strong> &lt;date&gt;&lt;time&gt;</p>
      <p><strong>End Time Date:</strong> &lt;date&gt;&lt;time&gt;</p>
    </div>
  </div>
  <hr>

  <!-- Buttons -->
  <div class="controls">
    <button on:click={setActive} class="bionify">Bionify webpage text</button>
    <button on:click={setActive} class="unbionify">Unbionify webpage text</button>
    <button on:click={setActive} class="activate">Activate motivational cues</button>
    <button on:click={setActive} class="deactivate">Deactivate motivational cues</button>
  </div>

  <!-- Progress Section -->
  <div class="progress-heading">
    How have you been doing so far?
  </div>
  <br>
  <div class="progress">
    <div class="pie-chart">
      <canvas bind:this={chartCanvas}></canvas>
    </div>
    <div class="legend">
      <div class="legend-item">
        <span class="dot light"></span> 
      </div>

      <div class="legend-item">
        <span class="dot medium"></span> 
      </div>

      <div class="legend-item">
        <span class="dot dark"></span> 
      </div>

    </div>
  </div>
  <button class="stop-button">Stop current activity</button>
  <p class="countdown">The dashboard will close in <strong>{countdown} seconds!</strong></p>
</main>

<style>
  @import url('https://fonts.googleapis.com/css2?family=Inria+Sans:wght@300;400;700&display=swap');

  main {
    
    font-family: 'Inria Sans', sans-serif;
    text-align: center;
    align-items: center;
    justify-content: center;
  }

  .header {
    display: flex;
    font-size:15px;
    align-items: center;
    gap: 5px;
    margin-left: 20px;
    
  }

  .header-hr{
    width: 100%; 
    border: 2px solid darkblue;
    
    
  }

  .logo {
    width: 50px;
  }

  .schedule{
    font-size: 20px;
    line-height: 10px;
    
  }
  .schedule-time{
    display: flex;
    justify-content: center;
    gap:50px;

  }

  hr {
    width: 90%;
    border: 1px solid #222;
    
  }

  .controls {
    padding: 30px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 50px;
    margin-bottom: 20px;
    
  }

  .controls button {
    padding:20px;
    font-family: 'Inria Sans', sans-serif;
    border: none;
    border-radius: 20px;
    cursor: pointer;
    font-weight: bold;
    

  }

  .bionify , .unbionify , .activate , .deactivate{
    font-size: 20px;
    background: #73707E;
    color: white;
  }

  .bionify:hover , .unbionify:hover , .activate:hover , .deactivate:hover{
    background: #2e1a78;
    color: white;
    transform: scale(1.05);
  }
 
  
  

  .progress-heading{
    font-size: 20px;
    font-weight: 700;
  }

  .progress {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 60px;
    margin-top: 15px;
    margin-right: 250px;
    
    
  }


  .pie-chart{
    display: flex;
    align-items: center;
    justify-content: center;
    max-width: 250px;
    max-height: 250px;
    
    
    
  }
  

  .legend {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    
    
  }

  .legend-item {
    display: flex;
    align-items: center;
    margin-bottom: 30px;
  }
  

  .dot {
    width: 25px;
    height: 25px;
    border-radius: 50%;
    margin-right: 10px;
    
  }

  .light { background: #aecbef; }
  .medium { background: #5a7ebb; }
  .dark { background: #2e1a78; }

  .stop-button {
    font-family: 'Inria Sans', sans-serif;
    padding: 20px;
    width:300px;
    background: #C70000;
    color: white;
    font-size: 20px;
    margin-top: 40px;
    border-radius: 20px;
    border: none;
  }

  .stop-button:hover{
    transform: scale(1.05);
  }

  .countdown {
    font-size: 22px;
    
    line-height: 31.17px;
  }


</style>