import React from 'react';

export const RADIAN = Math.PI / 180;
export const COLORS = ['#FF4C65', '#FFC506', '#1CDFBB', '#47BEFF'];
export const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
  name,
  value,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN) * 1;
  const y = cy + radius * Math.sin(-midAngle * RADIAN) * 0.9;

  return (
    <g>
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor="middle"
        dominantBaseline="central"
      >
        {value === 0 ? null : name}
      </text>
      <text x={x} y={y} dy={18} textAnchor="middle" fill="#FFFFFF">
        {value}
      </text>
    </g>
  );
};
