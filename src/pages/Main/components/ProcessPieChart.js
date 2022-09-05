import React from 'react';
import { PieChart, Pie, Cell, Label } from 'recharts';
import 'assets/locales/lang/i18next';

export const ProcessPieChart = ({ data }) => {
  if (!data) return <div>로딩중입니다.</div>;

  return (
    <article className="flex justify-start flex-wrap gap-10 mt-5">
      {data.map(state => {
        return (
          <div
            className="flex justify-center items-center flex-col gap-5"
            key={state.name}
          >
            <PieChart width={240} height={240}>
              <Pie
                data={[state, { name: 'rest', progress: 100 - state.progress }]}
                cx="50%"
                cy="50%"
                dataKey="progress"
                innerRadius={60}
                outerRadius={80}
              >
                {data.map((entry, index) => {
                  if (index === 1) {
                    return <Cell key={`cell-${index}`} fill="#f3f6f9" />;
                  }
                  return <Cell key={`cell-${index}`} fill="green" />;
                })}
                <Label
                  value={`${state.progress}%`}
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
            <p className="font-bold text-2xl">{state.name}</p>
          </div>
        );
      })}
    </article>
  );
};
