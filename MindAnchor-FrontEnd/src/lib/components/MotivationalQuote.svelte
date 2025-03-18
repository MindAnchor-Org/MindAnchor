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
    top: 10px;
    right: 10px;
    width: 300px;
    background-color: white;
    border: 1px solid #ddd;
    border-radius: 10px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    z-index: 1000;
    padding: 15px;
  }

  .quote-container {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }

  .quote-content {
    font-size: 1rem;
    font-family: 'Inria Sans', sans-serif;
    color: #19006f;
  }

  .close-button {
    align-self: flex-end;
    background: none;
    border: none;
    font-size: 1.2rem;
    cursor: pointer;
    color: #666;
  }

  .close-button:hover {
    color: #333;
  }
</style>