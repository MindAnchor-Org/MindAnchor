<script lang="ts">

  import { currentPage } from '../../lib/store';

  let timeOptions = ['10 seconds', '20 seconds', '30 seconds'];
  let selectedUnlistedTime = '10 seconds';
  let selectedDashboardTime = '10 seconds';
  let selectedInactivityTime = '10 seconds';
  let needMotivationalCues = false;

  let selectedImageAlignment = 'Center';
  let selectedAnimationType = 'Fade';
  let selectedAnimationDuration = '10 seconds';
  let backgroundColor = '#ffffff';
  let textColor = '#000000';
  let uploadedImage: File | null = null;

  function handleImageUpload(event: Event) {
      const target = event.target as HTMLInputElement;
      if (target.files && target.files.length > 0) {
          uploadedImage = target.files[0];
      }
  }
  function goToUserProgress() {
    currentPage.set('ProgressChart');
  }
  function goToScheduleSummaryPage() {
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

  .settings-section {
      display: flex;
      flex-direction: column;
      gap: 10px;
      margin-bottom: 20px;
  }

  .settings-container {
      display: flex;
      justify-content: space-between;
  }

  .settings-section label {
  display: flex;
  align-items: center; 
  justify-content: space-between; 
  width: 100%;
  }

  .settings-section select {
  margin-left: 10px; 
  height: 35px; 
  padding: 5px;
  font-size: 16px; 
  }

  h2{
    font-size: 18px;
    padding-bottom: 20px;
  }

  label{
      font-size: 16px;
  }

  .image-upload-section {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      width: 40%;
  }

  .preferences-section {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 20px;
  }

  .preferences-section label {
  display: flex;
  align-items: center;
  justify-content: space-between; 
  width: 100%; 
  }

  .preferences-section select {
  margin-left: 10px; 
  flex-grow: 1; 
  max-width: 200px; 
  }

  select , input{
  display: block;
  margin-left: auto; 
  width: 200px;
  }

  .save-btn {
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
  .toggle-container {
      display: flex;
      align-items: center;
      gap: 10px;
      font-size: 16px;
      cursor: pointer;
  }

  .toggle-input {
      display: none;
  }

  .toggle-slider {
      position: relative;
      width: 40px;
      height: 20px;
      background-color: #ccc;
      border-radius: 20px;
      transition: 0.3s;
  }

  .toggle-slider::before {
      content: "";
      position: absolute;
      width: 16px;
      height: 16px;
      background-color: white;
      border-radius: 50%;
      top: 2px;
      left: 2px;
      transition: 0.3s;
  }

  .toggle-input:checked + .toggle-slider {
      background-color: #007bff; 
  }

  .toggle-input:checked + .toggle-slider::before {
  transform: translateX(20px);
  }

</style>

<div class="container">
  <div class="page1-header">
      <img src="/icon.png" alt="MindAnchor Logo" width="25px">
      <h1>MindAnchor</h1>
  </div>
  <hr>

  <nav class="nav-container">
    <div class="nav-item">
        <button class="icon" on:click={goToScheduleSummaryPage} type="button">
            📅 Schedules
          </button>
    </div>
    <div class="nav-item">
        <button class="icon" on:click={goToUserProgress} >
          📊 User Progress
        </button>
    </div>    
    <div class="nav-item">
      <button class="icon" on:click={goToSubscription} type="button">
        $ Subscription
      </button>
    </div>
    <div class="nav-item-active">
      <button class="icon" type="button">
        ⚙️ Settings
      </button>
    </div>
  </nav>
  <br>
  <div class="settings-section">
      <label>Time allowed to access unlisted sites:
      <select bind:value={selectedUnlistedTime}>
          {#each timeOptions as option}
          <option value={option}>{option}</option>
          {/each}
      </select>
      </label>

      <label>Time allowed to access the dashboard when active:
      <select bind:value={selectedDashboardTime}>
          {#each timeOptions as option}
          <option value={option}>{option}</option>
          {/each}
      </select>
      </label>

      <label>Maximum inactivity duration before showing cues:
      <select bind:value={selectedInactivityTime}>
          {#each timeOptions as option}
          <option value={option}>{option}</option>
          {/each}
      </select>
      </label>

      <label class="toggle-container">
          Need for motivational cues during inactivity:
          <input type="checkbox" bind:checked={needMotivationalCues} class="toggle-input">
          <span class="toggle-slider"></span>
      </label>
      
  </div>

  <h2>
    Set preferences for blacklisted site interference.
  </h2>

  <div class="settings-container">
      <div class="image-upload-section">
      <label>Upload Image:
          <input type="file" accept="image/*" on:change={handleImageUpload}>
      </label>
      </div>

      <div class="preferences-section">
      <label>Image Alignment:
          <select bind:value={selectedImageAlignment}>
          <option>Left</option>
          <option>Center</option>
          <option>Right</option>
          </select>
      </label>

      <label>Animation Type:
          <select bind:value={selectedAnimationType}>
          <option>Fade</option>
          <option>Slide</option>
          <option>Zoom</option>
          </select>
      </label>

      <label>Animation Duration:
          <select bind:value={selectedAnimationDuration}>
          <option>10 seconds</option>
          <option>20 seconds</option>
          <option>30 seconds</option>
          </select>
      </label>
      <label>Background Colour:
          <input type="color" bind:value={backgroundColor}>
      </label>
      <label>Text Colour:
          <input type="color" bind:value={textColor}>
      </label>
      </div>
  </div>

  <button class="save-btn">Save Preferences</button>
</div>