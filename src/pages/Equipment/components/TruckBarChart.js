import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  LabelList,
  ResponsiveContainer,
} from 'recharts';

const data = [
  {
    name: 'A구역',
    uv: 4000,
    pv: 800,
    amt: 10000,
  },
  {
    name: 'B구역',
    uv: 3000,
    pv: 550,
    amt: 2210,
  },
  {
    name: 'C구역',
    uv: 2000,
    pv: 230,
    amt: 2290,
  },
  {
    name: 'D구역',
    uv: 2780,
    pv: 10,
    amt: 2000,
  },
  {
    name: 'E구역',
    uv: 1890,
    pv: 250,
    amt: 2181,
  },
];

const renderCustomizedLabel = (props: any) => {
  const { x, y, width, value } = props;
  const radius = 10;

  return (
    <g>
      <text
        x={x + width / 2}
        y={y - radius}
        textAnchor="middle"
        dominantBaseline="middle"
      >
        {value}
      </text>
    </g>
  );
};

export default function TruckBarChart() {
  return (
    <ResponsiveContainer width="95%" height={300}>
      <BarChart
        data={data}
        margin={{
          top: 30,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid />
        <XAxis dataKey="name" />
        <YAxis type="number" domain={[0, 1000]} />
        <Bar dataKey="pv" fill="#8884d8" minPointSize={0} barSize={80}>
          <LabelList dataKey="name" content={renderCustomizedLabel} />
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
