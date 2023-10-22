<svelte:head>
  <title>Login</title>
</svelte:head>

<script>
  import LoginForm from '$lib/components/loginForm.svelte'
</script>

<main class="main_form">
	<div class="form">
		<figure class="form_logo">
			<div class="logo_circle">t</div>
			<div class="logo_testing">testing</div>
		</figure>

		<header class="form_header">
			<h5 class="form_header_h5">Welcome</h5>
			<h1 class="form_header_h1">Log in</h1>
			<p class="form_header_p">Please fill your informations</p>
		</header>

    <LoginForm/>
    
	</div>
</main>

<style>
	.main_form {
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 1em;
	}
	.form_logo {
		display: flex;
		justify-content: center;
		gap: 1em;
		align-items: center;
		color: var(--color-base-800, #141416);
		font-family: 'Oleo Script Swash Caps';
	}
	.logo_circle {
		border-radius: 0.9em 0.9em 0.9em 0.2em;
		background: var(--color-secondary-900);
		padding: 0.3em;
		width: 1em;
		height: 1em;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		font-size: 1.875em;
		color: var(--color-white-100);
	}
	.logo_testing {
		font-size: 1.875em;
	}
	.form {
		display: flex;
		height: 100%;
		width: 24.375em;
		padding: 3em 1em;
		flex-direction: column;
		align-items: center;
		gap: 3em;
		border-radius: 1em;
		color: var(--color-base-800);
	}
	.form_header {
		display: flex;
		width: 100%;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		gap: 1em;
	}
	.form_header_h5 {
		font-size: 1.25em;
		font-weight: 700;
	}
	.form_header_h1 {
		font-size: 3em;
		font-weight: 700;
	}
	.form_header_p {
		font-size: 0.875em;
		font-style: normal;
		font-weight: 500;
	}
	
</style>
