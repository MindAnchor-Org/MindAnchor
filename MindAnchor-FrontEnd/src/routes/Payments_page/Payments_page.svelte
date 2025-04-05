<script lang="ts">
  import { currentPage } from "../../lib/store";

  let email = '';
  let cardNumber = '';
  let expiry = '';
  let cvc = '';
  let cardholderName = '';
  let country = 'sri-lanka';

  let emailError = '';
  let cardNumberError = '';
  let expiryError = '';
  let cvcError = '';
  let cardholderNameError = '';
  
  function formatCardNumber(event: Event) {
    const input = event.target as HTMLInputElement;
    const digitsOnly = input.value.replace(/\D/g, '');
    const formatted = digitsOnly.replace(/(.{4})/g, '$1 ').trim();
    cardNumber = formatted;
  }

  function validateEmail(email: string): boolean {
    const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    emailError = isValid ? '' : 'Invalid email format.';
    return isValid;
  }

  function validateCardNumber(number: string): boolean {
    const cleanNumber = number.replace(/\s+/g, '');
    if (!/^\d{13,19}$/.test(cleanNumber)) {
      cardNumberError = 'Card number must be 13-19 digits.';
      return false;
    }

    
    let sum = 0, shouldDouble = false;
    for (let i = cleanNumber.length - 1; i >= 0; i--) {
      let digit = parseInt(cleanNumber.charAt(i));
      if (shouldDouble) {
        digit *= 2;
        if (digit > 9) digit -= 9;
      }
      sum += digit;
      shouldDouble = !shouldDouble;
    }

    const isValid = sum % 10 === 0;
    cardNumberError = isValid ? '' : 'Invalid card number.';
    return isValid;
  }

  function validateExpiry(expiry: string): boolean {
    const match = expiry.match(/^(\d{2})\s?\/\s?(\d{2})$/);
    if (!match) {
      expiryError = 'Expiry must be in MM/YY format.';
      return false;
    }
    const [_, monthStr, yearStr] = match;
    const month = parseInt(monthStr);
    const year = parseInt('20' + yearStr);

    if (month < 1 || month > 12) {
      expiryError = 'Invalid month.';
      return false;
    }

    const now = new Date();
    const expiryDate = new Date(year, month);
    const isValid = expiryDate > now;
    expiryError = isValid ? '' : 'Card has expired.';
    return isValid;
  }

  function validateCVC(cvcVal: string): boolean {
    const isValid = /^\d{3,4}$/.test(cvcVal);
    cvcError = isValid ? '' : 'CVC must be 3 or 4 digits.';
    return isValid;
  }

  function validateCardholder(name: string): boolean {
    const isValid = /^[a-zA-Z]+(?: [a-zA-Z]+)+$/.test(name);
    cardholderNameError = isValid ? '' : 'Enter full name on card.';
    return isValid;
  }

  function validateForm(): boolean {
    const validations = [
      validateEmail(email),
      validateCardNumber(cardNumber),
      validateExpiry(expiry),
      validateCVC(cvc),
      validateCardholder(cardholderName)
    ];
    return validations.every(Boolean);
  }

  const handleSubmit = (event: SubmitEvent) => {
    event.preventDefault();
    if (!validateForm()) {
      return;
    }

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