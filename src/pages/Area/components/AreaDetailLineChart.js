import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from 'recharts';
import { customizeLine } from 'utils/functions/main/mainFunction';

export default function AareaDetailLineChart({ areaLineChartData }) {
  const isData = areaLineChartData.length !== 0;
  if (!isData) return <div>로딩중입니다.</div>;

  const CustomizedLabel = props => {
    const { x, y, value, index } = props;

    return (
      <text x={x} y={y} dy={-20} fontSize={18} textAnchor="middle">
        {index === 0 ? null : value}
      </text>
    );
  };

  return (
    <div className="pl-3">
      <ResponsiveContainer width="95%" height={400} className="pt-3">
        <LineChart
          width={500}
          height={200}
          data={customizeLine(areaLineChartData, areaLineChartData[0].progress)}
          syncId="anyId"
          margin={{
            top: 20,
            right: 20,
            left: 30,
            bottom: 50,
          }}
        >
          <CartesianGrid />
          <XAxis dataKey="day" dy={10} />
          <YAxis domain={[0, 100]} dx={-10} />
          <Line
            type="linear"
            dataKey="progress"
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
