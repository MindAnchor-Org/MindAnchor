<script lang="ts">
  import { currentPage } from "../../lib/store";

    let email: string = '';
    let cardNumber: string = '';
    let expiry: string = '';
    let cvc: string = '';
    let cardholderName: string = '';
    let country: string = 'sri-lanka';
  
    const handleSubmit = (event: SubmitEvent) => {
      event.preventDefault();
      currentPage.set('Payment_Success');
      
      console.log({
        email,
        cardNumber,
        expiry,
        cvc,
        cardholderName,
        country
      });
    };

    function goToBlackList_WhiteListPage(){
      currentPage.set('BlackList_WhiteListPage');
  }
  </script>
  
  <div class="container">
    <header> 
      <div on:click={goToBlackList_WhiteListPage}>
        <img src="/cover.png" alt="MindAnchor Logo" class="logo">
        <h1><strong>MindAnchor</strong></h1>
      </div>
    </header>
  
    <h2 id="checkout">Checkout</h2>
  
    <div class="plan">
      <label for="plan">Premium version</label>
      <div class="price">$ 0.99</div>
    </div>
  
    <p class="description">Premium version of MindAnchor will only exist for one month</p>
    
    <hr>
  
    <h3 id="paymentMethod">Payment Method</h3>
  
    <form class="payment-form" on:submit={handleSubmit}>
      <label for="email">Email</label>
      <input 
        type="email" 
        id="email" 
        bind:value={email}
        placeholder="Enter your email" 
        required
      >
  
      <label for="card-info">Card information</label>
      <div class="card-wrapper">
        <input 
          type="text" 
          id="card-info" 
          bind:value={cardNumber}
          placeholder="1234 1234 1234 1234" 
          required
        >
        <div class="card-icons">
          <img src="/Visa-Logo.png" alt="Credit/Debit Cards">
        </div>
      </div>
      
      <div class="card-input">
        <input 
          type="text" 
          id="expiry" 
          bind:value={expiry}
          placeholder="MM / YY" 
          required
        >
        <input 
          type="text" 
          id="cvc" 
          bind:value={cvc}
          placeholder="CVC" 
          required
        >
      </div>
  
      <label for="cardholder">Cardholder name</label>
      <input 
        type="text" 
        id="cardholder" 
        bind:value={cardholderName}
        placeholder="Full name on card" 
        required
      >
  
      <label for="country">Country or region</label>
      <select id="country" bind:value={country}>
        <option value="sri-lanka">Sri Lanka</option>
        <option value="usa">United States</option>
        <option value="uk">United Kingdom</option>
        <option value="canada">Canada</option>
      </select>
  
      <button type="submit" class="pay-button">Pay</button>
    </form>
  </div>
  
  <style>
    .container {
      background: white;
      padding: 25px;
      border-radius: 10px;
      box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
      width: 380px;
    }

    #checkout {
      font-size: 22px;
      font-weight: bold;
    }

    #paymentMethod{
      font-size: 18px;
      font-weight: bold;
    }
  
    header {
      display: flex;
      align-items: center;
      gap: 10px;
      margin-bottom: 20px;
    }
  
    .logo {
      width: 40px;
      height: 40px;
    }
  
    h1 {
      margin: 0;
      font-size: 24px;
    }
  
    h2, h3 {
      text-align: left;
    }
  
    .plan {
      display: flex;
      justify-content: space-between;
      margin-bottom: 10px;
      border: #0056b3 1px solid;
      padding: 10px;
      border-radius: 6px;
    }
  
    .price {
      font-weight: bold;
    }
  
    hr {
      margin: 15px 0;
      border: none;
      border-top: 1px solid #eee;
    }
  
    .payment-form label {
      display: block;
      margin-top: 10px;
      font-weight: bold;
      font-size: 14px;
      text-align: left;
    }
  
    .payment-form input,
    .payment-form select {
      width: 100%;
      padding: 10px;
      margin-top: 5px;
      border: 1px solid #ccc;
      border-radius: 6px;
      font-size: 16px;
      text-align: left;
      box-sizing: border-box;
    }
  
    .card-wrapper {
      position: relative;
      display: flex;
      align-items: center;
      border: 1px solid #ccc;
      border-radius: 6px;
      padding: 10px;
      background: white;
      margin-top: 5px;
    }
  
    .card-wrapper input {
      border: none;
      outline: none;
      width: 100%;
      font-size: 16px;
      text-align: left;
      padding: 0;
      margin: 0;
    }
  
    .card-icons {
      display: flex;
      gap: 6px;
    }
  
    .card-icons img {
      width: 60px;
      height: 20px;
    }
  
    .card-input {
      display: flex;
      gap: 5px;
      margin-top: 5px;
    }
  
    .card-input input {
      flex: 1;
      text-align: left;
    }
  
    .pay-button {
      background: #007bff;
      color: white;
      border: none;
      padding: 12px;
      width: 100%;
      margin-top: 15px;
      border-radius: 6px;
      font-size: 16px;
      cursor: pointer;
      transition: background 0.3s;
    }
  
    .pay-button:hover {
      background: #0056b3;
    }
  
    .description {
      color: #666;
      font-size: 14px;
      margin: 5px 0;
    }
  </style>