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
    let selectedId = localStorage.getItem("currentScheduleId");
    const storedData = localStorage.getItem("schedules");
    // Storing the value
    chrome.storage.local.set({ ActivateClassification: 'true' }, function() {
      if (chrome.runtime.lastError) {
        console.error("Error saving data:", chrome.runtime.lastError);
      } else {
        console.log("Data saved successfully from activestate page");

        // Retrieving the value immediately after saving
        chrome.storage.local.get(['ActivateClassification'], function(result) {
          if (chrome.runtime.lastError) {
            console.error("Error getting value:", chrome.runtime.lastError);
          } else {
            console.log("Value retrieved from active statepage:", result.ActivateClassification); 
          }
        });
      }
    });

    if (selectedId && storedData) {
      try {
        const schedules = JSON.parse(storedData);
        const selectedSchedule = schedules.find((entry: any) => {
          return entry.schedule.id === parseInt(selectedId, 10);
        });
        if (selectedSchedule) {
          schedule = selectedSchedule.schedule;
          blacklisturls = selectedSchedule.blacklistWhitelist.blacklistUrls;
          whitelisturls = selectedSchedule.blacklistWhitelist.whitelistUrls;
          let blacklistCategories = selectedSchedule.blacklistWhitelist.blacklistCategories;
          let whitelistCategories = selectedSchedule.blacklistWhitelist.whitelistCategories
          selectedBlacklistCategories = blacklistCategories.filter((category: { selected: any; }) => category.selected).map((category: { name: any; }) => category.name);
          selectedWhitelistCategories = whitelistCategories.filter((category: { selected: any; }) => category.selected).map((category: { name: any; }) => category.name);
          chrome.storage.local.set({ BlacklistCategories: selectedBlacklistCategories},

          function() {
            if (chrome.runtime.lastError) {
              console.error("Error saving data:", chrome.runtime.lastError);
            } else {
              console.log("Data saved successfully from activestate page");

            }
          })
          chrome.storage.local.set({ WhitelistCategories: selectedWhitelistCategories}, function() {
            if (chrome.runtime.lastError) {
              console.error("Error saving data:", chrome.runtime.lastError);
            } else {
              console.log("Data saved successfully from activestate page");

            }
          })
          localStorage.setItem('BlacklistCategories', JSON.stringify(selectedBlacklistCategories));
          localStorage.setItem('WhitelistCategories', JSON.stringify(selectedWhitelistCategories));

        } else {
          console.error("No schedule found with the ID:", selectedId);
        }
      } catch (error) {
        console.error("Error parsing schedules:", error);
      }
    } else {
      console.error("No selected ID or schedules found in localStorage.");
    }

    interval = setInterval(() => {
      if (countdown > 0) {
        countdown--;
      } else {
        clearInterval(interval!);
        console.log("Dashboard closed!");
        window.close();
      }
    }, 1000);
    chrome.storage.local.get("bionicEnabled", (data: { bionicEnabled: boolean }) => {
      isBionicEnabled = data.bionicEnabled || false;
    });
  

    
  });
  onDestroy(() => {
    if (interval) {
      clearInterval(interval);
      console.log("Interval cleared to prevent auto-closing.");
    }
  });

  function activateCues() {
    console.log("Motivational Cues Activated");
  }

  function deactivateCues() {
    console.log("Motivational Cues Deactivated");
  }

  function stopActivity() {
    console.log("Activity Stopped");
    currentScheduleId.set(0);
    localStorage.setItem('ActivateClassification','false')
    localStorage.setItem('BlacklistCategories','[]')
    localStorage.setItem('WhitelistCategories','[]')
    chrome.storage.local.set({ ActivateClassification: 'false' }, function() {
      if (chrome.runtime.lastError) {
        console.error("Error saving data:", chrome.runtime.lastError);
      } else {
        console.log("Data saved successfully discarded");
      }
    })
    chrome.storage.local.set({ BlacklistCategories: []}, function() {
      if (chrome.runtime.lastError) {
        console.error("Error saving data:", chrome.runtime.lastError);
      } else {
        console.log("Data saved successfully from activestate page");
      }
    })
    chrome.storage.local.set({ WhitelistCategories: []}, function() {
      if (chrome.runtime.lastError) {
        console.error("Error saving data:", chrome.runtime.lastError);
      } else {
        console.log("Data saved successfully from activestate page");
      }
    })
    goToScheduleSummaryPage();
  }
11
  function goToScheduleSummaryPage() {
    currentPage.set('ScheduleSummaryPage');
  }
12
  function bionify() {
    console.log('bionic')
    chrome.runtime.sendMessage({ action: "activateBionicReading" }, () => {
      isBionicEnabled = true; // Update state locally
    });
    
  }
13
  function unbionify() {
    chrome.runtime.sendMessage({ action: "deactivateBionicReading" }, () => {
      isBionicEnabled = false; // Update state locally
    });
  }


    
</script>

<div class="container">
  <div class="page1-header">
    <img src="/icon.png" alt="MindAnchor Logo" width="25px" height="2px">
    <h1>MindAnchor</h1>
  </div>
  <hr />

  

  <!-- Schedule Details -->
  <div class="description">
    <p><strong>Schedule Name:</strong> {schedule?.name}</p>
    <p><strong>Start Time Date:</strong> {schedule?.startDate + " : " + schedule?.startTime} | <strong>End Time Date:</strong> {schedule?.endDate + " : " + schedule?.endTime}</p>
  </div>

  <!-- Buttons -->
  <hr style="margin-top: 10px;">
  <div class="buttons">
    <button id="bionifyButton" class="btn btn-primary" on:click={bionify} disabled={isBionicEnabled}>Bionify webpage text</button>
    <button id="unbionifyButton" class="btn btn-secondary" on:click={unbionify} disabled={!isBionicEnabled}>Unbionify webpage text</button>
  </div>
 
  <div class="buttons">
    <button class="btn btn-primary" on:click={activateCues} >Activate motivational cues</button>
    <button class="btn btn-secondary" on:click={deactivateCues}>Deactivate motivational cues</button>
  </div>

  <!-- Progress Section -->
  <h2>How have you been doing so far?</h2>
  
  <canvas id="chart"></canvas>
  
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