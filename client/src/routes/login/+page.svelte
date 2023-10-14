<script>
	import { navigate } from 'svelte-routing';
	let email = '';
	let password = '';

	async function handleOnSubmit() {
		try {
			const userData = {
				email,
				password
			};
			const response = await fetch('http://localhost:5005/api/auth/login', {
				method: 'POST',
				body: JSON.stringify(userData),
				headers: {
					'Content-Type': 'application/json'
				}
			});
			const result = await response.json();
			localStorage.setItem('token', result.token);
			navigate('/payments');
		} catch (error) {
			console.log(error);
		}
	}
</script>

<main class="main_form">
	<div class="form">
		<figure class="form_logo">LOGO</figure>

		<header class="form_header">
			<h5 class="form_header_h5">Welcome</h5>
			<h1 class="form_header_h1">Log in</h1>
			<p class="form_header_p">Please fill your informations</p>
		</header>

		<form on:submit|preventDefault={handleOnSubmit} class="form_body">
			<div class="form_body_group">
				<div class="form_group--up">
					<div class="form_group--text">
						<label for="email" class="form_label">Email</label>
						<input bind:value={email} type="email" placeholder="Account@email.com" required />
					</div>
					<span class="icon">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="24"
							height="25"
							viewBox="0 0 24 25"
							fill="none"
						>
							<path
								fill-rule="evenodd"
								clip-rule="evenodd"
								d="M18 5.83334L6 5.83334C4.61929 5.83334 3.5 6.95263 3.5 8.33334L3.5 16.3333C3.5 17.7141 4.61929 18.8333 6 18.8333H18C19.3807 18.8333 20.5 17.7141 20.5 16.3333L20.5 8.33334C20.5 6.95263 19.3807 5.83334 18 5.83334ZM6 4.33334C3.79086 4.33334 2 6.1242 2 8.33334L2 16.3333C2 18.5425 3.79086 20.3333 6 20.3333H18C20.2091 20.3333 22 18.5425 22 16.3333L22 8.33334C22 6.1242 20.2091 4.33334 18 4.33334L6 4.33334Z"
								fill="#141416"
							/>
							<path
								fill-rule="evenodd"
								clip-rule="evenodd"
								d="M8.46967 9.80301C8.76256 9.51012 9.23744 9.51012 9.53033 9.80301L12 12.2727L14.4697 9.80301C14.7626 9.51012 15.2374 9.51012 15.5303 9.80301C15.8232 10.0959 15.8232 10.5708 15.5303 10.8637L12.5303 13.8637C12.2374 14.1566 11.7626 14.1566 11.4697 13.8637L8.46967 10.8637C8.17678 10.5708 8.17678 10.0959 8.46967 9.80301Z"
								fill="#141416"
							/>
						</svg>
					</span>
				</div>
				<div class="form_group--down">
					<div class="form_group--text">
						<label for="password" class="form_label">Password</label>
						<input bind:value={password} type="password" placeholder="Password" required />
					</div>
					<span class="icon">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="24"
							height="25"
							viewBox="0 0 24 25"
							fill="none"
						>
							<path
								fill-rule="evenodd"
								clip-rule="evenodd"
								d="M4.25 15.3333C4.25 11.0531 7.71979 7.58334 12 7.58334C16.2802 7.58334 19.75 11.0531 19.75 15.3333C19.75 19.6136 16.2802 23.0833 12 23.0833C7.71979 23.0833 4.25 19.6136 4.25 15.3333ZM12 9.08334C8.54822 9.08334 5.75 11.8816 5.75 15.3333C5.75 18.7851 8.54822 21.5833 12 21.5833C15.4518 21.5833 18.25 18.7851 18.25 15.3333C18.25 11.8816 15.4518 9.08334 12 9.08334Z"
								fill="#141416"
							/>
							<path
								fill-rule="evenodd"
								clip-rule="evenodd"
								d="M12 13.5833C12.4142 13.5833 12.75 13.9191 12.75 14.3333V16.3333C12.75 16.7476 12.4142 17.0833 12 17.0833C11.5858 17.0833 11.25 16.7476 11.25 16.3333V14.3333C11.25 13.9191 11.5858 13.5833 12 13.5833Z"
								fill="#141416"
							/>
							<path
								fill-rule="evenodd"
								clip-rule="evenodd"
								d="M12 3.08334C10.2051 3.08334 8.75 4.53842 8.75 6.33334V9.33334C8.75 9.74756 8.41421 10.0833 8 10.0833C7.58579 10.0833 7.25 9.74756 7.25 9.33334V6.33334C7.25 3.70999 9.37665 1.58334 12 1.58334C14.6234 1.58334 16.75 3.70999 16.75 6.33334V9.33334C16.75 9.74756 16.4142 10.0833 16 10.0833C15.5858 10.0833 15.25 9.74756 15.25 9.33334V6.33334C15.25 4.53842 13.7949 3.08334 12 3.08334Z"
								fill="#141416"
							/>
						</svg>
					</span>
				</div>
			</div>

			<div class="form_buttons">
				<button type="submit" class="form_buttons--submit">Log in now</button>
				<button class="form_buttons--signup">Sign up</button>
			</div>
		</form>
	</div>
</main>

<style>
	.main_form {
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 3em 1em;
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
		border: 1px solid black;
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
