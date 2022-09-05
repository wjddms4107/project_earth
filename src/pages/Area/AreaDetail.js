import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { AreaDetailMap, AareaDetailLineChart } from '.';
import Streamedian from 'components/Streamedian';
import previous from 'assets/images/previous.svg';
import AreaDetailDataAPI from 'assets/data/AreaDetailData.json';
import AreaDetaiLineChartAPI from 'assets/data/AreaDetailLineChartAPI.json';
import { customizeLine } from 'utils/functions/area/areaDetail';

export const AreaDetail = () => {
  let { area_id } = useParams();
  const navigate = useNavigate();
  const [areaMapData, setAreaMapData] = useState([]);
  const [areaLineChartData, setAreaLineChartData] = useState([]);

  const EQUIP_DETAIL_DATA = [
    { id: 1, title: 'Area Name', area: areaMapData.area_name },
    {
      id: 2,
      title: 'GPS',
      lan: areaMapData.latitude,
      lng: areaMapData.longitude,
    },
    {
      id: 3,
      title: 'Camera GPS',
      lan: areaMapData.cam_latitude,
      lng: areaMapData.cam_longitude,
    },
  ];

  /**
   * google map 데이터 요청
   */
  const getAreaDetailData = async () => {
    const res = await fetch(
      `http://192.168.0.136:8000/area/detail/${area_id}`
    ).then(res => res.json());
    // const res = AreaDetailDataAPI;
    const areaMap = res.results;
    setAreaMapData(areaMap);
  };

  /**
   * Line Chart 데이터 요청
   */
  const getAreaDetailLineChartData = async () => {
    const resChart = await fetch(
      `http://192.168.0.136:8000/progress?select=weekly&area=${area_id}`
    ).then(res => res.json());
    // const resChart = AreaDetaiLineChartAPI;
    const areaChart = resChart.results;
    const finalAreaChart = areaChart[Object.keys(areaChart)[0]];
    setAreaLineChartData(
      customizeLine(finalAreaChart, finalAreaChart[0].progress)
    );
  };

  useEffect(() => {
    getAreaDetailData();
    getAreaDetailLineChartData();
  }, []);

  return (
    <div className="px-10 pt-3">
      <div className="flex mb-3 ">
        <img
          src={previous}
          alt="previous"
          onClick={() => navigate('/area/list')}
        />
        <div className="text-4xl font-bold ml-2">{areaMapData.area_name}</div>
      </div>
      <div className="flex mt-5">
        <div className="w-2/5 mr-10">
          <Streamedian id="test1" url={process.env.REACT_APP_RTSP_URL01} />
        </div>
        <div className="w-3/5 ">
          <AreaDetailMap areaMapData={areaMapData} />
        </div>
      </div>
      <div className="flex h-56 p-20 m-6">
        {EQUIP_DETAIL_DATA.map(({ id, title, area, lan, lng }) => {
          return (
            <div className="w-1/4" key={id}>
              <div className="text-xl font-semibold">{title}</div>
              <div className="text-lg leading-5">{id === 1 ? area : lan}</div>
              <div className="text-lg leading-5">{id > 1 && lng}</div>
            </div>
          );
        })}
      </div>
      <div className="text-2xl font-semibold">주간 공정률</div>
      <AareaDetailLineChart areaLineChartData={areaLineChartData} />
    </div>
  );
};
