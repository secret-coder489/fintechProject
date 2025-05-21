'use client'
import { useRouter } from 'next/navigation'
import LineChartCard from '@/components/lineChart'
import BarChart from '@/components/barChart'
import PiChart from '@/components/piChat'
import { lineData, barData, pieData, COLORS } from '@/utils/chartData';

export default function Dashboard() {
  const router = useRouter()

  const handleNavigate = () => {
    router.push('/form')
  }

  return (
    <div className="p-8 min-h-screen bg-gradient-to-tr from-gray-100 via-white to-gray-100">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-y-4 mb-10">
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 drop-shadow-md">
          Fintech Dashboard
        </h1>
        <button
          onClick={handleNavigate}
          className="text-indigo-600 hover:text-white hover:bg-indigo-600 border border-indigo-600 px-4 py-2 rounded-md transition duration-200 w-full md:w-auto"
        >
          Open Fintech Form
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-7xl mx-auto">
        <LineChartCard
          title="Revenue vs Expenses"
          data={lineData}
          dataKeys={[
            { key: 'revenue', stroke: '#3B82F6' },
            { key: 'expenses', stroke: '#10B981' },
          ]}
        />
        <BarChart
          title="Account Balances"
          data={barData}
          dataKey="balance"
        />
        <PiChart
          title="Portfolio Distribution"
          data={pieData}
          colors={COLORS}
        />
      </div>
    </div>
  )
}
