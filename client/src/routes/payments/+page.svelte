<script lang="ts">
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
	};

	let payments: PaymentData[] = [];

	onMount(async () => {
		try {
			const storedToken = localStorage.getItem('token');
			const response = await fetch('http://localhost:5005/api/payments', {
				method: 'GET',
				headers: {
					Authorization: `Bearer ${storedToken}`,
					'Content-Type': 'application/json'
				}
			});
			const result = await response.json();
			payments = result;
			console.log(payments);
		} catch (error) {
			console.log(error);
		}
	});
</script>

<h1>payments</h1>
<p>nnombre</p>
<ul>
	{#each payments as payment (payment.id)}
		<li>{payment.name}</li>
	{/each}
</ul>
