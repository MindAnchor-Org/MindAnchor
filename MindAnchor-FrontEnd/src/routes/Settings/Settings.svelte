<script>
    import { currentPage } from "../../lib/store";
  
      function goToScheduleSummaryPage(){
          currentPage.set('ScheduleSummaryPage');
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
  </script>
  <style>
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
  <div class="container">
      <div class="page1-header">
          <img src="/icon.png" alt="MindAnchor Logo" width="25px" height="2px">
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
              <button class="icon" on:click={goToUserProgress} type="button">
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
      <h1>This is Settings page</h1>
  </div>