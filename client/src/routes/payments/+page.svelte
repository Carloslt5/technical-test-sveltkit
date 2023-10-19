<svelte:head>
  <title>Payments</title>
</svelte:head>

<script lang="ts">
	import { onMount } from 'svelte'
	import Filter from './../../componets/table/filter.svelte'
	import THead from './../../componets/table/thead.svelte'
	import TBody from './../../componets/table/tbody.svelte'
	import TFoot from './../../componets/table/tfoot.svelte'
	import { toggleCheck, fetchData, prevPage, nextPage , toggleMainCheck} from './functions'
	import type { PaymentData } from './types'

	let payments: PaymentData[] = []
	let totalPayments = 0
	let mainCheck = false
	let rowPerPage = 10
	let currentPage = 0

	onMount(async () => {
		handleFechData()
	})

  const setRowsPerPage = (n:number) =>{
    rowPerPage = n
  }

	const handleFechData = async () => {
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
		currentPage = prevPage(currentPage)
		await handleFechData()
	}

	const handleNextPage = async () => {
		currentPage =  nextPage(currentPage, totalPayments, rowPerPage)
		await handleFechData()
	}
</script>

<main id="bg_payments">
	<div class="payments_table">
		<section class="payments_filter">
			<Filter />
		</section>
		<section class="payments_list">
			<table class="payments_list_content">
        <div class="payments_list_content--scroll-content">
          <THead {mainCheck} {handleMainCheck} />
          <TBody {payments} {handleCheck} />
        </div>
				<TFoot
					{currentPage}
					{totalPayments}
					{rowPerPage}
          {setRowsPerPage}
					{handleFechData}
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
		display: flex;
		justify-content: center;
		align-items: center;
    min-height: 100vh;
	}
	.payments_table {
		background-color: var(--color-white-100);
		width: 90%;
		max-width: 90em;
		border-radius: 0.375em;
    margin: 1em;
		filter: drop-shadow(0px 0px 5px rgba(0, 0, 0, 0.2));
    display: flex;
    flex-direction: column;
    justify-content: stretch;
	}
	.payments_filter {
		padding: 1em;
	}
  .payments_list{
    height: 100%;
  }
	.payments_list_content {
		width: 100%;
		display: flex;
		flex-direction: column;
    flex-wrap: nowrap;
    justify-content: space-between;
		font-size: 0.75em;
	}
  .payments_list_content--scroll-content{
    overflow-y: scroll;
    display: flex;
    flex-direction: column;
    justify-content: start;
  }
</style>
