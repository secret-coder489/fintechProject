'use client'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function Login() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()

    const user = {
      email: 'pragati@fintech.com',
      password: 'pragati123',
    }

    if (email === user.email && password === user.password) {
      router.push('/dashboard') 
    } else {
      alert('Invalid credentials')
    }
  }

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <form onSubmit={handleLogin} className="bg-white p-8 shadow rounded w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6">Login</h1>
        <input
          type="email"
          className="w-full p-2 mb-4 border rounded"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          className="w-full p-2 mb-4 border rounded"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" className="text-indigo-600 hover:text-white hover:bg-indigo-600 border border-indigo-600 px-4 py-2 rounded-md transition duration-200 w-full md:w-auto">
          Log In
        </button>
      </form>
    </div>
  )
}
