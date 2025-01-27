<script>
  import { currentPage } from '../store.js';
  import SchedulePage from '../SchedulePage.svelte';
  import BackList_WhiteListPage from '../BackList_WhiteListPage.svelte'
</script>

{#if $currentPage === 'SchedulePage'}
  <SchedulePage />
{:else if $currentPage === 'BackList_WhiteListPage'}
  <BackList_WhiteListPage />
{/if}
