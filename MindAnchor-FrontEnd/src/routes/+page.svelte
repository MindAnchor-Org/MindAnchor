<script>
  import { currentPage } from '../store.js';
  import WelcomePage from '../components/WelcomePage.svelte';
  import Dashboard from '../components/Dashboard.svelte'; // Add this component later

</script>

{#if $currentPage === 'WelcomePage'}
    <WelcomePage />
{:else if $currentPage === 'Dashboard'}
    <Dashboard />
{/if}