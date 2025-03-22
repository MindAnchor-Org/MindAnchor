<script lang="ts">
  import { currentPage } from "../../lib/store";

  function goToBlackList_WhiteListPage(){
      currentPage.set('BlackList_WhiteListPage');
  }
  function goToSettings() {
      currentPage.set('Settings');
  }
  function goToSubscription() {
      currentPage.set('Subscription');
  }
  function goToUserProgress() {
    currentPage.set('ProgressChart');
  }
  function goToPaymentsPage() {
    currentPage.set('Payments_page');
  }
  const features = [
  {
    icon: "/pie-chart-icon.png",
    text: "View your focus journey in an interactive pie chart with analysis on key improvements and distraction reductions."
  },
  {
    icon: "/calendar-icon.png", 
    text: "Sort and track your progress over days, weeks, months, or years to identify trends."
  },
  {
    icon: "/streak-icon.png", 
    text: "Earn streak badges and focus points to celebrate your productivity milestones."
  }
];


  const handlePayNow = () => {
  
    console.log('Processing payment...');
  };
</script>

<div class="container">
  <div class="page1-header">
      <img src="/cover.png" alt="MindAnchor Logo" width="25px" height="2px">
      <h1>MindAnchor</h1>
  </div>
  <hr>
  <nav class="nav-container">
      <div class="nav-item">
          <button class="icon" on:click={goToBlackList_WhiteListPage} type="button">
              📅 Schedules
            </button>
      </div>
      <div class="nav-item" >
          <button class="icon" on:click={goToUserProgress} type="button">
            📊 User Progress
          </button>
      </div>    
      <div class="nav-item-active">
        <button class="icon"type="button">
          $ Subscription
        </button>
      </div>
      <div class="nav-item">
        <button class="icon" on:click={goToSettings} type="button">
          ⚙️ Settings
        </button>
      </div>
      </nav>
      <div class="p-6 max-w-2xl mx-auto">
        <h2 class="text-xl font-bold mb-6">What to expect in the premium version?</h2>
        
        <div class="space-y-6 mb-8">
          {#each features as feature}
        <div class="flex items-start gap-4">
          <img src="{feature.icon}" alt="Feature Icon" class="w-8 h-8">
          <p class="text-gray-700">{feature.text}</p>
        </div>
           {/each}
          
        </div>
      
        <div class="rounded-lg p-6 text-center border-2 border-[#0e0c0c] bg-[#CFD7FF]">
          <h3 class="text-2xl font-bold mb-2">Subscription Plan</h3>
          <div class="text-4xl font-bold mb-4">$0.99</div>
          <p class="text-gray-600 mb-6">
            to experience the premium version for a month!
          </p>
          <button
            on:click={handlePayNow}
            on:click={goToPaymentsPage}
            class="w-full bg text-white py-3 rounded-lg font-semibold hover:bg-opacity-90 transition-colors bg-[#00157C]"
          >
            Pay Now
          </button>
        </div>
      
        <div class="text-right mt-4">
          <a href="#rate" class="text-[#00157C] underline">Rate MindAnchor</a>
        </div>
      </div>
</div>


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
</style>