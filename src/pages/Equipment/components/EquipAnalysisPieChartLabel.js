export const COLORS = ['#FF4C65', '#FFC506', '#1CDFBB', '#47BEFF'];

export const RADIAN = Math.PI / 180;

export const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  name,
  value,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN) * 1;
  const y = cy + radius * Math.sin(-midAngle * RADIAN) * 0.95;

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor="middle"
      dominantBaseline="central"
      fontSize={17}
    >
      {value === 0 ? null : name}
    </text>
  );
};
