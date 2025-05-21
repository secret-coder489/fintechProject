'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
const formSchema = z.object({
  firstName: z.string().min(2, 'First name is required'),
  lastName: z.string().min(2, 'Last name is required'),
  dob: z.string().regex(/\d{4}-\d{2}-\d{2}/, 'Date format: YYYY-MM-DD'),
  ssn: z.string().regex(/^\d{3}-\d{2}-\d{4}$/, 'SSN: XXX-XX-XXXX'),
  nationality: z.string().min(2),
  email: z.string().email(),
  phone: z.string().regex(/^\+?[1-9]\d{1,14}$/),
  address: z.string().min(5),
  city: z.string().min(2),
  state: z.string().min(2),
  zip: z.string().min(4).max(10),
  annualIncome: z.number().min(0),
  employmentStatus: z.enum(['employed', 'self-employed', 'unemployed', 'retired']),
  creditScore: z.number().min(300).max(850),
  netWorth: z.number().min(0),
  bankName: z.string().min(2),
  accountNumber: z.string().min(5),
  routingNumber: z.string().min(5),
  employerName: z.string().min(2),
  jobTitle: z.string().min(2),
  yearsEmployed: z.number().min(0).max(50),
  workEmail: z.string().email(),
  workPhone: z.string().regex(/^\+?[1-9]\d{1,14}$/),
  investmentExperience: z.enum(['none', 'beginner', 'intermediate', 'expert']),
  riskTolerance: z.enum(['low', 'medium', 'high']),
  investmentAmount: z.number().min(0),
  agreeTerms: z.literal(true, { errorMap: () => ({ message: 'You must agree to terms' }) }),
})

type FormData = z.infer<typeof formSchema>

export default function FintechForm() {
  const router = useRouter()
  const [apiResponse, setApiResponse] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  })

  const onSubmit = (data: FormData) => {
    setLoading(true)
    setApiResponse(null)
    setTimeout(() => {
      setLoading(false)
      setApiResponse('Form submitted successfully!')
      console.log('Submitted:', data)
    }, 2000)
  }

  const handleNavigate = () => {
    router.push('/dashboard')
  }


  return (
    <div className="max-w-5xl mx-auto p-8 bg-white rounded-xl shadow-lg space-y-10">
      <h1 className="text-4xl font-bold text-center mb-8">Fintech User Form</h1>
       <button
          type="button"
          onClick={handleNavigate}
          className="text-indigo-600 hover:text-indigo-800 border border-indigo-600 hover:bg-indigo-50 px-4 py-2 rounded-md transition"
        >
          ← Back to Dashboard
        </button>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">
        <FormSection title="Personal Information">
          <InputField label="First Name" {...register('firstName')} error={errors.firstName?.message} />
          <InputField label="Last Name" {...register('lastName')} error={errors.lastName?.message} />
          <InputField label="Date of Birth" type="date" {...register('dob')} error={errors.dob?.message} />
          <InputField label="SSN" placeholder="XXX-XX-XXXX" {...register('ssn')} error={errors.ssn?.message} />
          <InputField label="Nationality" {...register('nationality')} error={errors.nationality?.message} />
        </FormSection>

        <FormSection title="Contact Details">
          <InputField label="Email" type="email" {...register('email')} error={errors.email?.message} />
          <InputField label="Phone" {...register('phone')} error={errors.phone?.message} />
          <InputField label="Address" {...register('address')} error={errors.address?.message} />
          <InputField label="City" {...register('city')} error={errors.city?.message} />
          <InputField label="State" {...register('state')} error={errors.state?.message} />
          <InputField label="Zip Code" {...register('zip')} error={errors.zip?.message} />
        </FormSection>

        <FormSection title="Financial Information">
          <InputField label="Annual Income" type="number" {...register('annualIncome', { valueAsNumber: true })} error={errors.annualIncome?.message} />
          <SelectField label="Employment Status" {...register('employmentStatus')} error={errors.employmentStatus?.message} options={['employed', 'self-employed', 'unemployed', 'retired']} />
          <InputField label="Credit Score" type="number" {...register('creditScore', { valueAsNumber: true })} error={errors.creditScore?.message} />
          <InputField label="Net Worth" type="number" {...register('netWorth', { valueAsNumber: true })} error={errors.netWorth?.message} />
          <InputField label="Bank Name" {...register('bankName')} error={errors.bankName?.message} />
          <InputField label="Account Number" {...register('accountNumber')} error={errors.accountNumber?.message} />
          <InputField label="Routing Number" {...register('routingNumber')} error={errors.routingNumber?.message} />
        </FormSection>

        <FormSection title="Employment Details">
          <InputField label="Employer Name" {...register('employerName')} error={errors.employerName?.message} />
          <InputField label="Job Title" {...register('jobTitle')} error={errors.jobTitle?.message} />
          <InputField label="Years Employed" type="number" {...register('yearsEmployed', { valueAsNumber: true })} error={errors.yearsEmployed?.message} />
          <InputField label="Work Email" {...register('workEmail')} error={errors.workEmail?.message} />
          <InputField label="Work Phone" {...register('workPhone')} error={errors.workPhone?.message} />
        </FormSection>

        <FormSection title="Investment Information">
          <SelectField label="Investment Experience" {...register('investmentExperience')} error={errors.investmentExperience?.message} options={['none', 'beginner', 'intermediate', 'expert']} />
          <SelectField label="Risk Tolerance" {...register('riskTolerance')} error={errors.riskTolerance?.message} options={['low', 'medium', 'high']} />
          <InputField label="Investment Amount" type="number" {...register('investmentAmount', { valueAsNumber: true })} error={errors.investmentAmount?.message} />
        </FormSection>

        <div className="flex items-start space-x-2">
          <input type="checkbox" {...register('agreeTerms')} className="mt-1" />
          <label className="text-sm text-gray-700">
            I agree to the <a href="#" className="underline text-blue-600">terms and conditions</a>
          </label>
        </div>
        {errors.agreeTerms && <p className="text-red-600 text-sm">{errors.agreeTerms.message}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-md text-lg font-semibold"
        >
          {loading ? 'Submitting...' : 'Submit'}
        </button>
        {apiResponse && <p className="text-green-600 text-center text-lg font-medium">{apiResponse}</p>}
      </form>
    </div>
  )
}

function FormSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm space-y-4">
      <h2 className="text-2xl font-semibold text-indigo-700 border-b border-gray-200 pb-2">{title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">{children}</div>
    </section>
  )
}


const InputField = ({ label, error, ...props }: any) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
    <input
      {...props}
      className={`w-full border rounded-md px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
        error ? 'border-red-500' : 'border-gray-300'
      }`}
    />
    {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
  </div>
)


const SelectField = ({ label, options, error, ...props }: any) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
    <select
      {...props}
      className={`w-full border rounded-md px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
        error ? 'border-red-500' : 'border-gray-300'
      }`}
    >
      <option value="">Select</option>
      {options.map((opt: string) => (
        <option key={opt} value={opt}>{opt}</option>
      ))}
    </select>
    {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
  </div>
)

