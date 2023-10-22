<script lang="ts">
	import ImgEmail from '$lib/icons/ImgEmail.svelte'
	import ImgPassword from '$lib/icons/ImgPassword.svelte'
  import { loginText } from '$lib/const/const'
  import { onSubmit } from './../../routes/login/functions'

	let email: string
	let password: string
	const handleOnSubmit = () => {
		onSubmit(email, password)
	}
</script>

<form on:submit|preventDefault={handleOnSubmit} class="form_body">
	<div class="form_body_group">
		<div class="form_group--up">
			<div class="form_group--text">
				<label for="email" class="form_label">{loginText.email}</label>
				<input bind:value={email} type="email" placeholder="Account@email.com" required />
			</div>
			<ImgEmail />
		</div>
		<div class="form_group--down">
			<div class="form_group--text">
				<label for="password" class="form_label">{loginText.password}</label>
				<input bind:value={password} type="password" placeholder="Password" required />
			</div>
			<ImgPassword />
		</div>
	</div>

	<div class="form_buttons">
		<button type="submit" class="form_buttons--submit">{loginText.login}</button>
		<button class="form_buttons--signup">{loginText.signup}</button>
	</div>
</form>

<style>
	.form_body {
		display: flex;
		flex-direction: column;
		gap: 3em;
		width: 100%;
	}
	.form_body_group {
		gap: 0.5em;
		display: flex;
		flex-direction: column;
	}
	.form_group--up {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		background-color: var(--color-base-300);
		padding: 1.5em;
		gap: 0.5em;
		border-radius: 2em 2em 0.5em 0.5em;
	}
	.form_group--down {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		background-color: var(--color-base-300);
		padding: 1.5em;
		gap: 0.5em;
		border-radius: 0.5em 0.5em 2em 2em;
	}
	.form_group--text {
		display: flex;
		flex-direction: column;
		gap: 0.5em;
		width: 100%;
	}
	.form_label {
		font-size: 0.75em;
	}
	input {
		border: none;
		background-color: transparent;
		padding: 0.5em 0;
		font-size: 1em;
		font-weight: 700;
	}
	.form_buttons {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		gap: 1em;
	}
	.form_buttons--submit {
		background-color: var(--color-primary-800);
		display: flex;
		width: 200px;
		padding: 16px 24px;
		justify-content: center;
		align-items: center;
		gap: 12px;
		border: none;
		border-radius: 6.25em;
		font-weight: 700;
		color: var(--color-white-100);
	}
	.form_buttons--signup {
		font-weight: 700;
		display: flex;
		padding: 16px 24px;
		justify-content: center;
		align-items: center;
		border: none;
		background-color: none;
	}
	.form_buttons--signup:hover {
		text-decoration: underline;
	}
	button {
		cursor: pointer;
		background-color: transparent;
	}
</style>
