import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from 'recharts';

export const AreaLineChart = ({ areaData }) => {
  const CustomizedLabel = props => {
    const { x, y, value, index } = props;

    return (
      <text x={x} y={y} dy={-20} fontSize={18} textAnchor="middle">
        {index === 0 ? null : value}
      </text>
    );
  };

  const customizeLine = (LineData, value) => {
    LineData.unshift({ day: null, progress: value });
    return LineData;
  };

  if (!areaData) return <div>로딩중입니다.</div>;
  return (
    <div className="pl-3 pt-14">
      {Object.keys(areaData).map(area => {
        return (
          <>
            <h1 className="text-2xl font-semibold">{area}</h1>
            <ResponsiveContainer width="95%" height={400} className="pt-7">
              <LineChart
                width={500}
                height={200}
                data={customizeLine(areaData[area], areaData[area][0].progress)}
                syncId="anyId"
                margin={{
                  top: 20,
                  right: 20,
                  left: 30,
                  bottom: 50,
                }}
              >
                <CartesianGrid stroke="#FFFFFF" fill="#FFFFFF" />
                <XAxis dataKey="day" dy={10} />
                <YAxis domain={[0, 100]} dx={-10} />
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
    </div>
  );
};
