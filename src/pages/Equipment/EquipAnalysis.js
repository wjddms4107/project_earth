import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import EquipPieChart from './components/EquipPieChart';
import TruckBarChart from './components/TruckBarChart';
import EquipDate from './components/EquipDate';
import timeStore from '../../stores/timeStore';
import EquipDataAPI from '../../assets/data/equipData.json';

const EquipAnalysis = observer(() => {
  const navigate = useNavigate();
  const [equipData, setEquipData] = useState([]);
  const [rateData, setRateData] = useState([]);
  const [truckData, setTruckData] = useState([]);

  const getEquipData = async () => {
    const queryString = `?select=${timeStore.equipTime}`;
    navigate(`/equipment/analysis${queryString}`);
    // const res = await fetch(
    //   `http://192.168.0.136:8000/equipment/analysis${queryString}`
    // ).then(res => res.json());
    const res = EquipDataAPI;
    const equip = res.states;
    const rate = res.utilization_rates;
    const truckCount = res.truck_count;
    setEquipData(equip);
    setRateData(rate);
    setTruckData(truckCount);
  };

  useEffect(() => {
    getEquipData();
  }, [timeStore.equipTime]);

  const EQUIPINFO_DATA = [
    { id: 1, sort: Object.keys(equipData)[0] },
    { id: 2, sort: Object.keys(equipData)[1] },
    { id: 3, sort: Object.keys(equipData)[2] },
    { id: 4, sort: Object.keys(equipData)[3] },
  ];

  return (
    <div className="relative">
      <div className="absolute top-3 right-10 flex justify-center py-1.5 h-11 w-52 rounded-full bg-achromatic-btn_action_select text-achromatic-text_secondary">
        {TIME_DATA.map(({ id, time, name }) => {
          return (
            <button
              onClick={e => timeStore.onChangeTime(e)}
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
        <div className="pb-1 text-2xl font-semibold">작업 장비 가동률</div>
        <div className="text-xl font-normal text-achromatic-text_secondary">
          중장비별 Idle, Travel, Load, Unload Time 비율과 작업 시간 대비 Not
          Idle Time 비율입니다.
        </div>
        <div className="text-xl font-normal text-achromatic-text_secondary">
          <EquipDate time={timeStore.equipTime} />
        </div>
        <div className="flex justify-center mb-16 ">
          {EQUIPINFO_DATA.map(({ id, sort }) => {
            return (
              <div className="w-full h-full flex flex-col pr-2 pl-2" key={id}>
                <div
                  className={
                    rateData[sort] === 0
                      ? 'flex justify-center align-middle relative text-2xl font-bold top-[131px] '
                      : 'flex justify-center align-middle relative text-2xl font-bold top-[131px]'
                  }
                >
                  {rateData[sort] === 0
                    ? 'NO DATA'
                    : `${Math.floor(rateData[sort] * 100)}%`}
                </div>
                <div className="flex justify-center">
                  <EquipPieChart key={id} equipData={equipData} sort={sort} />
                </div>
                <div className="flex pt-3 justify-center text-3xl font-bold">
                  {sort}
                </div>
              </div>
            );
          })}
        </div>
        <div className="pb-5 text-2xl font-semibold">운송 장비 가동률</div>
        <div className="w-full h-auto">
          <TruckBarChart truckData={truckData} />
        </div>
      </div>
    </div>
  );
});

const TIME_DATA = [
  { id: 1, time: '일별', name: 'daily' },
  { id: 2, time: '주별', name: 'weekly' },
  { id: 3, time: '월별', name: 'monthly' },
];

export default EquipAnalysis;
