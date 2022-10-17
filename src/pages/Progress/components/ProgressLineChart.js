import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from 'recharts';

export const ProgressLineChart = ({ areaData }) => {
  const CustomizedLabel = props => {
    const { x, y, value, index } = props;
    return (
      <text x={x} y={y} dy={-20} fontSize={18} textAnchor="middle">
        {index === 0 ? null : value}
      </text>
    );
  };

  if (!areaData) return <div>로딩중입니다.</div>;

  return (
    <section className="pl-[40px] pt-[12px]">
      <h1 className="text-2xl font-bold pb-6">지역별 공정률</h1>
      {Object.keys(areaData).map(area => {
        return (
          <>
            <h1 className="text-xl font-semibold pb-5">{area}</h1>
            <ResponsiveContainer width="95%" height={400}>
              <LineChart
                width={500}
                height={200}
                data={areaData[area]}
                syncId="anyId"
                margin={{
                  top: 10,
                  right: 20,
                  left: 30,
                  bottom: 50,
                }}
              >
                <CartesianGrid />
                <XAxis
                  dataKey="day"
                  dy={10}
                  label={{
                    value: '(일별)',
                    position: 'center',
                    dy: 37,
                  }}
                />
                <YAxis
                  domain={[0, 100]}
                  dx={-10}
                  label={{
                    value: '(%)',
                    position: 'center',
                    dx: -33,
                  }}
                />
                <Line
                  connectNulls
                  type="linear"
                  dataKey="progress"
                  stroke="#036DB7"
                  strokeWidth={5}
                  label={<CustomizedLabel />}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </>
        );
      })}
    </section>
  );
};
