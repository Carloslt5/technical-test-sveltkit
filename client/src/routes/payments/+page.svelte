<script lang="ts">
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';

	type PaymentData = {
		amount: string;
		client_id: number;
		email: string;
		id: number;
		lastlogin: string;
		name: string;
		paid_date: string;
		paid_status: boolean;
		status: boolean;
		checked?: boolean;
	};

	let payments: PaymentData[] = [];
	let totalPayments: number = 0;

	let filter = '';
	let mainCheck = false;

	let rowPerPage = 10;
	let currentPage = 0;

	onMount(async () => {
		fetchData();
	});

	const fetchData = async () => {
		try {
			const storedToken = localStorage.getItem('token');
			const response = await fetch(
				'http://localhost:5005/api/payments?' +
					new URLSearchParams({
						limit: rowPerPage.toString(),
						skip: (currentPage * rowPerPage).toString()
					}),
				{
					method: 'GET',
					headers: {
						Authorization: `Bearer ${storedToken}`,
						'Content-Type': 'application/json'
					}
				}
			);
			if (response.status != 200) {
				goto('/login');
				return;
			}
			const result = await response.json();
			payments = result.payments.map((payment: PaymentData) => ({ ...payment, checked: false }));
			totalPayments = result.total;
			console.log(payments);
		} catch (error) {
			console.log(error);
		}
	};

	const handlerCheck = (id: number) => {
		mainCheck = false;
		for (const payment of payments) {
			if (payment.id === id) {
				payment.checked = !payment.checked;
			}
		}
	};

	const handleMainCheck = () => {
		mainCheck = !mainCheck;
		for (const payment of payments) {
			payment.checked = mainCheck;
		}
		payments = [...payments];
	};

	const handlePrevPage = async () => {
		if (currentPage <= 0) {
			currentPage = 0;
			return;
		}
		currentPage--;
		fetchData();
	};

	const handleNextPage = async () => {
		if (currentPage >= totalPayments / rowPerPage - 1) {
			return;
		}
		currentPage++;
		fetchData();
	};
</script>

<main id="bg_payments">
	<div class="payments_table">
		<div class="payments_filter">
			<form id="payments_form">
				<span class="payments_icon">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="20"
						height="20"
						viewBox="0 0 20 20"
						fill="none"
					>
						<path
							d="M13.4097 14.8822C11.7399 16.1799 9.63851 16.7922 7.53338 16.5942C5.42824 16.3963 3.47766 15.403 2.07881 13.8166C0.679961 12.2303 -0.0619809 10.1701 0.00405863 8.05565C0.0700982 5.94118 0.939153 3.9314 2.43427 2.43552C3.92939 0.939633 5.93814 0.0701341 8.05152 0.00406071C10.1649 -0.0620127 12.224 0.680308 13.8096 2.07987C15.3951 3.47944 16.3879 5.43102 16.5857 7.53723C16.7836 9.64345 16.1717 11.7459 14.8745 13.4166L19.6936 18.2201C20.1016 18.6267 20.1022 19.2872 19.695 19.6946C19.2878 20.1021 18.6273 20.1017 18.2204 19.6939L13.4201 14.8822H13.4097ZM8.31916 14.5495C9.13773 14.5495 9.94829 14.3882 10.7045 14.0748C11.4608 13.7614 12.148 13.302 12.7268 12.7229C13.3056 12.1438 13.7647 11.4563 14.078 10.6996C14.3913 9.94298 14.5525 9.13201 14.5525 8.31302C14.5525 7.49403 14.3913 6.68306 14.078 5.92641C13.7647 5.16976 13.3056 4.48225 12.7268 3.90314C12.148 3.32402 11.4608 2.86465 10.7045 2.55123C9.94829 2.23782 9.13773 2.07651 8.31916 2.07651C6.66598 2.07651 5.08051 2.73356 3.91153 3.90314C2.74256 5.07271 2.08583 6.659 2.08583 8.31302C2.08583 9.96705 2.74256 11.5533 3.91153 12.7229C5.08051 13.8925 6.66598 14.5495 8.31916 14.5495Z"
							fill="#8B83BA"
						/>
					</svg>
				</span>
				<input
					class="payments_input"
					bind:value={filter}
					type="text"
					placeholder="Search Users by Name, Email or Date"
				/>
			</form>
		</div>
		<section class="payments_list">
			<table class="payments_list_content">
				<thead class="payments_list_header">
					<tr>
						<th>
							<label class="control control--checkbox">
								<input type="checkbox" bind:checked={mainCheck} on:click={handleMainCheck} />
								<div class="control__indicator" />
							</label>
						</th>
						<th>NAME</th>
						<th>USER STATUS</th>
						<th>PAYMENT STATUS</th>
						<th>AMOUNT</th>
					</tr>
				</thead>
				<tbody class="payments_list_body">
					{#each payments as payment (payment.id)}
						<tr class={payment.checked ? 'selected' : ''}>
							<label class="control control--checkbox">
								<input
									type="checkbox"
									bind:checked={payment.checked}
									on:click={() => {
										handlerCheck(payment.id);
									}}
								/>
								<div class="control__indicator" />
							</label>
							<td class="payments_list_body_td">
								<p>{payment.name}</p>
								<h5 class="small_text">{payment.email}</h5>
							</td>
							<td class="payments_list_body_td">
								<span class="payments_list_body--status {payment.status ? 'active' : 'inactive'}">
									<div
										class="status--mark {payment.status ? 'status--active' : 'status--inactive'}"
									/>
									{#if payment.status}
										Activo
									{:else}
										Inactivo
									{/if}
								</span>
								<h5 class="small_text">Last login: {new Date(payment.lastlogin).toDateString()}</h5>
							</td>
							<td class="payments_list_body_td">
								<span class="payments_list_body--status {payment.paid_status ? 'paid' : 'unpaid'}">
									<div
										class="status--mark {payment.paid_status ? 'status--paid' : 'status--unpaid'}"
									/>
									{#if payment.paid_status}
										Paid
									{:else}
										Unpaid
									{/if}
								</span>
								<h5 class="small_text">{new Date(payment.paid_date).toDateString()}</h5>
							</td>
							<td class="payments_list_body_td td--amount">
								<p><strong>${payment.amount}</strong></p>
								<h5 class="small_text">USD</h5>
							</td>
							<td class="">
								<p class="small_text">View More</p>
							</td>
						</tr>
					{/each}
				</tbody>
				<tfoot class="payments_list_footer">
					<tr>
						<td>{currentPage + 1} of {Math.ceil(totalPayments / rowPerPage)}</td>
						<td>
							<select bind:value={rowPerPage} class="custom-select" on:change={fetchData}>
								<option value={6}>Rows per page 6</option>
								<option value={10}>Rows per page 10</option>
							</select>
						</td>
						<td>
							<div class="payments_list_footer--pages">
								<button class="custome-button" on:click={handlePrevPage}>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="6"
										height="10"
										viewBox="0 0 6 10"
										fill="none"
									>
										<path
											opacity="0.4"
											d="M5.79971 1.10636C6.42812 0.51287 5.43313 -0.426818 4.80472 0.216126L0.196378 4.51891C-0.0654595 4.7662 -0.0654595 5.21131 0.196378 5.4586L4.80472 9.81084C5.43313 10.4043 6.42812 9.46464 5.79971 8.87115L1.71504 5.01348L5.79971 1.10636Z"
											fill="#6E6893"
										/>
									</svg>
								</button>
								<button class="custome-button" on:click={handleNextPage}>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="6"
										height="10"
										viewBox="0 0 6 10"
										fill="none"
									>
										<path
											opacity="0.4"
											d="M0.200293 1.10636C-0.428118 0.51287 0.566865 -0.426818 1.19528 0.216126L5.80362 4.51891C6.06546 4.7662 6.06546 5.21131 5.80362 5.4586L1.19528 9.81084C0.566865 10.4043 -0.428118 9.46464 0.200293 8.87115L4.28496 5.01348L0.200293 1.10636Z"
											fill="#6E6893"
										/>
									</svg>
								</button>
							</div>
						</td>
					</tr>
				</tfoot>
			</table>
		</section>
	</div>
</main>

<style>
	#bg_payments {
		background-color: var(--color-bg-parent);
		min-height: 100vh;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	#payments_form {
		display: flex;
		align-items: stretch;
		gap: 0.5em;
		border-radius: 0.375em;

		background-color: var(--color-bg-stripe);
		width: 392px;
	}
	.payments_table {
		background-color: var(--color-white-100);
		width: 90%;
		max-width: 90em;
		border-radius: 0.375em;
		filter: drop-shadow(0px 0px 5px rgba(0, 0, 0, 0.2));
	}
	.payments_filter {
		padding: 1em;
	}
	.payments_icon {
		display: flex;
		align-items: center;
		padding: 0.5em;
	}
	.payments_input {
		width: 100%;
		border: none;
		background-color: transparent;
		padding: 0.5em;
		font-size: 0.75em;
	}

	.payments_list_content {
		width: 100%;
		display: flex;
		flex-direction: column;
		font-size: 0.75em;
	}
	.payments_list_header > tr {
		display: grid;
		grid-template-columns: 0.2fr 2fr 2fr 1fr 0.5fr 0.5fr;
		align-items: center;
		background-color: var(--color-bg-stripe);
		padding: 0.5em 1em;
		color: var(--fonts-primary-variant);
		text-align: left;
		gap: 1em;
	}
	.payments_list_body > tr {
		display: grid;
		grid-template-columns: 0.2fr 2fr 2fr 1fr 0.5fr 0.5fr;
		align-items: center;
		padding: 0.5em 1em;
		text-align: left;
		row-gap: 0.5em;
		column-gap: 1em;
	}
	.payments_list_body_td {
		display: flex;
		flex-direction: column;
		gap: 0.5em;
	}

	.td--amount {
		text-align: right;
	}
	.small_text {
		color: var(--fonts-primary-variant);
		font-size: 0.875em;
	}

	.payments_list_body--status {
		border-radius: 4em;
		width: fit-content;
		padding: 0.5em 1em;
		display: flex;
		align-items: center;
		gap: 0.3125em;
	}
	.status--mark {
		width: 0.5em;
		height: 0.5em;
		border-radius: 100%;
	}
	.active {
		background-color: #e6e6f2;
		color: #4a4aff;
	}
	.inactive {
		color: var(--fonts-primary-variant);
		background-color: var(--color-bg-parent);
	}
	.status--inactive {
		background-color: var(--fonts-primary-variant);
	}
	.status--active {
		background-color: #4a4aff;
	}
	.paid {
		color: var(--color-positive);
		background-color: #cdffcd;
	}
	.unpaid {
		color: var(--color-negative);
		background-color: #e0b1b1;
	}

	.status--paid {
		background-color: var(--color-positive);
	}
	.status--unpaid {
		background-color: var(--color-negative);
	}
	.payments_list_footer > tr {
		display: flex;
		flex-direction: row;
		justify-content: end;
		align-items: center;
		background-color: var(--color-bg-stripe);
		padding: 1em;
		color: var(--fonts-primary-variant);
		text-align: left;
		gap: 2em;
	}
	.selected {
		background-color: var(--color-bg-stripe);
	}
	.payments_list_footer--pages {
		display: flex;
		flex-direction: row;
		gap: 4em;
		padding: 0 1em;
	}
	.custom-select {
		border: none;
		background-color: transparent;
		cursor: pointer;
		color: var(--fonts-primary-variant);
		font-size: 0.875em;
	}
	.custome-button {
		border: none;
		background-color: transparent;
		font-weight: 700;
		cursor: pointer;
		padding: 0.5em;
		border-radius: 2px;
	}
	.custome-button:hover {
		background-color: #fff;
	}
</style>
