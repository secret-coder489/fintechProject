'use client'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { formSchema, FormData } from '@/src/lib/schemas/formSchema'

export default function FintechForm() {
  const router = useRouter()
  const [apiResponse, setApiResponse] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  })

  useEffect(() => {
    const token = localStorage.getItem('authToken')

    if (!token) {
      router.push('/login')
    } else {
      setIsAuthenticated(true)
    }
  }, [])

  if (!isAuthenticated) return null

  const onSubmit = (data: FormData) => {
    setLoading(true)
    setApiResponse(null)

    setTimeout(() => {
      setLoading(false)
      setApiResponse('Form submitted successfully!')
      router.push('/dashboard')
    }, 2000)
  }

  const handleNavigate = () => {
    router.push('/dashboard')
  }

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-8 bg-gray-50 rounded-2xl shadow-xl space-y-12">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl md:text-5xl font-extrabold text-indigo-700">Fintech User Form</h1>
        <button
          type="button"
          onClick={handleNavigate}
          className="text-indigo-600 hover:text-white hover:bg-indigo-600 border border-indigo-600 px-4 py-2 rounded-lg transition duration-300 cursor-pointer"
        >
          Dashboard
        </button>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">
        <FormSection title="Personal Information">
          <InputField label="First Name" {...register('firstName')} error={errors.firstName?.message} />
          <InputField label="Last Name" {...register('lastName')} error={errors.lastName?.message} />
          <InputField label="Date of Birth" type="date" {...register('dob')} error={errors.dob?.message} />
          <InputField label="Nationality" {...register('nationality')} error={errors.nationality?.message} />
          <SelectField label="Marital Status" {...register('maritalStatus')} error={errors.maritalStatus?.message} options={['single', 'married', 'divorced', 'widowed']} />
          <InputField label="Number of Dependents" type="number" {...register('numberOfDependents', { valueAsNumber: true })} error={errors.numberOfDependents?.message} />
          <SelectField label="Education Level" {...register('educationLevel')} error={errors.educationLevel?.message} options={['high school', 'bachelor', 'master', 'doctorate', 'other']} />
          <InputField label="Occupation" {...register('occupation')} error={errors.occupation?.message} />
        </FormSection>

        <FormSection title="Contact Details">
          <InputField label="Email" type="email" {...register('email')} error={errors.email?.message} />
          <InputField label="Phone" {...register('phone')} error={errors.phone?.message} />
          <InputField label="Address" {...register('address')} error={errors.address?.message} />
          <InputField label="City" {...register('city')} error={errors.city?.message} />
          <InputField label="State" {...register('state')} error={errors.state?.message} />
          <InputField label="Zip Code" {...register('zip')} error={errors.zip?.message} />
          <InputField label="Employer Address" {...register('employerAddress')} error={errors.employerAddress?.message} />
        </FormSection>

        <FormSection title="Financial Information">
          <InputField label="Annual Income" type="number" {...register('annualIncome', { valueAsNumber: true })} error={errors.annualIncome?.message} />
          <SelectField label="Employment Status" {...register('employmentStatus')} error={errors.employmentStatus?.message} options={['employed', 'self-employed', 'unemployed', 'retired']} />
          <InputField label="Credit Score" type="number" {...register('creditScore', { valueAsNumber: true })} error={errors.creditScore?.message} />
          <InputField label="Net Worth" type="number" {...register('netWorth', { valueAsNumber: true })} error={errors.netWorth?.message} />
          <InputField label="Bank Name" {...register('bankName')} error={errors.bankName?.message} />
          <InputField label="Account Number" {...register('accountNumber')} error={errors.accountNumber?.message} />
          <InputField label="Routing Number" {...register('routingNumber')} error={errors.routingNumber?.message} />
          <InputField label="Tax Identification Number" {...register('taxIdentificationNumber')} error={errors.taxIdentificationNumber?.message} />
        </FormSection>

        <FormSection title="Employment Details">
          <InputField label="Employer Name" {...register('employerName')} error={errors.employerName?.message} />
          <InputField label="Job Title" {...register('jobTitle')} error={errors.jobTitle?.message} />
          <InputField label="Years Employed" type="number" {...register('yearsEmployed', { valueAsNumber: true })} error={errors.yearsEmployed?.message} />
          <InputField label="Work Email" {...register('workEmail')} error={errors.workEmail?.message} />
          <InputField label="Work Phone" {...register('workPhone')} error={errors.workPhone?.message} />
          <SelectField label="Citizenship Status" {...register('citizenshipStatus')} error={errors.citizenshipStatus?.message} options={['citizen', 'permanent resident', 'visa holder', 'other']} />
        </FormSection>

        <FormSection title="Investment Information">
          <SelectField label="Investment Experience" {...register('investmentExperience')} error={errors.investmentExperience?.message} options={['none', 'beginner', 'intermediate', 'expert']} />
          <SelectField label="Risk Tolerance" {...register('riskTolerance')} error={errors.riskTolerance?.message} options={['low', 'medium', 'high']} />
          <InputField label="Investment Amount" type="number" {...register('investmentAmount', { valueAsNumber: true })} error={errors.investmentAmount?.message} />
        </FormSection>

        <div className="flex items-start gap-2">
          <input type="checkbox" {...register('agreeTerms')} className="mt-1" />
          <label className="text-sm text-gray-700">
            I agree to the <a href="#" className="underline text-indigo-600">terms and conditions</a>
          </label>
        </div>
        {errors.agreeTerms && <p className="text-red-600 text-sm">{errors.agreeTerms.message}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg text-lg font-semibold shadow transition duration-300 cursor-pointer"
        >
          {loading ? 'Submitting...' : 'Submit'}
        </button>
        {apiResponse && <p className="text-green-600 text-center text-lg font-medium mt-4">{apiResponse}</p>}
      </form>
    </div>
  )
}

function FormSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="bg-white border border-gray-200 rounded-xl p-6 shadow-md space-y-6">
      <h2 className="text-xl md:text-2xl font-semibold text-indigo-700 border-b border-gray-200 pb-2">{title}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">{children}</div>
    </section>
  )
}

const InputField = ({ label, error, ...props }: any) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
    <input
      {...props}
      className={`w-full border rounded-lg px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 ${error ? 'border-red-500' : 'border-gray-300'}`}
    />
    {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
  </div>
)

const SelectField = ({ label, options, error, ...props }: any) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
    <select
      {...props}
      className={`w-full border rounded-lg px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 ${error ? 'border-red-500' : 'border-gray-300'}`}
    >
      <option value="">Select</option>
      {options.map((opt: string) => (
        <option key={opt} value={opt}>{opt}</option>
      ))}
    </select>
    {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
  </div>
)