<script>
    import WelcomePage from './Welcome_Page/WelcomePage.svelte';
    import Dashboard from './DashBoard_Page/Dashboard.svelte';
    import SchedulePage from './Schedule_Page/SchedulePage.svelte';
    import BlackListWhiteListPage from './BlackList_WhiteList_Page/BlackList_WhiteListPage.svelte';
    import ScheduleSummaryPage from './Schedule_Summary_Page/ScheduleSummaryPage.svelte';
    import T_and_C_Page from './T_and_C_Page/T_and_C_Page.svelte';
	import { currentPage } from '../lib/store';
	import ActiveStatePage from './Active_State/Active_State_Page.svelte';
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
{:else if $currentPage === 'Active_State_Page'}
    <ActiveStatePage/>
{/if}
