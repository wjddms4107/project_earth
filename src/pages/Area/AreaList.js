import React, { useEffect, useState } from 'react';
import { AreaListAreaSelect, AreaListTable } from '.';
import { API } from 'config';

export const AreaList = () => {
  const [area, setArea] = useState('');
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  /**
   * 구역 리스트 데이터 요청 함수
   * @param {*} search
   */
  const request = async () => {
    try {
      const res = await fetch(`${API.AREA_LIST}`);
      const result = await res.json();
      if (result.message === 'Value_Error') {
        throw Error('Value_Error');
      } else {
        setData(result.results);
      }
    } catch (error) {
      console.log(error);
    }
  };

  /**
   * 조회 클릭 시 데이터 필터링하는 함수
   */
  const dataFilter = () => {
    let result = data.filter(value => value.area_id === area);
    setFilteredData(result);
  };

  useEffect(() => {
    request();
    // setData(AREA_LIST.results);
  }, []);

  return (
    <section className="flex justify-center items-start flex-col w-full px-10 pt-3 gap-5">
      <div className="w-full">
        <h1 className="text-2xl font-bold">구역 리스트</h1>
        <div className="flex justify-between mt-5 px-14 py-10 gap-10 bg-achromatic-bg_paper border-achromatic-text_disabled border-[1px] rounded-md">
          <div className="flex w-full gap-5">
            <div className="">
              <div className="text-sm font-semibold">이름</div>
              <AreaListAreaSelect
                data={data}
                area={area}
                handleSelect={event => setArea(event.target.value)}
              />
            </div>
          </div>
          <div className="flex justify-end items-end w-full gap-5">
            <button
              className="max-w-[270px] min-w-[80px] w-full h-8 py-1 text-blue text-sm border-blue border-2 rounded-md"
              onClick={() => {
                setArea('');
                setFilteredData([]);
              }}
            >
              초기화
            </button>
            <button
              className="max-w-[270px] min-w-[80px] w-full h-8 py-1 text-achromatic-bg_default text-sm bg-blue border-2 rounded-md"
              onClick={() => {
                dataFilter();
              }}
            >
              조 회
            </button>
          </div>
        </div>
      </div>
      <div className="pt-12 text-2xl font-semibold">
        조회 구역 ({filteredData.length ? filteredData.length : data.length}개)
      </div>
      <AreaListTable areaList={filteredData.length ? filteredData : data} />
    </section>
  );
};
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
