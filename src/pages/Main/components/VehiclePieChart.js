import React from 'react';
import { PieChart, Pie, Cell } from 'recharts';
import { COLORS, renderCustomizedLabel } from '.';
import { useTranslation } from 'react-i18next';
import 'assets/locales/lang/i18next';

export const VehiclePieChart = ({ data }) => {
  const { t } = useTranslation();

  const CHART_LIST = [
    { id: 1, name: 'idle', value: 'idle' },
    { id: 2, name: 'travel', value: 'travel' },
    { id: 3, name: 'load', value: 'working' },
    { id: 4, name: 'unload', value: 'unload' },
  ];

  /**
   * Map 객체를 배열로 변환
   */
  const mapToArray = inputMap => {
    let dataArray = [];
    inputMap &&
      inputMap.forEach(function (value, key) {
        let obj = {};
        obj.name = t(key);
        obj.value = value;
        dataArray.push(obj);
      });
    return dataArray;
  };

  if (!data) return <div>로딩중입니다.</div>;

  return (
    <article className="flex justify-start flex-wrap gap-10 mt-5">
      {CHART_LIST.map(state => {
        return (
          <div
            className="flex justify-center items-center flex-col gap-5"
            key={state.id}
          >
            {mapToArray(data.typeByState.get(state.name)).length > 0 ? (
              <PieChart width={190} height={190}>
                <Pie
                  data={mapToArray(data.typeByState.get(state.name))}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={renderCustomizedLabel}
                  outerRadius={95}
                  fill="#8884d8"
                  nameKey="name"
                  dataKey="value"
                  paddingAngle={0}
                >
                  {mapToArray(data.typeByState.get(state.name)).map(
                    (entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    )
                  )}
                </Pie>
              </PieChart>
            ) : (
              <div className="flex justify-center items-center w-[200px] h-[200px] font-bold text-3xl">
                NO DATA
              </div>
            )}

            <p className="font-bold text-2xl">{state.value.toUpperCase()}</p>
          </div>
        );
      })}
    </article>
  );
};
