<script lang="ts">
	import { onMount } from 'svelte'
	import Filter from './../../componets/table/filter.svelte'
	import THead from './../../componets/table/thead.svelte'
	import TBody from './../../componets/table/tbody.svelte'
	import TFoot from './../../componets/table/tfoot.svelte'
	import { toggleCheck, fetchData, prevPage, nextPage , toggleMainCheck} from './utils'
	import type { PaymentData } from './types'

	let payments: PaymentData[] = []
	let totalPayments = 0
	let mainCheck = false
	let rowPerPage = 10
	let currentPage = 0

	onMount(async () => {
		handeFechData(rowPerPage)
	})

	const handeFechData = async (rowPerPage: number) => {
		if (currentPage > totalPayments / rowPerPage) {
			currentPage = 0
		}
		const data = await fetchData(currentPage, rowPerPage)
		if (data) {
			[payments, totalPayments] = data
		}
	}

	const handleCheck = (id: number) => {
		toggleCheck(id, mainCheck, payments)
	}

	const handleMainCheck = () => {
    const result = toggleMainCheck(mainCheck, payments)
    mainCheck = result.mainCheck 
    payments = result.payments 
	}

	const handlePrevPage = async () => {
		currentPage = await prevPage(currentPage)
		await handeFechData(rowPerPage)
	}

	const handleNextPage = async () => {
		currentPage = await nextPage(currentPage, totalPayments, rowPerPage)
		await handeFechData(rowPerPage)
	}
</script>

<main id="bg_payments">
	<div class="payments_table">
		<section class="payments_filter">
			<Filter />
		</section>
		<section class="payments_list">
			<table class="payments_list_content">
				<THead {mainCheck} {handleMainCheck} />
				<TBody {payments} {handleCheck} />
				<TFoot
					{currentPage}
					{totalPayments}
					{rowPerPage}
					{handeFechData}
					{handlePrevPage}
					{handleNextPage}
				/>
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
	.payments_list_content {
		width: 100%;
		display: flex;
		flex-direction: column;
		font-size: 0.75em;
	}
</style>
