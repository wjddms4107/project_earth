import { PieChart, Pie, Cell } from 'recharts';
import React from 'react';

export default function MainPieChart({ data }) {
  if (!data) return <div>로딩중입니다.</div>;

  const countState = (data, state) => {
    let dataArray = [];
    data.map(a => {
      if (a.state === state) {
        a.vehicle.map(b => {
          let data = { name: b.name, value: b.count };
          return dataArray.push(data);
        });
      }
      return dataArray;
    });
    return dataArray;
  };

  const makeChartDATA = state => {
    const CHART_DATA = {
      name: state,
      value: countState(data[0].vehicle_state, state),
    };
    return CHART_DATA.value;
  };

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

  const COLORS = ['#FF4C65', '#FFC506', '#1CDFBB', '#47BEFF'];

  return (
    <article className="flex flex-wrap justify-center gap-3 mt-5">
      <PieChart width={300} height={300}>
        <Pie
          data={makeChartDATA('idle')}
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
      <PieChart width={300} height={300}>
        <Pie
          data={makeChartDATA('travel')}
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
      <PieChart width={300} height={300}>
        <Pie
          data={makeChartDATA('load')}
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
      <PieChart width={300} height={300}>
        <Pie
          data={makeChartDATA('unload')}
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
    </article>
  );
}
