'use client'

import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import * as CryptoJS from 'crypto-js'
import jwt from 'jsonwebtoken'
import { loginSchema } from '@/src/lib/schemas/loginSchema'

const SECRET_KEY = 'f123e98abf73f4123e209af9bb2387c5f56bcf49ed192a7e09c3b3eafec0a1d2'

type LoginForm = z.infer<typeof loginSchema>

export default function Login() {
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  })

  const encryptPassword = (password: string) => {
    return CryptoJS.AES.encrypt(password, SECRET_KEY).toString()
  }

  const decryptPassword = (ciphertext: string) => {
    const bytes = CryptoJS.AES.decrypt(ciphertext, SECRET_KEY)
    return bytes.toString(CryptoJS.enc.Utf8)
  }

  const generateToken = (email: string) => {
    return jwt.sign({ email }, SECRET_KEY, { expiresIn: '1h' }) // Ensure SECRET_KEY is set correctly
  }


  const onSubmit = (data: LoginForm) => {
    debugger
    const encryptedPassword = encryptPassword('Pragati@1997')
    const user = {
      email: 'pragati@fintech.com',
      password: encryptedPassword,
    }

    const decryptedPassword = decryptPassword(user.password)

    if (data.email === user.email && data.password === decryptedPassword) {
      const token = SECRET_KEY
      localStorage.setItem('authToken', token)

      router.push('/dashboard')
    } else {
      alert('Invalid credentials')
    }
  }

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-8 shadow rounded w-full max-w-md"
      >
        <h1 className="text-2xl font-bold mb-6">Login</h1>

        <input
          type="email"
          {...register('email')}
          placeholder="Email"
          className="w-full p-2 mb-1 border rounded"
        />
        {errors.email && (
          <p className="text-red-500 text-sm mb-3">{errors.email.message}</p>
        )}

        <input
          type="password"
          {...register('password')}
          placeholder="Password"
          className="w-full p-2 mb-1 border rounded"
        />
        {errors.password && (
          <p className="text-red-500 text-sm mb-3">{errors.password.message}</p>
        )}

        <button
          type="submit"
          className="text-purple-600 hover:text-white hover:bg-purple-600 border border-purple-600 px-4 py-2 rounded-md transition duration-200 w-full"
        >
          Log In
        </button>
      </form>
    </div>
  )
}
