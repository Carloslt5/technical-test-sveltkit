import { goto } from '$app/navigation'


export const onSubmit = async (email: string, password: string) => {
  try {
    const userData = {
      email,
      password
    }
    const response = await fetch('http://localhost:5005/api/auth/login', {
      method: 'POST',
      body: JSON.stringify(userData),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    if (response.status != 200) {
      alert('Email or Password error!')
      return
    }
    const result = await response.json()
    localStorage.setItem('token', result.token)
    goto('/payments')
  } catch (error) {
    console.log(error)
  }
}