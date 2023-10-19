<script lang="ts">
	import LeftArrow from '../../assets/leftArrow.svelte'
	import RightArrow from '../../assets/rightArrow.svelte'

	export let currentPage: number
	export let totalPayments: number
	export let rowPerPage: number
	export let handleFechData: () => void
	export let handlePrevPage: () => void
	export let handleNextPage: () => void
	export let setRowsPerPage: (n:number) => void

  const rowValue = () => {
    setRowsPerPage(rowPerPage)
    handleFechData()
  }
</script>

<tfoot class="payments_list_footer">
	<tr>
		<td>{currentPage + 1} of {Math.ceil(totalPayments / rowPerPage)}</td>
		<td>
			<select
				bind:value={rowPerPage}
				class="custom-select"
				on:change={rowValue}
			>
				<option value={6}>Rows per page 6</option>
				<option value={10}>Rows per page 10</option>
			</select>
		</td>
		<td>
			<div class="payments_list_footer--pages">
				<button class="custome-button" on:click={handlePrevPage}>
					<LeftArrow />
				</button>
				<button class="custome-button" on:click={handleNextPage}>
					<RightArrow />
				</button>
			</div>
		</td>
	</tr>
</tfoot>

<style>
	.payments_list_footer > tr {
		display: flex;
		flex-direction: row;
		justify-content: end;
		align-items: center;
    flex-wrap: nowrap;
		background-color: var(--color-bg-stripe);
		padding: 1em;
		color: var(--fonts-primary-variant);
		text-align: left;
		gap: 2em;
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
