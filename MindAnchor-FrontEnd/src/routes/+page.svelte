<script>
  import { currentPage } from '../store.js';
  import SchedulePage from '../SchedulePage.svelte';
  import BlackList_WhiteListPage from '../BlackList_WhiteListPage.svelte'
</script>

{#if $currentPage === 'SchedulePage'}
  <SchedulePage />
{:else if $currentPage === 'BlackList_WhiteListPage'}
  <BlackList_WhiteListPage />
{/if}
