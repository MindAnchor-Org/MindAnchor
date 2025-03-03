<script lang="ts">

    import { currentPage } from '../../lib/store';
  
    let timeOptions = ['10 seconds', '20 seconds', '30 seconds'];
    let selectedUnlistedTime = '10 seconds';
    let selectedDashboardTime = '10 seconds';
    let selectedInactivityTime = '10 seconds';
    let needMotivationalCues = 'No';
  
    let selectedImageAlignment = 'Centre';
    let selectedAnimationType = 'Fade';
    let selectedAnimationDuration = '10 seconds';
    let backgroundColor = '#ffffff';
    let textColor = '#000000';
  
    let uploadedImage: File | null = null;
    let previewImage: string | null = null;
    let isDragging = false;
  
    let showDropdown1 = false;
    let showDropdown2 = false;
    let showDropdown3 = false;
    let showDropdown4 = false;
    let showDropdown5 = false;
    let showDropdown6 = false;
    let showDropdown7 = false;

    function toggleDropdown(number: number){
        if(number === 1){
            showDropdown1 = !showDropdown1;
        }else if(number === 2){
            showDropdown2 = !showDropdown2;
        }else if(number === 3){
            showDropdown3 = !showDropdown3;
        }else if(number === 4){
            showDropdown4 = !showDropdown4;
        }else if(number === 5){
            showDropdown5 = !showDropdown5;
        }else if(number === 6){
            showDropdown6 = !showDropdown6;
        }else if(number === 7){
            showDropdown7 = !showDropdown7;
        }
    }

    function handleImageUpload(event: Event) {
        const target = event.target as HTMLInputElement;
        if (target.files && target.files.length > 0) {
            uploadedImage = target.files[0];
            previewImage = URL.createObjectURL(uploadedImage);
        }
    }
  
    function handleDragOver(event: DragEvent) {
        event.preventDefault();
        isDragging = true;
    }
  
    function handleDragLeave() {
        isDragging = false;
    }
  
    function handleDrop(event: DragEvent) {
        event.preventDefault();
        isDragging = false;
  
        if (event.dataTransfer?.files && event.dataTransfer.files.length > 0) {
            uploadedImage = event.dataTransfer.files[0];
            previewImage = URL.createObjectURL(uploadedImage);
        }
    }
  
    function goToUserProgress() {
      currentPage.set('ProgressChart');
    }
    function goToScheduleSummaryPage() {
        currentPage.set('ScheduleSummaryPage');
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
  
    .image-upload-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 20px;
        border: 3px #007bff;
        border-radius: 12px;
        width: 200px;
        max-width: 400px;
        height: 180px;
        background-color: #f8f9fa;
        transition: all 0.3s ease-in-out;
        cursor: pointer;
        text-align: center;
    }
  
    .image-upload-container.dragging {
        background-color: #e3f2fd;
        border-color: #0056b3;
    }
  
    .image-upload-container:hover {
        background-color: #e3f2fd;
        border-color: #0056b3;
    }
  
    .upload-text {
        font-size: 16px;
        color: #333;
        font-weight: 600;
    }
  
    .hidden-input {
        display: none;
    }
  
    .image-preview {
        margin-top: 15px;
        width: 150px;
        height: 150px;
        object-fit: cover;
        border-radius: 10px;
        border: 2px solid #007bff;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }
  
    .reset-button {
        margin-top: 10px;
        background-color: #007bff;
        color: white;
        padding: 8px 12px;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        font-size: 14px;
        transition: all 0.3s;
    }
  
    .reset-button:hover {
        background-color: darkred;
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
  
    select {
        display: block;
        margin-left: auto;
        width: 220px;
        height: 40px;
        padding: 8px;
        font-size: 16px;
        border: 2px solid #ccc;
        border-radius: 8px; /* Curved edges */
        background-color: #f9f9f9;
        color: #333;
        cursor: pointer;
        outline: none;
        transition: all 0.3s ease-in-out;
    }
  
    select:hover {
        border-color: #007bff;
    }
  
    select:focus {
        border-color: #0056b3;
        box-shadow: 0 0 5px rgba(0, 91, 187, 0.5);
    }
  
    option {
        background: white;
        color: black;
        font-size: 16px;
    }
  
    input[type="color"] {
        appearance: none;
        width: 200px;
        height: 40px;
        border: none;
        border-radius: 8px; 
        cursor: pointer;
        border: 2px solid #ccc;
        padding: 5px;
        background: none;
        outline: none;
        transition: all 0.3s ease-in-out;
    }
  
    input[type="color"]::-webkit-color-swatch {
        border-radius: 8px;
        border: 2px solid #ccc;
    }
  
    input[type="color"]::-moz-color-swatch {
        border-radius: 8px;
        border: 2px solid #ccc;
    }
  
    input[type="color"]:hover {
        border: 2px solid #007bff;
    }
  
    input[type="color"]:focus {
        border: 2px solid #0056b3;
        box-shadow: 0 0 5px rgba(0, 91, 187, 0.5);
    }
  
    label {
        display: flex;
        align-items: center;
        gap: 10px;
        font-size: 16px;
        font-weight: 500;
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

        <button on:click={() => toggleDropdown(1)}>
            Time allowed to access unlisted sites:
        </button>
        {#if showDropdown1}
        <div>
            {#each timeOptions as option}
            <label>
            <input type='radio' bind:group={selectedUnlistedTime} value={option}/>{option}
            </label>
            {/each}
        </div>
        {/if}

        <button on:click={() => toggleDropdown(2)}>
            Time allowed to access the dashboard when active:
        </button>
        {#if showDropdown2}
        <div>
            {#each timeOptions as option}
            <label>
            <input type='radio' bind:group={selectedDashboardTime} value={option}/>{option}
            </label>
            {/each}
        </div>
        {/if}

        <button on:click={() => toggleDropdown(3)}>
            Maximum inactivity duration before showing cues:
        </button>
        {#if showDropdown3}
        <div>
            {#each timeOptions as option}
            <label>
            <input type='radio' bind:group={selectedInactivityTime} value={option}/>{option}
            </label>
            {/each}
        </div>
        {/if}

        <button on:click={() => toggleDropdown(4)}>
            Need for motivational cues during inactivity:
        </button>
        {#if showDropdown4}
        <div>
            {#each ['Yes','No'] as option}
            <label>
            <input type='radio' bind:group={needMotivationalCues} value={option}/>{option}
            </label>
            {/each}
        </div>
        {/if}
        
        
    </div>
  
    <h2>
      Set preferences for blacklisted site interference.
    </h2>
  
    <div class="settings-container">
        <div 
            class="image-upload-container {isDragging ? 'dragging' : ''}"
            role="button"
            tabindex="0"
            aria-label="Upload an image"
            on:dragover={handleDragOver}
            on:dragleave={handleDragLeave}
            on:drop={handleDrop}
            on:click={() => document.getElementById('fileInput')?.click()}
            on:keypress={(e) => e.key === 'Enter' && document.getElementById('fileInput')?.click()}>
            {#if previewImage}
                <img src={previewImage} alt="Preview" class="image-preview" />
                <button type="button" class="reset-button" on:click={() => { uploadedImage = null; previewImage = null; }}>Remove</button>
            {:else}
                <p class="upload-text">Drag & Drop an image or <strong>Click to Upload</strong></p>
            {/if}
            <input type="file" id="fileInput" class="hidden-input" accept="image/*" on:change={handleImageUpload} />
        </div>
  

        <div class="preferences-section">

            <button on:click={() => toggleDropdown(5)}>
                Image Alignment:
            </button>
            {#if showDropdown5}
            <div>
                {#each ['Left','Centre','Right'] as option}
                <label>
                <input type='radio' bind:group={selectedImageAlignment} value={option}/>{option}
                </label>
                {/each}
            </div>
            {/if}

            <button on:click={() => toggleDropdown(6)}>
                Animation Type:
            </button>
            {#if showDropdown6}
            <div>
                {#each ['Fade','Slide','Zoom'] as option}
                <label>
                <input type='radio' bind:group={selectedAnimationType} value={option}/>{option}
                </label>
                {/each}
            </div>
            {/if}

            <button on:click={() => toggleDropdown(7)}>
                Animation Duration:
            </button>
            {#if showDropdown7}
            <div>
                {#each timeOptions as option}
                <label>
                <input type='radio' bind:group={selectedAnimationDuration} value={option}/>{option}
                </label>
                {/each}
            </div>
            {/if}

        
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