<svelte:head>
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" />
	<link
		href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;500;700;800&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

<nav>
	<a href="/login">Login</a>
	<a href="/payments">Payment</a>
</nav>
<slot />

<style>
	@import './global.css';
</style>
