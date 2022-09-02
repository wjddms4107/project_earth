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

export default function EquipDetailBarChart({ datailBarChartData }) {
  const isData = datailBarChartData.length !== 0;
  if (!isData) return <div>로딩중입니다.</div>;

  const renderCustomizedLabel = props => {
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
          {/* {value}회 */}
        </text>
      </g>
    );
  };

  return (
    <ResponsiveContainer width="95%" height={300}>
      <BarChart
        data={datailBarChartData}
        margin={{
          top: 30,
          right: 30,
          left: 30,
          bottom: 40,
        }}
      >
        <CartesianGrid fill="#FFFFFF" />
        <XAxis dataKey="date" dy={10} />
        <YAxis type="number" dx={-10} />
        <Bar dataKey="rate" fill="#FFC506" minPointSize={0} barSize={70}>
          <LabelList dataKey="rate" content={renderCustomizedLabel} />
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
