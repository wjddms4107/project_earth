import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from 'recharts';

export default function AareaLineChart({ areaData }) {
  const isData = areaData.length !== 0;
  if (!isData) return <div>로딩중입니다.</div>;

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
          data={areaData}
          syncId="anyId"
          margin={{
            top: 20,
            right: 20,
            left: 30,
            bottom: 50,
          }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="#FFFFFF"
            fill="#FFFFFF"
          />
          <XAxis dataKey="day" />
          <YAxis domain={[0, 100]} />
          <Line
            type="linear"
            dataKey="구역A"
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
          data={areaData}
          syncId="anyId"
          margin={{
            top: 20,
            right: 20,
            left: 30,
            bottom: 50,
          }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="#FFFFFF"
            fill="#FFFFFF"
          />
          <XAxis dataKey="day" />
          <YAxis domain={[0, 100]} />
          <Line
            type="linear"
            dataKey="구역B"
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
