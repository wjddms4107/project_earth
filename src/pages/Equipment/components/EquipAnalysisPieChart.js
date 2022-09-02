import { PieChart, Pie, Cell } from 'recharts';
import React from 'react';
import { COLORS, renderCustomizedLabel } from '.';

export const EquipAnalysisPieChart = ({ equipData, sort }) => {
  const isData = equipData.length !== 0;

  const data = [
    {
      name: 'Idle',
      value: sort && equipData[sort].idle,
    },
    {
      name: 'Travel',
      value: sort && equipData[sort].travel,
    },
    {
      name: 'Working',
      value: sort && equipData[sort].load,
    },
    {
      name: 'Unload',
      value: sort && equipData[sort].unload,
    },
  ];

  if (!isData) return <div>로딩중입니다.</div>;

  return (
    <PieChart width={220} height={230}>
      <Pie
        data={data}
        cx="50%"
        cy="50%"
        innerRadius={40}
        outerRadius={110}
        labelLine={false}
        label={renderCustomizedLabel}
        fill="#8884d8"
        dataKey="value"
        paddingAngle={0}
        nameKey="name"
      >
        {equipData[sort]
          ? data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index]} />
            ))
          : null}
      </Pie>
    </PieChart>
  );
};
