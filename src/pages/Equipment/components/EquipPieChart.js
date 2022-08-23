import { PieChart, Pie, Cell } from 'recharts';
import React from 'react';

const EquipPieChart = ({ equipData, sort }) => {
  const isData = equipData.length !== 0;
  if (!isData) return <div>로딩중입니다.</div>;
  // console.log('equipData:', equipData);
  // console.log('sort:', sort);

  const data = [
    {
      name: 'Idle',
      value: equipData[sort].idle,
    },
    {
      name: 'Travel',
      value: equipData[sort].travel,
    },
    {
      name: 'Load',
      value: equipData[sort].load,
    },
    {
      name: 'Unload',
      value: equipData[sort].unload,
    },
  ];
  // console.log('data:', data);
  const COLORS = ['#FF4C65', '#FFC506', '#1CDFBB', '#47BEFF'];

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    x,
    y,
    name,
    value,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.34;
    const xx = cx + radius * Math.cos(-midAngle * RADIAN);
    const yy = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={xx}
        y={yy}
        fill="white"
        textAnchor={x > cx ? 'start' : 'end'}
        dominantBaseline="central"
        fontSize={19}
      >
        {value === 0 ? null : name}
      </text>
    );
  };

  return (
    <PieChart width={300} height={300}>
      <Pie
        data={data}
        cx="50%"
        cy="50%"
        innerRadius={47}
        outerRadius={135}
        labelLine={false}
        label={renderCustomizedLabel}
        fill="#8884d8"
        dataKey="value"
        paddingAngle={0}
        nameKey="name"
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index]} />
        ))}
      </Pie>
    </PieChart>
  );
};

export default EquipPieChart;
