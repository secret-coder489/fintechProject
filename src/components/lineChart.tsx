'use client'

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'
import React from 'react'

type Props = {
  title: string
  data: any[]
  dataKeys: { key: string; stroke: string }[]
}

function LineChartCardComponent({ title, data, dataKeys }: Props) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl transition-shadow duration-300">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800 border-b border-gray-200 pb-2">
        {title}
      </h2>
      <ResponsiveContainer width="100%" height={280}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis dataKey="name" tick={{ fill: '#6b7280' }} />
          <YAxis tick={{ fill: '#6b7280' }} />
          <Tooltip
            contentStyle={{
              backgroundColor: '#f9fafb',
              borderRadius: '8px',
              borderColor: '#e5e7eb',
            }}
            itemStyle={{ color: '#111827' }}
          />
          <Legend verticalAlign="top" height={36} />
          {dataKeys.map(({ key, stroke }) => (
            <Line
              key={key}
              type="monotone"
              dataKey={key}
              stroke={stroke}
              strokeWidth={3}
              activeDot={{ r: 8 }}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

export default React.memo(LineChartCardComponent)
