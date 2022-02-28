import React from 'react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

const data = [
  {
    name: 'Department A',
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: 'Department B',
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: 'Department C',
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: 'Department D',
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: 'Department E',
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: 'Department F',
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: 'Department G',
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

export default function Barchart() {
  return (
    <div className="pt-6">
      <ResponsiveContainer width="100%" height={500}>
        <BarChart
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="pv" fill="#8884d8" />
          {/* <Bar dataKey="uv" fill="#82ca9d" /> */}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
