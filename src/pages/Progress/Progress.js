import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { AreaLineChart } from './components/AreaLineChart';
import timeStore from 'stores/timeStore';
import ProgressData from 'assets/data/ProgressData.json';

const Progress = observer(() => {
  const navigate = useNavigate();
  const [areaData, setAreaData] = useState([]);

  const getProgressData = async () => {
    const queryString = `?select=${timeStore.ProgressTime}`;
    navigate(`/progress${queryString}`);
    const res = await fetch(
      `http://192.168.0.136:8000/progress${queryString}`
    ).then(res => res.json());
    // const res = ProgressData;
    setAreaData(res.results);
  };

  useEffect(() => {
    getProgressData();
  }, [timeStore.ProgressTime]);

  return (
    <div className="relative bg-achromatic-bg_default">
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
      <div>
        <AreaLineChart areaData={areaData} />
      </div>
    </div>
  );
});

const TIME_DATA = [
  { id: 1, time: '주별', name: 'weekly' },
  { id: 2, time: '월별', name: 'monthly' },
];

export default Progress;
