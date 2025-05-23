'use client'
import BarChart from '@/src/components/barChart'
import LineChart from '@/src/components/lineChart'
import PiChat from '@/src/components/piChat'
import { barData, COLORS, lineData, pieData } from '@/src/utils/chartData'
import { useRouter } from 'next/navigation'

export default function Dashboard() {
  const router = useRouter()
  const handleNavigate = () => {
    router.push('/form')
  }

  const handleLogout = () => {
    localStorage.removeItem('token')  
    router.push('/login')
  }

  return (
    <div className="p-8 min-h-screen bg-gradient-to-tr from-gray-100 via-white to-gray-100">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-y-4 mb-10">
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 drop-shadow-md">
          Fintech Dashboard
        </h1>
        <div className="flex gap-4 w-full md:w-auto">
          <button
            onClick={handleNavigate}
            className="text-indigo-600 hover:text-white hover:bg-indigo-600 border border-indigo-600 px-4 py-2 rounded-md transition duration-200 flex-1 md:flex-none cursor-pointer"
          >
            Open Fintech Form
          </button>
          <button
            onClick={handleLogout}
            className="text-red-600 hover:text-white hover:bg-red-600 border border-red-600 px-4 py-2 rounded-md transition duration-200 flex-1 md:flex-none cursor-pointer"
          >
            Logout
          </button>
        </div>

      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-7xl mx-auto">
        <LineChart
          title="Revenue vs Expenses"
          data={lineData}
          dataKeys={[
            { key: 'revenue', stroke: '#3B82F6' },
            { key: 'expenses', stroke: '#10B981' },
          ]}
        />
        <PiChat
            title="Portfolio Distribution"
            data={pieData}
            colors={COLORS}
        />
        <BarChart
          title="Account Balances"
          data={barData}
          dataKey="balance"
        />
      </div>
    </div>
  )
}
