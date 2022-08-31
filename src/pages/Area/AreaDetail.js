import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AreaDetailMap from './components/AreaDetailMap';
import AareaDetailLineChart from './components/AreaDetailLineChart';
import previous from '../../assets/images/previous.svg';
import AreaDetailDataAPI from '../../assets/data/AreaDetailData.json';

const AreaDetail = () => {
  let { area_id } = useParams();
  const navigate = useNavigate();
  const [areaMapData, setAreaMapData] = useState([]);
  const getAreaDetailData = async () => {
    // const res = await fetch(`http://192.168.0.129:8000/area/detail/${area_id}`).then(res =>
    //   res.json()
    // );
    const res = AreaDetailDataAPI;
    const areaMap = res.results;
    setAreaMapData(areaMap);
  };
  useEffect(() => {
    getAreaDetailData();
  }, []);

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
  return (
    <>
      <div className="flex mb-3 ">
        <img
          src={previous}
          alt="previous"
          onClick={() => navigate('/area/list')}
        />
        <div className="text-4xl font-bold ml-2">{areaMapData.area_name}</div>
      </div>
      <div className="flex">
        <div className="w-1/3 mr-10">
          <div width={494} height={309} />
        </div>
        <div className="w-2/3">
          <AreaDetailMap areaMapData={areaMapData} />
        </div>
      </div>
      <div className="flex h-56 p-20 m-6 bg-achromatic-bg_paper">
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
      <AareaDetailLineChart />
    </>
  );
};

export default AreaDetail;
