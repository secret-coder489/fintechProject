'use client'

import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { decryptPassword, encryptPassword } from '@/src/utils/authUtils'
import { loginSchema } from '@/src/lib/schemas/loginSchema'

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

  const onSubmit = (data: LoginForm) => {
    const encryptedPassword = encryptPassword('Pragati@1997')
    const user = {
      email: 'pragati@fintech.com',
      password: encryptedPassword,
    }

    const decryptedPassword = decryptPassword(user.password)

    if (data.email === user.email && data.password === decryptedPassword) {
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
