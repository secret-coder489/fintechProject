import { z } from 'zod'

export const formSchema = z.object({
  firstName: z.string().min(2, 'First name is required'),
  lastName: z.string().min(2, 'Last name is required'),
  dob: z.string().regex(/\d{4}-\d{2}-\d{2}/, 'Date format: YYYY-MM-DD'),
  nationality: z.string().min(2),
  email: z.string().email({ message: "Please enter a valid email address" }),
  phone: z.string().regex(/^\+?[1-9]\d{1,14}$/),
  address: z.string().min(5),
  city: z.string().min(2),
  state: z.string().min(2),
  zip: z.string().min(4).max(10),
  annualIncome: z.number().min(0),
  employmentStatus: z.enum(['employed', 'self-employed', 'unemployed', 'retired'], {
    errorMap: () => ({ message: 'Please select your employment status' }),
  }),
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
  investmentExperience: z
    .enum(['none', 'beginner', 'intermediate', 'expert'])
    .refine((val) => !!val, {
      message: 'Please select your investment experience level',
    }),
  riskTolerance: z.enum(['low', 'medium', 'high'], {
    errorMap: () => ({ message: 'Please select your risk tolerance level' }),
  }),
  investmentAmount: z.number().min(0),
  maritalStatus: z
    .enum(['single', 'married', 'divorced', 'widowed'], {
      errorMap: () => ({ message: 'Please select your marital status' }),
    }),
  numberOfDependents: z.number().min(0).max(15),
  educationLevel: z.enum(['high school', 'bachelor', 'master', 'doctorate', 'other'], {
    errorMap: () => ({ message: 'Please select your education level' }),
  }),
  occupation: z.string().min(2),
  employerAddress: z.string().min(5),
  citizenshipStatus: z.enum(['citizen', 'permanent resident', 'visa holder', 'other'], {
    errorMap: () => ({ message: 'Please select your citizenship status' }),
  }),
  taxIdentificationNumber: z.string().min(5),
  agreeTerms: z.literal(true, {
    errorMap: () => ({ message: 'You must agree to terms' }),
  }),
})

export type FormData = z.infer<typeof formSchema>
