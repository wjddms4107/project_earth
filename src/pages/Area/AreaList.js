import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import EquipTypeSelect from './components/EquipTypeSelect';
import EquipListTable from './components/EquipListTable';

const EquipList = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [area, setArea] = useState('');
  const [data, setData] = useState([]);

  async function request(search) {
    const res = await fetch(`http://192.168.0.129:8000/area/list${search}`);
    const result = await res.json();
    setData(result.message);
  }

  useEffect(() => {
    // await request();
    setData(AREA_LIST.results);
  }, [location.search]);

  const updateOffset = areaIndex => {
    let queryString = '';
    area && (queryString = `?area=${areaIndex}`);
    navigate(queryString);
  };

  const handleSelect = event => {
    setArea(event.target.value);
  };

  return (
    <section className="flex justify-center items-start flex-col w-full px-10 pt-3 gap-5">
      <div className="equipSelectContainer w-full">
        <h1 className="text-2xl font-bold">구역 리스트</h1>
        <div className="flex justify-between mt-5 px-14 py-10 gap-10 border-achromatic-text_disabled border-2 rounded-md">
          <div className="flex w-full gap-5">
            <div className="equipSelect">
              <div className="text-sm font-semibold">이름</div>
              <EquipTypeSelect area={area} handleSelect={handleSelect} />
            </div>
          </div>
          <div className="flex justify-end items-end w-full gap-5">
            <button
              className="resetButton max-w-[270px] min-w-[80px] w-full h-8 py-1 text-blue text-sm border-blue border-2 rounded-md"
              onClick={() => {
                setArea('');
              }}
            >
              초기화
            </button>
            <button
              className="inqueryButton max-w-[270px] min-w-[80px] w-full h-8 py-1 text-achromatic-bg_default text-sm bg-blue border-2 rounded-md"
              onClick={() => {
                updateOffset(area);
              }}
            >
              조 회
            </button>
          </div>
        </div>
      </div>
      <div className="pt-12 text-2xl font-semibold">
        조회 구역 ({data.length}개)
      </div>
      <EquipListTable areaList={data} />
    </section>
  );
};
export default EquipList;

const AREA_LIST = {
  message: 'SUCCESS',
  area_list: {
    1: '구역A',
    2: '구역B',
  },
  results: [
    {
      area_id: 1,
      area_name: '구역A',
      address: '충남 부여군 부여읍 사비로 33',
      latitude: '36.275610',
      longitude: '126.909785',
      cam_latitude: '36.275835',
      cam_longitude: '126.909788',
    },
    {
      area_id: 2,
      area_name: '구역B',
      address: '충남 부여군 부여읍 금성로 5',
      latitude: '36.276907',
      longitude: '126.918963',
      cam_latitude: '36.276433',
      cam_longitude: '126.919087',
    },
  ],
};
