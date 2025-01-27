<script lang="ts">
    import {currentPage} from './store';
    type Task = string;
    type Schedule = {
      startDate: string;
      endDate: string;
      startTime: string;
      endTime: string;
      tasks: Task[];
    };
  
    let startDate: string = '';
    let endDate: string = '';
    let startTime: string = '';
    let endTime: string = '';
    let task: string = '';
    let tasks: Task[] = [];
  
    function addTask(): void {
      if (task.trim()) {
        tasks = [...tasks, task];
        task = '';
      }
    }
    function goToBackList_WhiteListPage() {
        currentPage.set('BackList_WhiteListPage');  // Update the store to 'page2'
    }
  
    function removeTask(index: number): void {
      tasks = tasks.filter((_, i) => i !== index);
    }
  
    function confirmSchedule(): void {
      const schedule: Schedule = { startDate, endDate, startTime, endTime, tasks };
      goToBackList_WhiteListPage();
      console.log('Activity Duration & To-Do List Confirmed:', schedule);
    }
  
    function discardSchedule(): void {
      startDate = '';
      endDate = '';
      startTime = '';
      endTime = '';
      tasks = [];
    }
</script>
  
<div class="page1-container">
    <div class="page1-header">
      <img src="/icon.png" alt="" width="25px" height="2px">
      <h1>MindAnchor</h1>
    </div>
    <hr />
    <div class="page1-duration">
      <label for="page1-duration" style="font-weight: bold;">Enter the duration of the activity:</label>
      <div id="page1-duration" class="page1-inputs">
        <input type="date" bind:value={startDate} placeholder="Start Date" name="Startdate" />
        <input type="date" bind:value={endDate} placeholder="End Date" name="EndDate" />
        <input type="time" bind:value={startTime} placeholder="Start Time" name="StartTime" />
        <input type="time" bind:value={endTime} placeholder="End Time" name="EndTime" />
      </div>
      <div style="display: flex;">
        <label for="Startdate" style="padding-right: 125px;font-weight:bold;">Start Date</label>
        <label for="Startdate" style="padding-right: 125px;font-weight:bold;">End Date</label>
        <label for="Startdate" style="padding-right: 110px;font-weight:bold;">Start Time</label>
        <label for="Startdate" style="font-weight:bold;">End Time</label>
      </div>
    </div>
  
    <div class="page1-tasks">
      <label for="page1-tasks" style="font-weight: bold;">List the tasks to do during this activity:</label>
      <div id="page1-tasks" class="page1-task-input">
        <input
          type="text"
          style="border-radius: 20px;"
          bind:value={task}
          placeholder="Enter a task"
          on:keydown={(e) => e.key === 'Enter' && addTask()}
        />
        <button on:click={addTask} style="font-size: 2em;">+</button>
      </div>
      <div class="page1-task-list-wrapper">
        <ul>
          {#each tasks as task, index}
            <li>
              {task}
              <button on:click={() => removeTask(index)} style="font-size: 2em;">✖</button>
            </li>
          {/each}
        </ul>
      </div>
    </div>
  
    <div class="page1-actions">
      <button class="page1-confirm" on:click={confirmSchedule}>Confirm Activity Duration & To-Do List</button>
      <button class="page1-discard" on:click={discardSchedule}>Discard This Schedule</button>
    </div>
</div>
<style>
    :global(html, body) {
      margin: 0;
      padding: 0;
      overflow: hidden; /* Prevent scrolling */
      display: flex;
      justify-content: center;
      align-items: center;
      box-sizing: border-box;
    }
  
    .page1-container {
      width: 984px;
      border: 1px solid #ccc;
      background-color: #fff;
      padding: 20px;
      box-sizing: border-box;
      overflow: hidden; /* Prevent internal scrolling */
      font-family: Arial, sans-serif;
    }
  
    h1 {
      font-size: 1.8em;
      margin: 0 0 10px;
    }
  
    hr {
      border: 0;
      height: 2px;
      background-color: blue;
      margin-bottom: 20px;
    }
  
    label {
      font-size: 1.2em;
      margin-bottom: 10px;
      display: block;
      color: #333;
    }
  
    .page1-duration,
    .page1-tasks {
      margin-bottom: 20px;
    }
  
    .page1-inputs {
      display: flex;
      justify-content: space-between;
      gap: 10px;
    }
  
    .page1-task-input {
      display: flex;
      gap: 10px;
      margin-top: 10px;
    }
  
    input {
      flex: 1;
      padding: 10px;
      font-size: 1em;
      border-radius: 5px;
      border: 1px solid #ccc;
    }
  
    button {
      padding: 10px 15px;
      font-size: 1em;
      border: none;
      border-radius: 5px;
      cursor: pointer;
    }
  
    button.page1-confirm {
      background-color: blue;
      color: white;
    }
  
    button.page1-discard {
      background-color: red;
      color: white;
    }
  
    .page1-task-list-wrapper {
      margin-top: 10px;
      margin-bottom: 20px;
      height: 200px;
      max-height: 200px;
      overflow-y: auto;
      border: 1px solid #ccc;
      padding: 10px;
      border-radius: 5px;
    }
  
    ul {
      list-style-type: none;
      padding: 0;
      margin: 0;
    }
  
    li {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 10px;
      border: 1px solid #ccc;
      border-radius: 5px;
      margin-bottom: 5px;
    }
  
    li button {
      background: none;
      border: none;
      color: red;
      cursor: pointer;
      font-size: 1em;
    }
  
    .page1-actions {
      display: flex;
      justify-content: space-between;
      margin-top: 20px;
    }
  
    .page1-header {
      display: flex;
      height: 25px;
      margin-bottom: 10px;
    }
  
    .page1-header img {
      display: block;
    }
</style>
  