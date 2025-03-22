<script lang="ts">
    import { currentPage } from "../../lib/store";
    const goToHome = () => {
    
        currentPage.set('BlackList_WhiteListPage');
    }
  </script>
  
  <div class="success-container">
    <div class="success-icon">
      <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#22c55e" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
        <polyline points="22 4 12 14.01 9 11.01"></polyline>
      </svg>
    </div>
    
    <h1>Payment Successful</h1>
    
    <p>Thank You For Your Payment. Now You Can Use MindAnchor Premium Features.</p>
    
    <button on:click={goToHome}>Return to Home</button>
  </div>
  
  <style>
    .success-container {
      background: white;
      padding: 4rem;
      border-radius: 1rem;
      box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
      text-align: center;
      min-width: 300px;
      max-width: 500px;
      margin: 0 auto;

    }
  
    .success-icon {
      margin-bottom: 1.5rem;
      display: flex;
      justify-content: center;
    }
  
    h1 {
      color: #111827;
      font-size: 1.875rem;
      font-weight: 600;
      margin-bottom: 1rem;
    }
  
    p {
      color: #6b7280;
      margin-bottom: 2rem;
      line-height: 1.5;
    }
  
    button {
      background-color: #22c55e;
      color: white;
      padding: 0.75rem 1.5rem;
      border-radius: 0.5rem;
      border: none;
      font-weight: 500;
      cursor: pointer;
      transition: background-color 0.2s;
    }
  
    button:hover {
      background-color: #16a34a;
    }
  </style>