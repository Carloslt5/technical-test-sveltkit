import type { PaymentData } from './types'
import { goto } from '$app/navigation'

export const fetchData = async (currentPage: number, rowPerPage: number) => {
  try {
    const storedToken = localStorage.getItem('token')
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
    )

    if (response.status != 200) {
      goto('/login')
      return
    }

    const result = await response.json()
    const payments = result.payments.map((payment: PaymentData) => ({
      ...payment,
      checked: false
    }))
    return [payments, result.total]
  } catch (error) {
    console.log(error)
  }
}

export const toggleCheck = (id: number, mainCheck: boolean, payments: PaymentData[]) => {
  mainCheck = false
  for (const payment of payments) {
    if (payment.id === id) {
      payment.checked = !payment.checked
    }
  }
}

export const toggleMainCheck = (mainCheck: boolean, payments: PaymentData[]) => {
  mainCheck = !mainCheck
  for (const payment of payments) {
    payment.checked = mainCheck
  }
  return { mainCheck, payments }
}

export const prevPage = (currentPage: number): number => {
  if (currentPage <= 0) {
    return (currentPage = 0)
  } else {
    return currentPage - 1
  }
}

export const nextPage = (currentPage: number, totalPayments: number, rowPerPage: number) => {
  if (currentPage >= totalPayments / rowPerPage - 1) {
    return currentPage
  } else {
    return currentPage + 1
  }
}
