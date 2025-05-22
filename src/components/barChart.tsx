'use client'

import React from 'react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'

type Props = {
  title: string
  data: any[]
  dataKey: string
  fillColor?: string
}

function BarChartCardComponent({ title, data, dataKey, fillColor = '#3B82F6' }: Props) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl transition-shadow duration-300">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800 border-b border-gray-200 pb-2">
        {title}
      </h2>
      <ResponsiveContainer width="100%" height={280}>
        <BarChart data={data} barCategoryGap="30%">
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis dataKey="name" tick={{ fill: '#6b7280' }} />
          <YAxis tick={{ fill: '#6b7280' }} />
          <Tooltip
            contentStyle={{
              backgroundColor: '#f3f0ff',     
              borderRadius: '8px',
              borderColor: '#c4b5fd',         
            }}

            itemStyle={{ color: '#111827' }}
          />
          <Bar dataKey={dataKey} fill={fillColor} radius={[10, 10, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default React.memo(BarChartCardComponent)
