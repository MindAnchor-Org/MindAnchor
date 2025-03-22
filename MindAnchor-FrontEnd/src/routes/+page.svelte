<script>
    import WelcomePage from './Welcome_Page/WelcomePage.svelte';
    import BlackListWhiteListPage from './BlackList_WhiteList_Page/BlackList_WhiteListPage.svelte';
    import T_and_C_Page from './T_and_C_Page/T_and_C_Page.svelte';
	import { currentPage } from '../lib/store';
	import ActiveStatePage from './Active_State/Active_State_Page.svelte';
    import Progress_Chart from './Progress_Chart/Progress_Chart.svelte';
  import SubscriptionPlan from './Subscription/SubscriptionPlan.svelte';
  import Settings from './Settings/Settings.svelte';
  import PaymentsPage from './Payments_page/Payments_page.svelte';
  import PaymentSuccess from './Payment_Success/Payment_Success.svelte';
</script>
  
{#if $currentPage === 'WelcomePage'}
    <WelcomePage />
{:else if $currentPage === 'BlackList_WhiteListPage'}
    <BlackListWhiteListPage />
{:else if $currentPage === 'T_and_C_Page'}
    <T_and_C_Page />
{:else if $currentPage === 'ProgressChart'}
    <Progress_Chart />
{:else if $currentPage === 'Active_State_Page'}
    <ActiveStatePage/> 
{:else if $currentPage === 'Subscription'}
    <SubscriptionPlan/> 
{:else if $currentPage === 'Settings'}
    <Settings/> 
{:else if $currentPage === 'Payments_page'}
    <PaymentsPage/>
    {:else if $currentPage === 'Payment_Success'}
    <PaymentSuccess/>
{/if}
