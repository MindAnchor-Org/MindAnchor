<script>
  import { currentPage } from "../../lib/store";

    /* import { onMount } from 'svelte'; */ // Not needed in this case
  let agreed = false;

  function handleContinue() {
    currentPage.set("WelcomePage"); // Redirect to WelcomePage after agreeing
  }

  </script>
  
  <style>
    :global(html, body) {
      margin: 0;
      padding: 0;
      overflow: auto;
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
      <img src="/cover.png" alt="MindAnchor Logo">
      <h2>MindAnchor</h2>
    </div>
  
    <h3>TERMS AND CONDITIONS</h3>
    <div class="terms-box">
      <p>
        <b>Introduction</b>
        This Privacy Policy describes how Focalize (“Company” “we,” “us,” or “our”) collects, uses, and discloses your personal information when you use our Chrome extension. It also explains your choices regarding your information and how you can contact us. We value your privacy and encourage you to read the Privacy Policy and use it to make informed decisions.
        By using the Focalize Extension, you acknowledge that you have read and understood the terms of this Privacy Policy.        
      </p>
      <p>
        <b>Information We Collect</b>
        Mind Anchor: You can create custom focus modes within the Extension that define the type of focus mode to be activated and which website categories should be blocked while the mode is active. This information will be stored in our servers.
      </p>
      <p>
        <b>How We Use Your Information </b>
          Mind Anchor: We use the information you provide when creating focus modes to personalize your experience and help you stay focused while browsing.
      </p>
      <p>
        <b>Data Sharing</b>
        We do not share any personal information or website usage data with any third parties.
      </p>
      <p>
        <b>Data Storage</b>
        All information collected by the Extension is stored locally on your device and is never transmitted to our servers. You can access and manage your stored data through the Extension’s settings.
      </p>
    </div>
  
    <div class="checkbox-container">
      <input id="agree" type="checkbox" bind:checked={agreed}>
      <label for="agree">I agree to all terms and conditions</label>
    </div>
    <button class="continue-btn" on:click={handleContinue} disabled={!agreed}>
      Continue
    </button>
  </div>
  