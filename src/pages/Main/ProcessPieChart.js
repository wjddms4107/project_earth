import React from 'react';
import { PieChart, Pie, Cell, Label, Tooltip } from 'recharts';
import { useTranslation } from 'react-i18next';
import '../../assets/locales/lang/i18next';

export const ProcessPieChart = ({ data }) => {
  const { t } = useTranslation();
  if (!data) return <div>로딩중입니다.</div>;

  /**  */
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

  const alpha = data => {
    let dataArray = [];
    let total = { name: 'Total', progress: 100 };
    data.forEach(element => {
      console.log(element.name);
      element.name === '구역A' && dataArray.push(element);
    });
    dataArray.push(total);
    return dataArray;
  };

  console.log(alpha(PROGRESS_RATE));

  return (
    <article className="flex justify-start flex-wrap gap-10 mt-5">
      {CHART_LIST.map(state => {
        return (
          <div
            className="flex justify-center items-center flex-col gap-5"
            key={state.id}
          >
            {mapToArray(data.typeByState.get(state.name)).length > 0 ? (
              <PieChart width={210} height={210}>
                <Pie
                  data={AREA01}
                  cx="50%"
                  cy="50%"
                  dataKey="progress"
                  innerRadius={60}
                  outerRadius={80}
                >
                  {AREA01.map((entry, index) => {
                    if (index === 1) {
                      return <Cell key={`cell-${index}`} fill="#f3f6f9" />;
                    }
                    return <Cell key={`cell-${index}`} fill="green" />;
                  })}
                  <Label
                    value={`${AREA01[0].progress}%`}
                    position="center"
                    fill="grey"
                    style={{
                      fontSize: '32px',
                      fontWeight: 'bold',
                      fontFamily: 'Roboto',
                    }}
                  />
                </Pie>
              </PieChart>
            ) : (
              <div className="flex justify-center items-center w-[210px] h-[210px] font-bold text-3xl">
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

const CHART_LIST = [
  { id: 1, name: 'idle', value: '1구역' },
  { id: 2, name: 'travel', value: '2구역' },
  { id: 3, name: 'load', value: '3구역' },
  { id: 4, name: 'unload', value: '4구역' },
];

const AREA01 = [
  { name: '구역A', progress: 32.5 },
  { name: 'Total', progress: 100 },
];

const AREA02 = [
  { name: '구역B', progress: 32.5 },
  { name: 'Total', progress: 100 },
];

const PROGRESS_RATE = [
  { name: '구역A', progress: 32.5 },
  { name: '구역B', progress: 0 },
];
