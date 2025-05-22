'use client'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { decryptPassword, encryptPassword } from '@/src/utils/authUtils'

export default function Login() {
  const router = useRouter()
  const [loginMail, setLoginMail] = useState('')
  const [password, setPassword] = useState('')
 
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    const encrypted = encryptPassword('pragati123')
    const user = {
      email: 'pragati@fintech.com',
      password: encrypted 
    }

    const decrypted = decryptPassword(user.password)
    if (loginMail === user.email && password === decrypted) {
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
          value={loginMail}
          onChange={(e) => setLoginMail(e.target.value)}
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
        <button type="submit" className="text-purple-600 hover:text-white hover:bg-purple-600 border border-purple-600 px-4 py-2 rounded-md transition duration-200 w-full md:w-auto">
          Log In
        </button>
      </form>
    </div>
  )
}
