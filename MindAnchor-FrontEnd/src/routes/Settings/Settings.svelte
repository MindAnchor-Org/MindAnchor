<script lang="ts">
    import { onMount } from 'svelte';
    import { currentPage } from '../../lib/store';

    let backgroundColor = '#ffffff';
    let textColor = '#000000';
    let uploadedImage: File | null = null;
    let previewImage: string | null = null;
    let isDragging = false;
    let errorMessage = "";
    let fileInput: HTMLInputElement | null = null;

    const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];

    let port: chrome.runtime.Port | null = null; 

    onMount(() => {
        loadSettings();
        loadImageFromChromeStorage();
    });

    function isValidFileSize(file: File) {
        return file.size <= MAX_FILE_SIZE;
    }

    function isValidImageType(file: File) {
        return allowedTypes.includes(file.type);
    }

    function handleImageUpload(event: Event) {
        const target = event.target as HTMLInputElement;
        
        if (target.files && target.files.length > 0) {
            uploadedImage = target.files[0];
            validateAndSetImage(uploadedImage);
        } else {
            target.value = "";
        }
    }

    function validateAndSetImage(file: File) {
        if (!file) return;
        if (!isValidFileSize(file)) {
            errorMessage = "File is too large. Max allowed size: 2MB.";
            return;
        }
        if (!isValidImageType(file)) {
            errorMessage = "Invalid file type. Please upload a JPG, PNG, or GIF.";
            return;
        }
        errorMessage = "";
        uploadedImage = file;
        previewImage = URL.createObjectURL(file);
        saveImageToChromeStorage();
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
            validateAndSetImage(uploadedImage);
        }
    }

    function resetImage() {
        uploadedImage = null;
        previewImage = null;
        errorMessage = "";
        if (fileInput) { 
            fileInput.value = "";
        }
        clearImageFromChromeStorage();
    }

    function loadSettings() {
        const savedSettings = localStorage.getItem("userSettings");
        if (savedSettings) {
            const settings = JSON.parse(savedSettings);
            backgroundColor = settings.backgroundColor || '#ffffff';
            textColor = settings.textColor || '#000000';
        }
    }

    function saveImageToChromeStorage() {
        if (uploadedImage) {
            const reader = new FileReader();
            reader.onload = function (event) {
                if (event.target?.result) {
                    chrome.storage.local.set({ uploadedImage: event.target.result }, () => {
                        console.log("Image saved to Chrome storage");
                    });
                }
            };
            reader.readAsDataURL(uploadedImage);
            saveSettings();
        }
    }
    function saveColors(){
        chrome.storage.local.set({backgroundColor : backgroundColor},() => {
            console.log("Background color has been saved!");
        })
        chrome.storage.local.set({textColor : textColor},() => {
            console.log("Text color has been saved!");
        })
    }

    function loadImageFromChromeStorage() {
        chrome.storage.local.get(["uploadedImage"], (result) => {
            if (result.uploadedImage) {
                previewImage = result.uploadedImage;
            }
        });
    }

    function saveSettings() {
        const settings = { backgroundColor, textColor };
        saveColors();
        localStorage.setItem("userSettings", JSON.stringify(settings));
        alert("Settings saved successfully!");
    }

    function clearImageFromChromeStorage() {
        chrome.storage.local.remove("uploadedImage", () => {
            console.log("Image removed from Chrome storage");
        });
    }

    function goToUserProgress() {
        currentPage.set('ProgressChart');
    }
    function goToBlackList_WhiteListPage() {
        currentPage.set('BlackList_WhiteListPage');
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
  
    h2{
      font-size: 18px;
      padding: 10px;
      text-align: center;
    }
  
    label{
        font-size: 16px;
        display: flex;
        align-items: center;
        gap: 10px;
        font-size: 16px;
        font-weight: 500;
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

    .error-message {
        color: red;
        font-size: 14px;
        margin-top: 5px;
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

    .save-btn {
    background-color: rgb(1, 1, 124);
    color: white;
    border: none;
    padding: 12px 16px;
    border-radius: 8px;
    cursor: pointer;
    display: block;
    width: 100%;
    text-align: center;
    margin-top: 20px;
    font-size: 16px;
    font-weight: bold;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }

    .save-btn:hover {
        background-color: rgb(0, 0, 100);
    }

    .save-btn:active {
        background-color: rgb(0, 0, 90);
    }

</style>
  
  <div class="container">
    <div class="page1-header">
        <img src="/cover.png" alt="MindAnchor Logo" width="25px">
        <h1>MindAnchor</h1>
    </div>
    <hr>
  
    <nav class="nav-container">
      <div class="nav-item">
          <button class="icon" on:click={goToBlackList_WhiteListPage} type="button">
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
        <h2>
            Set preferences for blacklisted site interference.
        </h2>
    
    </div>

  
    <div class="settings-container">
        <label>Upload Image:</label>
        <div 
            class="image-upload-container {isDragging ? 'dragging' : ''}"
            role="button"
            tabindex="0"
            aria-label="Upload an image"
            on:dragover={handleDragOver}
            on:dragleave={handleDragLeave}
            on:drop={handleDrop}
            on:click={() => document.getElementById('fileInput')?.click()}>

            {#if previewImage}
                <img src={previewImage} alt="Preview" class="image-preview" />
                <button type="button" class="reset-button" on:click={() => resetImage()}>Remove</button>
            {:else}
                <p class="upload-text">Drag & Drop an image or <strong>Click to Upload</strong></p>
            {/if}

            <input type="file" id="fileInput" class="hidden-input" accept="image/jpeg, image/png, image/gif" bind:this={fileInput} on:change={handleImageUpload} />
        </div>
  

        <div class="preferences-section">
        
            <label>Background Colour:
                <input type="color" bind:value={backgroundColor}>
            </label>
            <label>Text Colour:
                <input type="color" bind:value={textColor}>
            </label>

            {#if previewImage}
                <br>
                <p class="upload-message">* The image you uploaded will be displayed for</p> 
                <p>you when you are distracted :D.</p>
            {/if}

            {#if errorMessage}
                <br>
                <p class="error-message">{errorMessage}</p>
            {/if}

        </div>
    </div>
    <button class="save-btn" on:click={() => {saveSettings();}}>Save Settings</button>
  
  </div>