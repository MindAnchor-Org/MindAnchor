<script lang="ts">
	import '../app.css';
	let { children } = $props();
</script>

<svelte:head>
  <link rel="icon" type="image/x-icon" href="/icon.png" />
</svelte:head>


{@render children()}
