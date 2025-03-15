<script lang="ts">
  import { currentPage } from "../../lib/store";
  import sites from "../../lib/data/top-sites.json";

  // Check for browser environment
  const browser = typeof window !== 'undefined';

  type Category = { name: string; selected: boolean; disabled: boolean };

  // Initialize categories and URLs with default values
  let blacklistCategories: Category[] = [
    { name: "Education", selected: false, disabled: false },
    { name: "Technology", selected: false, disabled: false },
    { name: "News", selected: false, disabled: false },
    { name: "Sports", selected: false, disabled: false },
    { name: "Streaming Platforms", selected: false, disabled: false },
    { name: "Gaming", selected: false, disabled: false },
    { name: "Forums", selected: false, disabled: false },
    { name: "Shopping", selected: false, disabled: false },
    { name: "Travel/Tourism", selected: false, disabled: false },
    { name: "Blogs/Article", selected: false, disabled: false },
    { name: "Encyclopedia", selected: false, disabled: false },
  ];

  let whitelistCategories: Category[] = [
    { name: "Education", selected: false, disabled: false },
    { name: "Technology", selected: false, disabled: false },
    { name: "News", selected: false, disabled: false },
    { name: "Sports", selected: false, disabled: false },
    { name: "Streaming Platforms", selected: false, disabled: false },
    { name: "Gaming", selected: false, disabled: false },
    { name: "Forums", selected: false, disabled: false },
    { name: "Shopping", selected: false, disabled: false },
    { name: "Travel/Tourism", selected: false, disabled: false },
    { name: "Blogs/Article", selected: false, disabled: false },
    { name: "Encyclopedia", selected: false, disabled: false },

  ];

  let blacklistUrl: string = ""; // Temp store for blacklist URL
  let whitelistUrl: string = ""; // Temp store for whitelist URL
  let blacklistUrls: string[] = [];
  let whitelistUrls: string[] = [];
  let activeTab: "blacklist" | "whitelist" = "blacklist";
  let showHelpPopup: boolean = false; // Controls visibility of help popup
  let helpText: string = "This page allows you to manage your blacklist and whitelist categories as well as add URLs to these lists.";

  let filteredBlacklistSuggestions: string[] = [];
  let filteredWhitelistSuggestions: string[] = [];

  // Handle URL input and filtering for suggestions
  function filterSuggestions(query: string, list: string[]): string[] {
    return list
      .filter((url) => url.toLowerCase().includes(query.toLowerCase()))
      .slice(0, 6); // Limit to first 6 results
  }

  function updateBlacklistSuggestions(): void {
    filteredBlacklistSuggestions = filterSuggestions(blacklistUrl, sites);
  }

  function updateWhitelistSuggestions(): void {
    filteredWhitelistSuggestions = filterSuggestions(whitelistUrl, sites);
  }

  // Toggle category selection and update reactivity
  function toggleCategory(index: number, type: "blacklist" | "whitelist"): void {
    let categories = type === "blacklist" ? blacklistCategories : whitelistCategories;
    let otherCategories = type === "blacklist" ? whitelistCategories : blacklistCategories;

    // Toggle the selected state
    categories[index].selected = !categories[index].selected;

    // Update the disabled state of the corresponding category in the other list
    otherCategories[index].disabled = categories[index].selected;

    // Trigger reactivity by reassigning the arrays
    if (type === "blacklist") {
      blacklistCategories = [...blacklistCategories];
      whitelistCategories = [...whitelistCategories];
    } else {
      whitelistCategories = [...whitelistCategories];
      blacklistCategories = [...blacklistCategories];
    }
  }

  // Add URL to the appropriate list
  function addUrl(type: "blacklist" | "whitelist"): void {
    if (type === "blacklist" && blacklistUrl.trim()) {
      blacklistUrls = [...blacklistUrls, blacklistUrl];
      blacklistUrl = "";
      updateBlacklistSuggestions();
    } else if (type === "whitelist" && whitelistUrl.trim()) {
      whitelistUrls = [...whitelistUrls, whitelistUrl];
      whitelistUrl = "";
      updateWhitelistSuggestions();
    }
  }

  // Remove URL from the appropriate list
  function removeUrl(type: "blacklist" | "whitelist", index: number): void {
    if (type === "blacklist") {
      blacklistUrls = blacklistUrls.filter((_, i) => i !== index);
    } else {
      whitelistUrls = whitelistUrls.filter((_, i) => i !== index);
    }
  }

  // Reset data to default values
  function resetToDefaults(): void {
    const defaultSchedules = [
      {
        blacklistWhitelist: {
          blacklistUrls: [],
          whitelistUrls: [],
          blacklistCategories: [
            { name: "Education", selected: false, disabled: false },
            { name: "Technology", selected: false, disabled: false },
            { name: "News", selected: false, disabled: false },
            { name: "Sports", selected: false, disabled: false },
            { name: "Streaming Platforms", selected: false, disabled: false },
            { name: "Gaming", selected: false, disabled: false },
            { name: "Forums", selected: false, disabled: false },
            { name: "Shopping", selected: false, disabled: false },
            { name: "Travel/Tourism", selected: false, disabled: false },
            { name: "Blogs/Article", selected: false, disabled: false },
            { name: "Encyclopedia", selected: false, disabled: false },
          ],
          whitelistCategories: [
            { name: "Education", selected: false, disabled: false },
            { name: "Technology", selected: false, disabled: false },
            { name: "News", selected: false, disabled: false },
            { name: "Sports", selected: false, disabled: false },
            { name: "Streaming Platforms", selected: false, disabled: false },
            { name: "Gaming", selected: false, disabled: false },
            { name: "Forums", selected: false, disabled: false },
            { name: "Shopping", selected: false, disabled: false },
            { name: "Travel/Tourism", selected: false, disabled: false },
            { name: "Blogs/Article", selected: false, disabled: false },
            { name: "Encyclopedia", selected: false, disabled: false },
          ],
        },
      },
    ];

    localStorage.setItem("schedules", JSON.stringify(defaultSchedules));
    loadScheduleData(); // Reload the data after resetting
  }

  // Load existing schedule data from localStorage
  function loadScheduleData(): void {
    if (browser) {
      try {
        const storedData = localStorage.getItem("schedules");
        if (storedData) {
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
            blacklistUrls = schedule.blacklistWhitelist.blacklistUrls;
            whitelistUrls = schedule.blacklistWhitelist.whitelistUrls;
            blacklistCategories = schedule.blacklistWhitelist.blacklistCategories;
            whitelistCategories = schedule.blacklistWhitelist.whitelistCategories;

            console.log("Loaded blacklistCategories:", blacklistCategories);

            // Filter selected categories
            const selectedBlacklistCategories = blacklistCategories
              .filter((category) => category.selected)
              .map((category) => category.name);

            const selectedWhitelistCategories = whitelistCategories
              .filter((category) => category.selected)
              .map((category) => category.name);

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

            // Save to localStorage
            localStorage.setItem("BlacklistCategories", JSON.stringify(selectedBlacklistCategories));
            localStorage.setItem("WhitelistCategories", JSON.stringify(selectedWhitelistCategories));
          } else {
            console.error("Invalid data structure in schedules. Resetting to defaults.");
            resetToDefaults();
          }
        } else {
          console.log("No schedules found in localStorage. Using defaults.");
          resetToDefaults();
        }
      } catch (error) {
        console.error("Error parsing schedules:", error);
        resetToDefaults();
      }
    }
  }

  // Save updated data to localStorage
  function confirm(): void {
    if (browser) {
      const newSchedule = {
        blacklistWhitelist: {
          blacklistCategories,
          whitelistCategories,
          blacklistUrls,
          whitelistUrls,
        },
      };

      // Save the updated schedule data to localStorage
      localStorage.setItem("schedules", JSON.stringify([newSchedule]));

      // Navigate to the active state page
      goToActiveStatePage();
    }
  }

  // Reset data to default state
  function discard(): void {
    if (browser) {
      resetToDefaults();
    }
  }

  // Load existing data when the page initializes (only in the browser)
  if (browser) {
    loadScheduleData();
  }
  // Switch between blacklist and whitelist tabs
  function switchTab(tab: "blacklist" | "whitelist"): void {
    activeTab = tab;
  }

  // Toggle the help popup
  function toggleHelpPopup(): void {
    showHelpPopup = !showHelpPopup;
  }

  // Navigation functions
  function goToUserProgress() {
    currentPage.set('ProgressChart');
  }

  function goToSettings() {
    currentPage.set('Settings');
  }

  function goToSubscription() {
    currentPage.set('Subscription');
  }

  function goToActiveStatePage() {
    currentPage.set('Active_State_Page');
  }
</script>

<div class="page2-container">
  <div class="page2-header">
    <img src="/cover.png" alt="MindAnchor Logo" width="25px" height="1px"/>
    <h1>MindAnchor</h1>
    <button class="page2-help" on:click={toggleHelpPopup}>?</button>
  </div>
  <hr>
  <nav class="nav-container">
    <div class="nav-item-active">
      <span class="icon">📅</span> Schedules
    </div>
    <div class="nav-item">
      <button class="icon" on:click={goToUserProgress} type="button">
        📊 User Progress
      </button>
    </div>    
    <div class="nav-item">
      <button class="icon" on:click={goToSubscription} type="button">
        $ Subscription
      </button>
    </div>
    <div class="nav-item">
      <button class="icon" on:click={goToSettings} type="button">
        ⚙️ Settings
      </button>
    </div>
  </nav>
  
  <div class="page2-tabs">
    <button
      class="page2-tab {activeTab === 'blacklist' ? 'page2-active' : ''}"
      on:click={() => switchTab("blacklist")}
    >
      Blacklist
    </button>
    <button
      class="page2-tab {activeTab === 'whitelist' ? 'page2-active' : ''}"
      on:click={() => switchTab("whitelist")}
    >
      Whitelist
    </button>
  </div>
  <div class="page2-content">
    <label for="page2-categories" class="page2-section-title">Content Categories</label>
    <div id="page2-categories" class="page2-categories">
      {#if activeTab === "blacklist"}
        {#each blacklistCategories as { name, selected, disabled }, index}
          <button
            class:selected={selected}
            class:disabled={disabled}
            on:click={() => toggleCategory(index, "blacklist")}
            disabled={disabled}
          >
            {name} {selected ? "✖" : "+"}
          </button>
        {/each}
      {:else}
        {#each whitelistCategories as { name, selected, disabled }, index}
          <button
            class:selected={selected}
            class:disabled={disabled}
            on:click={() => toggleCategory(index, "whitelist")}
            disabled={disabled}
          >
            {name} {selected ? "✖" : "+"}
          </button>
        {/each}
      {/if}
    </div>
    <label for="page2-urls" class="page2-section-title">Website URLs</label>
    <div id="page2-urls" class="page2-urls">
      {#if activeTab === "blacklist"}
        <div class="page2-url-input">
          <input
            type="text"
            bind:value={blacklistUrl}
            placeholder="Add blacklist URL"
            list="blacklist-suggestions"
            on:input={updateBlacklistSuggestions}
            on:keydown={(e) => e.key === "Enter" && addUrl("blacklist")}
          />
          <button on:click={() => addUrl("blacklist")}>+</button>
          <datalist id="blacklist-suggestions">
            {#each filteredBlacklistSuggestions as suggestion}
              <option value={suggestion} ></option>
            {/each}
          </datalist>
        </div>
        <div class="page2-url-list">
          <ul>
            {#each blacklistUrls as url, index}
              <li>
                {url}
                <button on:click={() => removeUrl("blacklist", index)}>✖</button>
              </li>
            {/each}
          </ul>
        </div>
      {:else}
        <div class="page2-url-input">
          <input
            type="text"
            bind:value={whitelistUrl}
            placeholder="Add whitelist URL"
            list="whitelist-suggestions"
            on:input={updateWhitelistSuggestions}
            on:keydown={(e) => e.key === "Enter" && addUrl("whitelist")}
          />
          <button on:click={() => addUrl("whitelist")}>+</button>
        </div>
        <datalist id="whitelist-suggestions">
          {#each filteredWhitelistSuggestions as suggestion}
            <option value={suggestion}></option>
          {/each}
        </datalist>
        <div class="page2-url-list">
          <ul>
            {#each whitelistUrls as url, index}
              <li>
                {url}
                <button on:click={() => removeUrl("whitelist", index)}>✖</button>
              </li>
            {/each}
          </ul>
        </div>
      {/if}
    </div>
    <div class="page2-actions">
      <button class="page2-confirm" on:click={confirm}>Confirm Blacklist & Whitelist</button>
      <button class="page2-discard" on:click={discard}>Discard This Schedule</button>
    </div>
  </div>
</div>

{#if showHelpPopup}
  <div class="page2-help-popup">
    <div class="page2-popup-content">
      <p>{helpText}</p>
      <button on:click={toggleHelpPopup}>Close</button>
    </div>
  </div>
{/if}

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

  .page2-container {
    width: 984px;
    height: 570px;
    border: 1px solid #ccc;
    background-color: #fff;
    padding: 20px;
    box-sizing: border-box;
    overflow: hidden;
    font-family: 'Inria Sans', sans-serif;
  }

  .page2-header {
    display: flex;
  }

  .page2-header h1 {
    font-size: 1.5em;
    margin-left: 10;
    margin-right: 400px;
    font-weight: bold;
  }
  .page2-header img {
    display: block;
  }
  .page2-header .page2-help {
    background: none;
    border: 2px solid black;
    border-radius: 50%;
    width: 30px;
    height: 30px;
    font-weight: bold;
    cursor: pointer;
    margin-left: 200px;
  }

  .page2-help-popup {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .page2-popup-content {
    background: white;
    padding: 20px;
    border-radius: 10px;
    width: 300px;
    text-align: center;
  }

  .page2-popup-content button {
    background: #2d2d84;
    color: white;
    padding: 10px;
    border: none;
    cursor: pointer;
    border-radius: 5px;
    margin-top: 10px;
  }

  .page2-tabs {
    display: flex;
    justify-content: center;
    gap: 20px;
    margin-bottom: 20px;
  }

  .page2-tab {
    background: #2d2d84;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
  }

  .page2-tab.page2-active {
    background: black;
  }

  .page2-section-title {
    font-weight: bold;
    margin-bottom: 10px;
    display: block;
  }

  .page2-categories {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin-bottom: 20px;
    margin-left: 100px;
    margin-right: 60px;
  }

  .page2-categories button {
    border: 1px solid #ccc;
    border-radius: 20px;
    padding: 15px;
    cursor: pointer;
    font-size: 0.9em;
  }

  .selected {
    background: gray;
    color: white;
  }

  .disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }

  .page2-urls .page2-url-input {
    display: flex;
    gap: 10px;
    margin-bottom: 10px;
  }

  .page2-urls input {
    flex: 1;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 20px;
  }

  .page2-urls button {
    padding: 8px;
    background: #2d2d84;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }

  .page2-url-list {
    height: 100px;
    max-height: 100px;
    overflow-y: auto;
  }

  .page2-url-list ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .page2-url-list li {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border: 1px solid #ccc;
    padding: 5px 10px;
    margin-bottom: 5px;
    border-radius: 5px;
  }

  .page2-actions {
    display: flex;
    justify-content: space-between;
    margin-top: 1px;
  }

  .page2-confirm {
    background: rgb(1, 1, 124);
    color: white;
    border: none;
    border-radius: 5px;
    padding: 10px 20px;
    cursor: pointer;
  }

  .page2-discard {
    background: red;
    color: white;
    border: none;
    border-radius: 5px;
    padding: 10px 20px;
    cursor: pointer;
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
    margin-bottom: 10px;
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