<script lang="ts">
	import type { PaymentData } from '../../routes/payments/types'

	export let payments: PaymentData[]
	export let handleCheck: (id: number) => void
</script>

<tbody class="payments_list_body">
	{#each payments as payment (payment.id)}
		<tr class={payment.checked ? 'selected' : ''}>
			<label class="control control--checkbox">
				<input
					type="checkbox"
					bind:checked={payment.checked}
					on:click={() => {
						handleCheck(payment.id)
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
					<div class="status--mark {payment.status ? 'status--active' : 'status--inactive'}" />
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
					<div class="status--mark {payment.paid_status ? 'status--paid' : 'status--unpaid'}" />
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

<style>

  .payments_list_body{
    max-height: 90vh;
    width: 100%;
    min-width: 800px;
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

	.payments_list_body > tr {
		display: grid;
		grid-template-columns: 0.2fr 2fr 2fr 1fr 0.5fr 0.5fr;
		align-items: center;
		padding: 0.5em 1em;
		text-align: left;
		row-gap: 0.5em;
		column-gap: 1em;
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

	.selected {
		background-color: var(--color-bg-stripe);
	}
</style>
