import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import {
  EquipAnalysisPieChart,
  EquipAnalysisBarChart,
  EquipAnalysisDate,
} from '.';
import { timeStore } from 'stores/timeStore';
import EquipDataAPI from 'assets/data/equipData.json';
import { API } from 'config';

export const EquipAnalysis = observer(() => {
  const navigate = useNavigate();
  const [equipData, setEquipData] = useState([]);
  const [rateData, setRateData] = useState([]);
  const [truckData, setTruckData] = useState([]);

  const TIME_DATA = [
    { id: 1, time: '일별', name: 'daily' },
    { id: 2, time: '주별', name: 'weekly' },
    { id: 3, time: '월별', name: 'monthly' },
  ];

  const EQUIPINFO_DATA = [
    Object.keys(equipData).map((data, index) => {
      return { id: index + 1, sort: data };
    }),
  ];

  /**
   * 작업 장비 가동률, Not Idle Time 비율, 운송 장비 가동률 데이터 요청
   */
  const getEquipData = async () => {
    // const res = await fetch(`${API.EQUIP_ANALYSIS}${timeStore.equipTime}`).then(
    //   res => res.json()
    // );
    const res = EquipDataAPI;
    const equip = res.states;
    const rate = res.utilization_rates;
    const truckCount = res.truck_count;
    setEquipData(equip);
    setRateData(rate);
    setTruckData(truckCount);
  };

  useEffect(() => {
    updateOffset(timeStore.equipTime);
    getEquipData();
  }, [timeStore.equipTime]);

  /**
   * 일별/주별/월별 버튼 클릭 시 쿼리 파라미터 수정 함수
   * @param {*} equipTime
   */
  const updateOffset = equipTime => {
    const queryString = `?select=${equipTime}`;
    navigate(`/equipment/analysis${queryString}`);
  };

  return (
    <article className="relative">
      <div className="absolute top-3 right-10 flex justify-center py-1.5 h-11 w-52 rounded-full bg-achromatic-btn_action_select text-achromatic-text_secondary">
        {TIME_DATA.map(({ id, time, name }) => {
          return (
            <button
              onClick={e => {
                timeStore.onChangeEquipTime(e);
                updateOffset(timeStore.equipTime);
              }}
              className={
                timeStore.equipTime === name
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
      <div className="px-10 pt-3">
        <h1 className="pb-1 text-2xl font-semibold">작업 장비 가동률</h1>
        <div className="text-xl font-normal text-achromatic-text_secondary">
          중장비별 Idle, Travel, Working Time 비율과 일과시간 대비 작업시간
          비율입니다.
        </div>
        <div className="text-xl font-normal text-achromatic-text_secondary">
          <EquipAnalysisDate time={timeStore.equipTime} />
        </div>
        <div className="flex flex-wrap gap-x-32 gap-y-12 justify-center mb-16 ">
          {EQUIPINFO_DATA[0].map(({ id, sort }) => {
            return (
              <div className="h-full pr-2 pl-2" key={id}>
                <div className="flex justify-center align-middle relative text-2xl font-bold top-[131px]">
                  {!rateData[sort]
                    ? 'NO DATA'
                    : `${Math.floor(rateData[sort] * 100)}%`}
                </div>
                <div className="flex justify-center">
                  <EquipAnalysisPieChart
                    key={id}
                    equipData={equipData}
                    sort={sort}
                  />
                </div>
                <div className="flex pt-3 justify-center text-3xl font-bold">
                  {sort}
                </div>
              </div>
            );
          })}
        </div>
        <h1 className="pb-5 text-2xl font-semibold">운송 장비 가동률</h1>
        <div className="w-full h-auto">
          <EquipAnalysisBarChart truckData={truckData} />
        </div>
      </div>
    </article>
  );
});
