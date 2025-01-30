<script lang="ts">
    import { onMount } from 'svelte';
    import { currentPage } from '../store.js';
  
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
        const storedSchedules = localStorage.getItem('schedules');
        schedules = storedSchedules ? JSON.parse(storedSchedules) as Schedule[] : [];
      } catch (error) {
        console.error("Error fetching schedules from localStorage:", error);
        schedules = [];
      }
    });
  
    function deleteSchedule(id: number): void {
      schedules = schedules.filter(schedule => schedule.id !== id);
      try {
        localStorage.setItem('schedules', JSON.stringify(schedules));
      } catch (error) {
        console.error("Error updating schedules in localStorage:", error);
      }
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
  
    .container {
      width: 984px;
      border: 1px solid #0e0c0c;
      background-color: #fff;
      padding: 20px;
      box-sizing: border-box;
      overflow: hidden; /* Prevent internal scrolling */
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
      margin-top: 20px; /* Adds space between button and container */
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
      border: 2px solid black; /* Added black border */
      border-radius: 5px;
      background-color: #d3d3d3;
      width: 100%;
    }
  
    .empty-state img {
      width: 80px;
      margin-bottom: 15px;
    }
  </style>
  
  <div class="container">
    <h2 style="text-align: center;">Upcoming Activities</h2>
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
      <div>
        {#each schedules as schedule (schedule.id)}
          <div class="activity-card">
            <div>
              <p><strong>Activity Name:</strong> {schedule.name}</p>
              <p><strong>Start:</strong> {schedule.startDate} {schedule.startTime}</p>
              <p><strong>End:</strong> {schedule.endDate} {schedule.endTime}</p>
            </div>
            <button class="delete-btn" on:click={() => deleteSchedule(schedule.id)}>🗑</button>
          </div>
        {/each}
      </div>
    {/if}
    <button class="schedule-btn" on:click={() => currentPage.set('SchedulePage')}>Schedule New Activity</button>
  </div>
  