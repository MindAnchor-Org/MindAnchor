<script lang="ts">
	import { get } from "svelte/store";
	import { scheduleStore } from "../store";

  type Category = { name: string; selected: boolean; disabled: boolean };

  // Blacklist and Whitelist categories
  let blacklistCategories: Category[] = [
    { name: "Education", selected: false, disabled: false },
    { name: "Technology", selected: false, disabled: false },
    { name: "News", selected: false, disabled: false },
    { name: "Sports", selected: false, disabled: false },
    { name: "Entertainment", selected: false, disabled: false },
    { name: "Gaming", selected: false, disabled: false },
    { name: "Social Media", selected: false, disabled: false },
    { name: "Shopping", selected: false, disabled: false },
    { name: "Travel/Tourism", selected: false, disabled: false },
  ];

  let whitelistCategories: Category[] = [
    { name: "Education", selected: false, disabled: false },
    { name: "Technology", selected: false, disabled: false },
    { name: "News", selected: false, disabled: false },
    { name: "Sports", selected: false, disabled: false },
    { name: "Entertainment", selected: false, disabled: false },
    { name: "Gaming", selected: false, disabled: false },
    { name: "Social Media", selected: false, disabled: false },
    { name: "Shopping", selected: false, disabled: false },
    { name: "Travel/Tourism", selected: false, disabled: false },
  ];

  let blacklistUrl: string = ""; //temp store
  let whitelistUrl: string = ""; //temp store
  let blacklistUrls: string[] = [];
  let whitelistUrls: string[] = [];
  let activeTab: "blacklist" | "whitelist" = "blacklist";
  let showHelpPopup: boolean = false; // New state for controlling the help popup visibility
  let helpText: string = "This page allows you to manage your blacklist and whitelist categories as well as add URLs to these lists.";

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

  function addUrl(type: "blacklist" | "whitelist"): void {
    if (type === "blacklist" && blacklistUrl.trim()) {
      blacklistUrls = [...blacklistUrls, blacklistUrl];
      blacklistUrl = "";
    } else if (type === "whitelist" && whitelistUrl.trim()) {
      whitelistUrls = [...whitelistUrls, whitelistUrl];
      whitelistUrl = "";
    }
  }

  function removeUrl(type: "blacklist" | "whitelist", index: number): void {
    if (type === "blacklist") {
      blacklistUrls = blacklistUrls.filter((_, i) => i !== index);
    } else {
      whitelistUrls = whitelistUrls.filter((_, i) => i !== index);
    }
  }

  function confirm(): void {
    const schedule = get(scheduleStore);
    if (!schedule) {
      alert("No scheduling data found. Please go back and confirm the schedule first.");
      return;
    }
    const combinedData = {
      schedule,
      blacklistWhitelist: {
        blacklistCategories,
        whitelistCategories,
        blacklistUrls,
        whitelistUrls
      }
    };

    localStorage.setItem('schedules', JSON.stringify(combinedData));

    console.log("Combined Data Confirmed:", combinedData);

    console.log("Blacklist & Whitelist Confirmed", { blacklistCategories, whitelistCategories, blacklistUrls, whitelistUrls });
  }

  function discard(): void {
    // Reset blacklist categories
    blacklistCategories = blacklistCategories.map((category) => ({
      ...category,
      selected: false,
      disabled: false,
    }));

    // Reset whitelist categories
    whitelistCategories = whitelistCategories.map((category) => ({
      ...category,
      selected: false,
      disabled: false,
    }));

    // Clear URLs and input fields
    blacklistUrls = [];
    whitelistUrls = [];
    blacklistUrl = "";
    whitelistUrl = "";
  }

  function switchTab(tab: "blacklist" | "whitelist"): void {
    activeTab = tab;
  }
  // Function to toggle the help popup
  function toggleHelpPopup(): void {
    showHelpPopup = !showHelpPopup;
  }
</script>

<div class="page2-container">
  <div class="page2-header">
    <img src="/icon.png" alt="MindAnchor Logo" width="25px" height="1px"/>
    <h1>MindAnchor</h1>
    <button class="page2-help" on:click={toggleHelpPopup}>?</button>
  </div>
  <hr />
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
            on:keydown={(e) => e.key === "Enter" && addUrl("blacklist")}
          />
          <button on:click={() => addUrl("blacklist")}>+</button>
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
            on:keydown={(e) => e.key === "Enter" && addUrl("whitelist")}
          />
          <button on:click={() => addUrl("whitelist")}>+</button>
        </div>
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

  hr {
    border: none;
    height: 2px;
    background-color: rgb(1, 1, 124);
    margin: 10px 0;
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
    margin-left: 150px;
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
    height: 140px;
    max-height: 140px;
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
    margin-top: 20px;
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
</style>