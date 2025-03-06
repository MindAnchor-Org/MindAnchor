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
        if (
          Array.isArray(schedules) &&
          schedules.length > 0 &&
          schedules[0].blacklistWhitelist &&
          Array.isArray(schedules[0].blacklistWhitelist.blacklistUrls) &&
          Array.isArray(schedules[0].blacklistWhitelist.whitelistUrls) &&
          Array.isArray(schedules[0].blacklistWhitelist.blacklistCategories) &&
          Array.isArray(schedules[0].blacklistWhitelist.whitelistCategories)
        ) {
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
        } else {
          console.error("Invalid data structure in schedules.");
        }
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

  async function showMotivationalCue() {
    const quote = await QuoteService.fetchQuote();
    currentQuote = quote;
    showQuote = true;
    // Auto-hide after 5 seconds
    setTimeout(() => {
      showQuote = false;
    }, 5000);
  }

  function activateCues() {
    if (!isMotivationalActive) {
      isMotivationalActive = true;
      console.log("Motivational Cues Activated");
      
      // Show first quote immediately
      showMotivationalCue();
      
      // Set interval for subsequent quotes (8 minutes = 480000 milliseconds)
      motivationalInterval = setInterval(showMotivationalCue, 480000);
      
      // Prefetch quotes for later use
      QuoteService.prefetchQuotes();
    }
  }

  function deactivateCues() {
    if (isMotivationalActive) {
      isMotivationalActive = false;
      if (motivationalInterval) {
        clearInterval(motivationalInterval);
        motivationalInterval = null;
      }
      showQuote = false;
      console.log("Motivational Cues Deactivated");
    }
  }

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
  <div class="page1-header">
    <img src="/icon.png" alt="MindAnchor Logo" width="25px" height="2px">
    <h1>MindAnchor</h1>
  </div>
  <hr />
  
  <!-- Buttons -->
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


  h1 {
    font-size: 1.8em;
    margin: 0 0 10px;
    font-weight: bold;
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

  h2 {
    margin-top: 15px;
    font-weight: bold;
    text-align: center;
  }

  .description {
    text-align: center;
  }

  .actions {
    text-align: center;
    margin-top: 20px;
  }

  strong {
    font-weight: bold;
  }

  hr {
    width: 90%;
    border: 1px solid #222;
    
  }

  .buttons{
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


</style>