<script lang="ts">
	import { currentPage, currentScheduleId, scheduleStore, type Schedule } from "$lib/store";
    import { onMount } from "svelte";
      
    let countdown = 30; 
    let schedule: Schedule | null = null;

  
    onMount(() => {
      let selectedId = localStorage.getItem("currentScheduleId");
      console.log("🔍 Retrieved Schedule ID:", selectedId, "Type:", typeof selectedId);

      const storedData = localStorage.getItem("schedules");
      console.log("📜 Retrieved Schedules:", storedData, "Type:", typeof storedData);

      if (selectedId && storedData) {
          try {
              // Parse the schedules array
              const schedules = JSON.parse(storedData);

              // Find the schedule object inside each entry
              const selectedSchedule = schedules.find((entry: any) => {
                  return entry.schedule.id === parseInt(selectedId, 10);
              });
              if (selectedSchedule) {
                  schedule = selectedSchedule.schedule;
                // scheduleStore.set(selectedSchedule.schedule); // If you're using a store
              } else {
                  console.error("No schedule found with the ID:", selectedId);
              }
          } catch (error) {
              console.error("Error parsing schedules:", error);
          }
      } else {
          console.error("No selected ID or schedules found in localStorage.");
      }
      const interval = setInterval(() => {
        if (countdown > 0) {
            countdown--;
        } else {
            clearInterval(interval);
            console.log("Dashboard closed!");
            window.close();
        }
      }, 1000);
    });

  
    function bionifyText() {
      console.log("Bionify Text Activated");
      
    }
  
    function unbionifyText() {
      console.log("deactivated bionic");
    }
  
    function activateCues() {
      console.log("Motivational Cues Activated");
    }
  
    function deactivateCues() {
      console.log("Motivational Cues Deactivated");
    }
  
    function stopActivity() {
      console.log("Activity Stopped");
      currentScheduleId.set(0);
      goToScheduleSummaryPage();
    }
    function goToScheduleSummaryPage(){
      currentPage.set('ScheduleSummaryPage');
    }
  </script>
  
<div class="container">
    <div class="page1-header">
      <img src="/icon.png" alt="MindAnchor Logo" width="25px" height="2px">
      <h1>MindAnchor</h1>
    </div>
    <hr />

    <div class="description">
        <p><strong>Schedule Id:</strong> {schedule?.id}</p>
        <p><strong>Start Time Date:</strong> {schedule?.startDate + " : " + schedule?.startTime} | <strong>End Time Date:</strong> {schedule?.endDate + " : " + schedule?.endTime}</p>
    </div>
    
    <hr style="margin-top: 10px;">
    <div class="buttons">
      <button class="btn btn-primary" on:click={bionifyText}>Bionify webpage text</button>
      <button class="btn btn-secondary" on:click={unbionifyText}>Unbionify webpage text</button>
    </div>
  
    <div class="buttons">
      <button class="btn btn-primary" on:click={activateCues}>Activate motivational cues</button>
      <button class="btn btn-secondary" on:click={deactivateCues}>Deactivate motivational cues</button>
    </div>
  
    <h2>How have you been doing so far?</h2>
  
    <!-- Placeholder for the pie chart -->
    <canvas id="chart">

    </canvas>
    
    <div class="actions">
        <button class="btn stop-btn" on:click={stopActivity}>Stop current activity</button>
        <p class="countdown">The dashboard will close in <strong>{countdown}</strong> seconds!</p>
    </div>

</div>
<style>
    .container {
      width: 984px;
      border: 1px solid #ccc;
      background-color: #fff;
      padding: 20px;
      box-sizing: border-box;
      overflow: hidden; 
      font-family: 'Inria Sans', sans-serif;
    }

    .buttons {
      display: flex;
      justify-content: center;
      gap: 10px;
      margin-top: 20px;
    }
  
    .btn {
      padding: 10px 20px;
      border: none;
      font-size: 16px;
      font-weight: bold;
      cursor: pointer;
      border-radius: 10px;
      transition: 0.3s;
    }
  
    .btn-primary {
      background: #19006f;
      color: white;
    }
  
    .btn-secondary {
      background: #666;
      color: white;
    }
  
    .btn-primary:hover, .btn-secondary:hover {
      opacity: 0.8;
    }
  
    .stop-btn {
      background: red;
      color: white;
      border-radius: 10px;
      margin-top: 20px;
      align-self: center;
    }
  
    .countdown {
      font-weight: bold;
      font-size: 18px;
    }
    h1 {
      font-size: 1.8em;
      margin: 0 0 10px;
    }
  
    hr {
      border: 0;
      height: 2px;
      background-color: rgb(1, 1, 124);
      margin-bottom: 20px;
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
    }
  
    .page1-header img {
      display: block;
    }

    h2{
        margin-top: 15px;
        font-weight: bold;
        text-align: center;
    }
    .description{
        text-align: center;
    }
    .actions {
        text-align: center;
        margin-top: 20px;
    }
</style>