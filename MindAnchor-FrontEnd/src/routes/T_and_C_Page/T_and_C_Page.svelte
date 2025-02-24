<script>
  import { currentPage } from "../../lib/store";

    /* import { onMount } from 'svelte'; */ // Not needed in this case
    let agreed = false;
  </script>
  
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
      background-color: #f0f0f0;
    }
  
    .container {
      width: 450px;
      border: 1px solid #0e0c0c;
      background-color: #fff;
      padding: 20px;
      box-sizing: border-box;
      font-family: 'Inria Sans', sans-serif;
      border-radius: 10px;
    }
  
    .header {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 10px;
    }
  
    .header img {
      width: 40px;
      margin-right: 10px;
    }
  
    .terms-box {
      width: 100%;
      height: 200px;
      overflow-y: auto;
      border: 1px solid black;
      padding: 10px;
      background: #fff;
    }
  
    .checkbox-container {
      display: flex;
      align-items: center;
      margin-top: 10px;
    }
  
    .checkbox-container input {
      margin-right: 10px;
    }
  
    .continue-btn {
      background-color: rgb(1, 1, 124);
      color: white;
      border: none;
      padding: 10px;
      border-radius: 5px;
      cursor: pointer;
      width: 100%;
      margin-top: 10px;
    }
  
    .continue-btn:disabled {
      background-color: grey;
      cursor: not-allowed;
    }
  </style>
  
  <div class="container">
    <div class="header">
      <img src="/icon.png" alt="MindAnchor Logo">
      <h2>MindAnchor</h2>
    </div>
  
    <h3>TERMS AND CONDITIONS</h3>
    <div class="terms-box">
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero.
        Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis
        sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta.
      </p>
      <p>
        Mauris massa. Vestibulum lacinia arcu eget nulla. Class aptent taciti sociosqu ad litora torquent
        per conubia nostra, per inceptos himenaeos.
      </p>
    </div>
  
    <div class="checkbox-container">
      <input id="agree" type="checkbox" bind:checked={agreed}>
      <label for="agree">I agree to all terms and conditions</label>
    </div>
  
    <button class="continue-btn" on:click={() => {
      alert('Continuing...');
      currentPage.set("WelcomePage");
      }} disabled={!agreed}>
      Continue
    </button>
  </div>
  