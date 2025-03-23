<script lang="ts">
  import { currentPage, isBionified } from "../../lib/store";
  import { onMount, onDestroy } from "svelte";
  
  import QuoteService from '../../lib/services/quoteService';
  import MotivationalQuote from '../../lib/components/MotivationalQuote.svelte';
  let countdown = 30;
  
  let interval: number | null = null;
  let isBionicEnabled = false;
  let blacklisturls: string | null = null;
  let whitelisturls : string[] | null = null; 
  let selectedBlacklistCategories: string[];
  let selectedWhitelistCategories: string[];
  let showQuote = false;
  let currentQuote = '';
  let isCuesActive = false;
  let isMotivationalActive = false;
  let motivationalInterval: NodeJS.Timeout | null = null;


  onMount(() => {
    // Storing the value
    chrome.storage.local.set({ ActivateClassification: 'true' }, function () {
      if (chrome.runtime.lastError) {
        console.error("Error saving data:", chrome.runtime.lastError);
      } else {
        console.log("Data saved successfully from activestate page");

        // Retrieving the value immediately after saving
        chrome.storage.local.get(['ActivateClassification'], function (result) {
          if (chrome.runtime.lastError) {
            console.error("Error getting value:", chrome.runtime.lastError);
          } else {
            console.log("Value retrieved from active statepage:", result.ActivateClassification);
          }
        });
      }
    });

    // Retrieve and process data from localStorage
    const storedData = localStorage.getItem("schedules");
    if (storedData) {
      try {
        const schedules = JSON.parse(storedData);

        // Validate the structure of the data
        
          // Data is valid, proceed
        const schedule = schedules[0];
        blacklisturls = schedule.blacklistWhitelist.blacklistUrls;
        whitelisturls = schedule.blacklistWhitelist.whitelistUrls;
        const blacklistCategories = schedule.blacklistWhitelist.blacklistCategories;
        const whitelistCategories = schedule.blacklistWhitelist.whitelistCategories;

          // Filter selected categories
        selectedBlacklistCategories = blacklistCategories
          .filter((category: { selected: any; }) => category.selected)
          .map((category: { name: any; }) => category.name);

        selectedWhitelistCategories = whitelistCategories
          .filter((category: { selected: any; }) => category.selected)
          .map((category: { name: any; }) => category.name);

        console.log("Selected Blacklist Categories:", selectedBlacklistCategories);

          // Save to chrome.storage.local
        chrome.storage.local.set(
          { BlacklistCategories: selectedBlacklistCategories },
          function () {
            if (chrome.runtime.lastError) {
              console.error("Error saving data:", chrome.runtime.lastError);
            } else {
              console.log("Data saved successfully from activestate page");
            }
          }
        );

        chrome.storage.local.set(
          { WhitelistCategories: selectedWhitelistCategories },
          function () {
            if (chrome.runtime.lastError) {
              console.error("Error saving data:", chrome.runtime.lastError);
            } else {
              console.log("Data saved successfully from activestate page");
            }
          }
        );

        chrome.storage.local.set(
          { BlacklistUrls: blacklisturls },
          function () {
            if (chrome.runtime.lastError) {
              console.error("Error saving data:", chrome.runtime.lastError);
            } else {
              console.log("Data saved successfully from activestate page");
            }
          }
        );
        chrome.storage.local.set(
          { WhitelistUrls: whitelisturls },
          function () {
            if (chrome.runtime.lastError) {
              console.error("Error saving data:", chrome.runtime.lastError);
            } else {
              console.log("Data saved successfully from activestate page");
            }
          }
        );
          // Save to localStorage
        localStorage.setItem("BlacklistCategories", JSON.stringify(selectedBlacklistCategories));
        localStorage.setItem("WhitelistCategories", JSON.stringify(selectedWhitelistCategories));
      } catch (error) {
        console.error("Error parsing schedules:", error);
      }
    } else {
      console.error("No schedules found in localStorage.");
    }

    

    interval = window.setInterval(() => {
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
    }
    if (motivationalInterval) {
      clearInterval(motivationalInterval);
    }
  });

// Function to fetch and display a quote
async function showMotivationalCue() {
    currentQuote = await QuoteService.fetchQuote();
    showQuote = true;

    // Auto-hide the quote after 5 seconds
    setTimeout(() => {
      showQuote = false;
    }, 10000);
  }

  // Start the motivational cues when the session begins
  function activateCues() {
    if (!motivationalInterval) {
      showMotivationalCue(); // Show the first quote immediately
    }
  }

  // Stop the motivational cues
  function deactivateCues() {
    if (motivationalInterval) {
      clearInterval(motivationalInterval);
      motivationalInterval = null;
    }
    showQuote = false;
  }

  function toggleBionify() {
  // Toggle the bionic enabled state
  isBionicEnabled = !isBionicEnabled;
  }

  function toggleUnbionify() {
  // Toggle the unbionify state
  isBionicEnabled = !isBionicEnabled;
  }


  onMount(() => {
    activateCues(); // Automatically start cues when the session begins
  });

  onDestroy(() => {
    deactivateCues(); // Clean up intervals when the component is destroyed
  });

  function stopActivity() {
    console.log("Activity Stopped");
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
    goToBlackList_WhiteListPage();
  }

  function goToBlackList_WhiteListPage() {
    currentPage.set('BlackList_WhiteListPage');
  }

  function bionify() {
    console.log('bionic')
    chrome.runtime.sendMessage({ action: "activateBionicReading" }, () => {
      isBionicEnabled = true; // Update state locally
    });
    
  }

  function unbionify() {
    chrome.runtime.sendMessage({ action: "deactivateBionicReading" }, () => {
      isBionicEnabled = false; // Update state locally
    });
  }


    
</script>

<MotivationalQuote bind:isVisible={showQuote} quote={currentQuote} />

<div class="container">
  <div class="header">
    <img src="/cover.png" alt="MindAnchor Logo" width="25px" height="2px">
    <h1> MindAnchor</h1>
  </div>
  <hr class="header-hr">
  
  <!-- Buttons -->
  <div class="buttons">
    <button id="bionifyButton" class="btn" on:click={toggleBionify} class:btn-primary={!isBionicEnabled} class:btn-secondary={isBionicEnabled} disabled={isBionicEnabled}>Bionify webpage text</button>
    <button id="unbionifyButton" class="btn" on:click={toggleUnbionify} class:btn-primary={isBionicEnabled} class:btn-secondary={!isBionicEnabled} disabled={!isBionicEnabled}>Unbionify webpage text</button>
  </div>
  
  <div class="buttons">
    <button class="btn" on:click={activateCues} class:btn-primary={!isCuesActive}>Give me some motivation!</button>
  </div>

  <div class="actions">
    <button class="btn stop-btn" on:click={stopActivity}>Stop current activity</button>
    <p class="countdown">The dashboard will close in <strong>{countdown} seconds!</strong> </p>
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


  h1 {
    font-size: 1.8em;
    margin: 0 0 10px;
    font-weight: bold;
  }

  hr {
    border: 1px solid#73707E;
    margin-bottom: 20px;
  }

  .header {
    display: flex;
    height: 25px;
    margin-bottom: 10px;
  }

  .header h1 {
    font-size: 1.5em;
    margin-left: 10;
    margin-right: 400px;
  }

  .header img {
    display: block;
  }

  .header-hr {
    width: 100%;
    border: 1.5px solid rgb(1, 1, 124);
    
  }

  .buttons{
    display: flex;
    justify-content: center;
    gap: 50px;
    margin-top: 20px;
    
  }

  .btn {
    padding: 10px 50px;
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
    transform: scale(1.05);
  }

  .actions {
    text-align: center;
    margin-top: 20px;
  }

  .stop-btn {
    text-align: center;
    background: red;
    color: white;
    border-radius: 10px;
    margin-top: 20px;
    align-items: center;
    margin-bottom: 10px;
  }

  .stop-btn:hover{
    transform: scale(1.05);
  }

  .countdown {
    text-align: center;
    font-size: 18px;
  }


</style>