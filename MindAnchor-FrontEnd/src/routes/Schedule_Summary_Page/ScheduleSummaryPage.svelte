<script lang="ts">
  import { onMount } from 'svelte';
  import { currentPage, currentScheduleId } from '../../lib/store.js';

  type Schedule = {
    id: number;
    name: string;
    startDate: string;
    endDate: string;
    startTime: string;
    endTime: string;
  };

  let schedules: Schedule[] = [];

  // Fetch scheduled activities from localStorage safely
  onMount(() => {
    try {
      const storedData = localStorage.getItem('schedules');
      if (storedData) {
        const parsedData = JSON.parse(storedData);
        // Extract only the 'schedule' part from each object
        schedules = parsedData.map((entry: any) => entry.schedule);
      } else {
        schedules = [];
      }
    } catch (error) {
      console.error("Error fetching schedules from localStorage:", error);
      schedules = [];
    }
  });

  function deleteSchedule(id: number): void {
    try {
      const storedData = localStorage.getItem('schedules');
      if (!storedData) return;

      let parsedData = JSON.parse(storedData);
      
      // Remove the object that contains the matching schedule id
      parsedData = parsedData.filter((entry: any) => entry.schedule.id !== id);

      localStorage.setItem('schedules', JSON.stringify(parsedData));
      schedules = parsedData.map((entry: any) => entry.schedule);
    } catch (error) {
      console.error("Error updating schedules in localStorage:", error);
    }
  }
  function navigateToActiveState(id: number): void {
    currentScheduleId.set(id); // Set the current schedule ID
    currentPage.set('Active_State_Page'); // Navigate to the detail page
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

  .activity-card {
    display: flex;
    justify-content: space-between;
    background: #f8f8f8;
    padding: 10px;
    margin-bottom: 10px;
    border-radius: 5px;
  }
  .activity-box{
    height: 200px;
    overflow: scroll;
  }

  .delete-btn {
    cursor: pointer;
    background: none;
    border: none;
    font-size: 1.2rem;
    color: red;
  }

  .schedule-btn {
    background-color: rgb(1, 1, 124);
    color: white;
    border: none;
    padding: 10px;
    border-radius: 5px;
    cursor: pointer;
    display: block;
    width: 100%;
    text-align: center;
    margin-top: 20px;
  }

  .empty-state-container {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
  }

  .empty-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: 30px;
    border: 2px solid black;
    border-radius: 5px;
    background-color: #d3d3d3;
    width: 100%;
  }

  .empty-state img {
    width: 80px;
    margin-bottom: 15px;
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
    <div class="nav-item-active">
      <span class="icon">📅</span> Schedules
    </div>
    <div class="nav-item">
      <span class="icon">📊</span> User Progress
    </div>
    <div class="nav-item">
      <span class="icon">$</span> Subscription
    </div>
    <div class="nav-item">
      <span class="icon">⚙️</span> Settings
    </div>
  </nav>
  <h2 style="text-align: center; margin-top:10px;margin-bottom:10px;">Upcoming Activities</h2>
  {#if schedules.length === 0}
    <div class="empty-state-container">
      <div class="empty-state">
        <img src="/no_schedule.svg" alt="No Schedule">
        <p>If you have scheduled any activities, they will appear here.</p>
        <p>You currently have no activities scheduled!</p>
        <p>Schedule an activity now with the button below :&#41;</p>
      </div>
    </div>
  {:else}
    <div class="activity-box">
      {#each schedules as schedule (schedule.id)}
        <div class="activity-card">
          <div style="cursor: pointer;" on:click={() => navigateToActiveState(schedule.id)}>
            <p><strong>Activity Name:</strong> {schedule.name}</p>
            <p><strong>Start:</strong> {schedule.startDate} {schedule.startTime}</p>
            <p><strong>End:</strong> {schedule.endDate} {schedule.endTime}</p>
          </div>
          <button class="delete-btn" on:click={() => deleteSchedule(schedule.id)}>🗑</button>
        </div>
        <hr>
      {/each}
    </div>
  {/if}
  <button class="schedule-btn" on:click={() => currentPage.set('SchedulePage')}>Schedule New Activity</button>
</div>
