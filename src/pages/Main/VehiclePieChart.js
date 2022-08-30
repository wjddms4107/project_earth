import React from 'react';
import { PieChart, Pie, Cell } from 'recharts';
import { useTranslation } from 'react-i18next';
import '../../assets/locales/lang/i18next';

export default function VehiclePieChart({ data }) {
  if (!data) return <div>로딩중입니다.</div>;

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { t } = useTranslation();

  /**  */
  const mapToArray = inputMap => {
    let dataArray = [];
    console.log(inputMap);
    inputMap &&
      inputMap.forEach(function (value, key) {
        let obj = {};
        obj.name = t(key);
        obj.value = value;
        dataArray.push(obj);
      });

    return dataArray;
  };

  const makeChartDATA = state => {
    const CHART_DATA = {
      name: state,
      value: mapToArray(data.typeByState.get(state)),
    };
    return CHART_DATA.value;
  };

  const COLORS = ['#FF4C65', '#FFC506', '#1CDFBB', '#47BEFF'];

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
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
    const radius = innerRadius + (outerRadius - innerRadius) * 0.35;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? 'start' : 'end'}
        dominantBaseline="central"
      >
        {value === 0 ? null : name}
      </text>
    );
  };

  return (
    <article className="flex flex-wrap justify-center gap-10 mt-5">
      {CHART_LIST.map(state => {
        return (
          <div
            className="flex justify-center items-center flex-col gap-5"
            key={state.id}
          >
            {makeChartDATA(state.name).length > 0 ? (
              <PieChart width={270} height={270}>
                <Pie
                  data={makeChartDATA(state.name)}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={renderCustomizedLabel}
                  outerRadius={135}
                  fill="#8884d8"
                  nameKey="name"
                  dataKey="value"
                  paddingAngle={0}
                >
                  {makeChartDATA(state.name).map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
              </PieChart>
            ) : (
              <div className="flex justify-center items-center w-67.5 h-67.5 font-bold text-3xl">
                NO DATA
              </div>
            )}

            <p className="font-bold text-2xl">{state.name.toUpperCase()}</p>
          </div>
        );
      })}
    </article>
  );
}

const CHART_LIST = [
  { id: 1, name: 'idle' },
  { id: 2, name: 'travel' },
  { id: 3, name: 'load' },
  { id: 4, name: 'unload' },
];
