<script lang="ts">
  export let isVisible: boolean = false;
  export let quote: string = "";
  let dialogElement: HTMLDialogElement;

  function handleClose() {
    isVisible = false;
    dialogElement?.close();
  }

  $: if (isVisible && dialogElement) {
    dialogElement.showModal();
  }
</script>

{#if isVisible}
  <dialog 
    class="quote-overlay"
    bind:this={dialogElement}
    on:close={handleClose}
  >
    <div class="quote-container">
      <button 
        class="close-button" 
        on:click={handleClose}
        aria-label="Close quote"
      >×</button>
      <div class="quote-content">
        <p>"{quote}"</p>
      </div>
    </div>
  </dialog>
{/if}

<style>
  .quote-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  }

  .quote-container {
    background-color: white;
    padding: 2rem;
    border-radius: 10px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    max-width: 500px;
    position: relative;
    animation: slideIn 0.3s ease-out;
  }

  .quote-content {
    text-align: center;
    font-size: 1.2rem;
    font-family: 'Inria Sans', sans-serif;
    color: #19006f;
  }

  .close-button {
    position: absolute;
    top: 10px;
    right: 10px;
    background: none;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
    color: #666;
  }

  .close-button:hover {
    color: #333;
  }

  @keyframes slideIn {
    from {
      transform: translateY(-20px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
</style> 