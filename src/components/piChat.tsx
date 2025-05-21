'use client'

import React from 'react'
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'

type Props = {
  title: string
  data: { name: string; value: number }[]
  colors: string[]
  dataKey?: string
  nameKey?: string
}

function PieChartCardComponent({
  title,
  data,
  colors,
  dataKey = 'value',
  nameKey = 'name',
}: Props) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl transition-shadow duration-300 flex flex-col items-center">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800 border-b border-gray-200 pb-2 w-full text-center">
        {title}
      </h2>
      <ResponsiveContainer width="100%" height={280}>
        <PieChart>
          <Pie
            data={data}
            dataKey={dataKey}
            nameKey={nameKey}
            cx="50%"
            cy="50%"
            outerRadius={90}
            label={({ name, percent }) =>
              `${name}: ${(percent * 100).toFixed(0)}%`
            }
            labelLine={false}
            cornerRadius={8}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              backgroundColor: '#f9fafb',
              borderRadius: '8px',
              borderColor: '#e5e7eb',
            }}
            itemStyle={{ color: '#111827' }}
          />
          <Legend verticalAlign="bottom" height={36} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}

export default React.memo(PieChartCardComponent)
