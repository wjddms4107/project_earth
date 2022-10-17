import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { ProgressLineChart } from './components/ProgressLineChart';
import { timeStore } from 'stores/timeStore';
import ProgressData from 'assets/data/ProgressData.json';
import { customizeLine } from 'utils/functions/area/areaDetail';
import { API } from 'config';

export const Progress = observer(() => {
  const navigate = useNavigate();
  const [areaData, setAreaData] = useState([]);

  const TIME_DATA = [
    { id: 1, time: '주별', name: 'weekly' },
    { id: 2, time: '월별', name: 'monthly' },
  ];

  /**
   * 지역별 공정률 데이터 요청
   */
  const getProgressData = async () => {
    const res = await fetch(`${API.PROGRESS}${timeStore.ProgressTime}`).then(
      res => res.json()
    );
    // const res = ProgressData;
    Object.keys(res.results).map(area =>
      customizeLine(res.results[area], res.results[area][0].progress)
    );
    setAreaData(res.results);
  };

  useEffect(() => {
    updateOffset(timeStore.ProgressTime);
    getProgressData();
  }, [timeStore.ProgressTime]);

  /**
   * 주별/월별 버튼 클릭 시 쿼리 파라미터 수정 함수
   * @param {*} progressTime
   */
  const updateOffset = progressTime => {
    const queryString = `?select=${progressTime}`;
    navigate(`/progress${queryString}`);
  };

  return (
    <article className="relative bg-achromatic-bg_default">
      <div className="absolute top-3 right-10 flex justify-center py-1.5 h-11 w-36 rounded-full bg-achromatic-btn_action_select text-achromatic-text_secondary">
        {TIME_DATA.map(({ id, time, name }) => {
          return (
            <button
              onClick={e => {
                timeStore.onChangeProgressTime(e);
                updateOffset(timeStore.ProgressTime);
              }}
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
        <ProgressLineChart areaData={areaData} />
      </div>
    </article>
  );
});
