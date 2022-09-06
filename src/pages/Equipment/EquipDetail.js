import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { EquipDetailBarChart } from './components/EquipDetailBarChart';
import EquipDetailDataAPI from 'assets/data/equipDetailData.json';
import backhoe from 'assets/images/backhoe.png';
import bulldozer from 'assets/images/bulldozer.png';
import excavators from 'assets/images/excavators.png';
import wheel_loader from 'assets/images/wheel_loader.png';
import previous from 'assets/images/previous.svg';
import { API } from 'config';

export const EquipDetail = () => {
  let { equipment_id } = useParams();
  let navigate = useNavigate();
  const [datailBarChartData, setDatailBarChartData] = useState([]);
  const [equipDetailData, setEquipDetailData] = useState([]);

  /**
   * 장비 디테일 데이터 요청 함수
   */
  const getEquipDetailData = async () => {
    const res = await fetch(`${API.EQUIP_DETAIL}${equipment_id}`).then(res =>
      res.json()
    );
    // const res = EquipDetailDataAPI;
    const detailBarChart = res.availablete_rating;
    const equipDetail = res.message;
    setDatailBarChartData(detailBarChart);
    setEquipDetailData(equipDetail);
  };

  useEffect(() => {
    getEquipDetailData();
  }, []);

  /**
   * 장비에 따른 이미지를 선택해주는 함수
   * @param {*} data
   * @returns 해당 장비 이미지
   */
  const selectImage = data => {
    switch (data) {
      case 'backhoe':
        return backhoe;
      case 'wheel_loader':
        return wheel_loader;
      case 'bulldozer':
        return bulldozer;
      default:
        return excavators;
    }
  };

  const EQUIP_DETAIL_DATA = [
    { id: 1, title: 'Serial Number', data: equipDetailData.serial_number },
    { id: 2, title: 'Type', data: equipDetailData.equipment_type },
    { id: 3, title: 'Company', data: equipDetailData.company },
    { id: 4, title: 'Area', data: equipDetailData.equipment_area },
  ];

  return (
    <div className="px-10 pt-3">
      <div className="flex">
        <div className="w-2/5 mr-10">
          <div className="flex mb-3 ">
            <img
              src={previous}
              alt="previous"
              onClick={() => navigate('/equipment/list')}
              className="cursor-pointer"
            />
            <span className="text-4xl font-bold ml-2">
              {equipDetailData.serial_number}
            </span>
          </div>
          <img
            src={selectImage(equipDetailData.equipment_type)}
            alt="equipment"
            className="mt-3 ml-7"
          />
        </div>
        <div className="w-full ml-11">
          <div className="mt-2 text-2xl font-semibold">주간 가동률</div>
          <EquipDetailBarChart datailBarChartData={datailBarChartData} />
        </div>
      </div>
      <div className="flex h-56 p-20">
        {EQUIP_DETAIL_DATA.map(({ id, title, data }) => {
          return (
            <div className="w-1/4" key={id}>
              <div className="text-xl font-semibold">{title}</div>
              <div className="text-lg">{data}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
