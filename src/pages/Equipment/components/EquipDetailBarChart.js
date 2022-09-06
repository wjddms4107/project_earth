import React from 'react';
import {
  BarChart,
  Bar,
  LabelList,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from 'recharts';

export const EquipDetailBarChart = ({ datailBarChartData }) => {
  if (!datailBarChartData) return <div>로딩중입니다.</div>;

  return (
    <ResponsiveContainer width="95%" height={300}>
      <BarChart
        data={datailBarChartData}
        margin={{
          top: 30,
          right: 0,
          left: 7,
          bottom: 40,
        }}
      >
        <CartesianGrid />
        <XAxis dataKey="date" dy={10} />
        <YAxis type="number" dx={-10} />
        <Bar dataKey="rate" fill="#FFC506" barSize={70} />
      </BarChart>
    </ResponsiveContainer>
  );
};
