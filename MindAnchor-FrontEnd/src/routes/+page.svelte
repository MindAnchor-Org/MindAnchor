<script>
    import { currentPage } from '../store.js';
    import WelcomePage from '../components/WelcomePage.svelte';
    import Dashboard from '../components/Dashboard.svelte';
    import SchedulePage from '../components/SchedulePage.svelte';
    import BlackListWhiteListPage from '../components/BlackList_WhiteListPage.svelte';
    import ScheduleSummaryPage from '../components/ScheduleSummaryPage.svelte';
    import T_and_C_Page from '../components/T_and_C_Page.svelte';
  </script>
  
  {#if $currentPage === 'WelcomePage'}
      <WelcomePage />
  {:else if $currentPage === 'Dashboard'}
      <Dashboard />
  {:else if $currentPage === 'SchedulePage'}
      <SchedulePage />
  {:else if $currentPage === 'BlackList_WhiteListPage'}
      <BlackListWhiteListPage />
  {:else if $currentPage === 'ScheduleSummaryPage'}
      <ScheduleSummaryPage />
  {:else if $currentPage === 'T_and_C_Page'}
      <T_and_C_Page />
  {/if}


  