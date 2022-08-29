import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from 'recharts';

const data = [
  {
    day: '1',
    a_area: 10,
    b_area: 10,
  },
  {
    day: '2',
    a_area: 30,
    b_area: 30,
  },
  {
    day: '3',
    a_area: 25,
    b_area: 20,
  },
  {
    day: '4',
    a_area: 60,
    b_area: 60,
  },
  {
    day: '5',
    a_area: 70,
    b_area: 70,
  },
  {
    day: '6',
    a_area: 55,
    b_area: 65,
  },
  {
    day: '7',
    a_area: 95,
    b_area: 95,
  },
];
export default function AareaLineChart() {
  const CustomizedLabel = props => {
    const { x, y, value } = props;

    return (
      <text x={x} y={y} dy={-20} fontSize={18} textAnchor="middle">
        {value}
      </text>
    );
  };

  return (
    <div className="pl-3 pt-14">
      <h1 className="text-2xl font-semibold">A구역</h1>
      <ResponsiveContainer width="95%" height={400} className="pt-7">
        <LineChart
          width={500}
          height={200}
          data={data}
          syncId="anyId"
          margin={{
            top: 20,
            right: 20,
            left: 30,
            bottom: 50,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="white" />
          <XAxis dataKey="day" />
          <YAxis domain={[0, 100]} />
          <Line
            type="linear"
            dataKey="a_area"
            stroke="#036DB7"
            activeDot={false}
            strokeWidth={5}
            label={<CustomizedLabel />}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>

      <h1 className="pt-16 text-2xl font-semibold">B구역</h1>
      <ResponsiveContainer width="95%" height={400} className="pt-7">
        <LineChart
          width={500}
          height={200}
          data={data}
          syncId="anyId"
          margin={{
            top: 20,
            right: 20,
            left: 30,
            bottom: 50,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="white" />
          <XAxis dataKey="day" />
          <YAxis domain={[0, 100]} />
          <Line
            type="linear"
            dataKey="b_area"
            stroke="#036DB7"
            activeDot={false}
            strokeWidth={5}
            label={<CustomizedLabel />}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
