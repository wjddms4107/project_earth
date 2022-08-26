import React from 'react';
import { PieChart, Pie, Cell } from 'recharts';
import DataFilter from './dataFilter';

export default function VehiclePieChart({ data }) {
  if (!data) return <div>로딩중입니다.</div>;

  //////////////////////////////////////// NEW
  const DATA = [
    {
      datetime: '2022-08-19T19:23:24+0900',
      type: [
        {
          detection_info: 'blackhoe',
          state: 'unload',
        },
        {
          detection_info: 'rode_roller',
          state: 'unload',
        },
        {
          detection_info: 'blackhoe',
          state: 'load',
        },
        {
          detection_info: 'etc',
          state: 'travel',
        },
        {
          detection_info: 'excavator',
          state: 'unload',
        },
        {
          detection_info: 'excavator',
          state: 'idle',
        },
        {
          detection_info: 'excavator',
          state: 'idle',
        },
        {
          detection_info: 'excavator',
          state: 'idle',
        },
        {
          detection_info: 'excavator',
          state: 'idle',
        },
      ],
    },
  ];
  const alpha = new DataFilter(DATA[0]);
  alpha.setCountByType();
  alpha.setCountByState();
  alpha.setTypeByState();
  console.log(alpha);

  /**
   * 이건 인사하는 함수입니다.
   * @param {*} inputMap
   * @returns
   */
  const mapToArray = inputMap => {
    let array = [];

    inputMap.forEach(function (value, key) {
      let obj = {};
      obj.name = key;
      obj.value = value;
      array.push(obj);
    });

    return array;
  };
  //////////////////////////////////////// NEW

  //////////////////////////////////////// OLD
  const countState = (data, state) => {
    let dataArray = [];
    data.map(a => {
      if (a.state === state) {
        a.vehicle.map(b => {
          let filteredData = { name: b.name, value: b.count };
          return dataArray.push(filteredData);
        });
      }
      return dataArray;
    });
    return dataArray;
  };
  //////////////////////////////////////// OLD

  const makeChartDATA = state => {
    const CHART_DATA = {
      name: state,
      // value: countState(data[0].vehicle_state, state), // OLD
      value: mapToArray(alpha.typeByState.get(state)), // NEW
    };
    return CHART_DATA.value;
  };

  console.log(makeChartDATA('unload'));

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
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
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
        {data[index].name} ({value}){/* {value === 0 ? null : name} */}
      </text>
    );
  };

  const COLORS = ['#FF4C65', '#FFC506', '#1CDFBB', '#47BEFF'];

  return (
    <article className="flex flex-wrap justify-center gap-10 mt-5">
      {CHART_LIST.map(state => {
        return (
          <div
            className="flex justify-center items-center flex-col gap-5"
            key={state.id}
          >
            {makeChartDATA(state.name).length > 0 ? (
              <PieChart width={300} height={300}>
                <Pie
                  data={makeChartDATA(state.name)}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={renderCustomizedLabel}
                  outerRadius={140}
                  fill="#8884d8"
                  nameKey="name"
                  dataKey="value"
                >
                  {data.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
              </PieChart>
            ) : (
              <div className="flex justify-center items-center w-75 h-75 font-bold text-3xl">
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
