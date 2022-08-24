import React from 'react';
import { observer } from 'mobx-react-lite';
import timeStore from '../../stores/timeStore';

const Progress = observer(() => {
  return (
    <div className="relative">
      <div className="absolute top-3 right-10 flex justify-center py-1.5 h-11 w-36 rounded-full bg-achromatic-btn_action_select text-achromatic-text_secondary">
        {TIME_DATA.map(({ id, time, name }) => {
          return (
            <button
              onClick={e => timeStore.onChangeTime(e)}
              className={
                timeStore.ProgressTime === name
                  ? 'text-achromatic-bg_paper bg-blue-blue90 rounded-full h-8 w-16 '
                  : 'h-8 w-16'
              }
              name={name}
              key={id}
            >
              {time}
            </button>
          );
        })}
      </div>
    </div>
  );
});

const TIME_DATA = [
  { id: 1, time: '주별', name: 'weekly' },
  { id: 2, time: '월별', name: 'monthly' },
];

export default Progress;
