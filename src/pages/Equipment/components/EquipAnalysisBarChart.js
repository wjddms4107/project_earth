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

export const EquipAnalysisBarChart = ({ truckData }) => {
  const renderCustomizedLabel = props => {
    const { x, y, width, value } = props;
    const radius = 10;

    return (
      <g>
        <text
          x={x + width / 2}
          y={y - radius}
          textAnchor="middle"
          dominantBaseline="top"
        >
          {value}회
        </text>
      </g>
    );
  };

  if (!truckData) return <div>로딩중입니다.</div>;

  return (
    <ResponsiveContainer width="95%" height={300}>
      <BarChart
        data={truckData}
        margin={{
          top: 30,
          right: 30,
          left: 20,
          bottom: 15,
        }}
      >
        <CartesianGrid />
        <XAxis dataKey="area_name" dy={10} />
        <YAxis type="number" dx={-10} />
        <Bar dataKey="count" fill="#FFC506" barSize={70}>
          <LabelList dataKey="count" content={renderCustomizedLabel} />
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};
