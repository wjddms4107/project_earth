import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import EquipDetailBarChart from './components/EquipDetailBarChart';
import EquipDetailDataAPI from '../../assets/data/equipDetailData.json';
import backhoe from '../../assets/images/backhoe.jpeg';
import bulldozer from '../../assets/images/bulldozer.jpeg';
import excuvators from '../../assets/images/excuvators.jpeg';
import wheel_loader from '../../assets/images/wheel_loader.jpeg';
import previous from '../../assets/images/previous.svg';

const EquipDetail = () => {
  let { equipment_id } = useParams();
  let navigate = useNavigate();
  const [datailBarChartData, setDatailBarChartData] = useState([]);
  const [equipDetailData, setEquipDetailData] = useState([]);

  const getEquipDetailData = async () => {
    // const res = await fetch(
    //   `http://192.168.0.129:8000/equipment/${equipment_id}`
    // ).then(res => res.json());
    const res = EquipDetailDataAPI;
    const detailBarChart = res.availablete_rating;
    const equipDetail = res.message;
    setDatailBarChartData(detailBarChart);
    setEquipDetailData(equipDetail);
  };

  useEffect(() => {
    getEquipDetailData();
  }, []);

  const EQUIP_DETAIL_DATA = [
    { id: 1, title: 'Serial Number', data: equipDetailData.serial_number },
    { id: 2, title: 'Type', data: equipDetailData.equipment_type },
    { id: 3, title: 'Company', data: equipDetailData.company },
    { id: 4, title: 'Area', data: equipDetailData.equipment_area },
  ];

  return (
    <>
      <div className="flex">
        <div className="w-2/5 mr-10">
          <div className="flex mb-3 ">
            <img
              src={previous}
              alt="previous"
              onClick={() => navigate('/equipment/list')}
            />
            <span className="text-4xl font-bold ml-2">
              {equipDetailData.serial_number}
            </span>
          </div>
          <img
            src={
              equipDetailData.equipment_type === 'backhoe'
                ? backhoe
                : equipDetailData.equipment_type === 'wheel_loader'
                ? wheel_loader
                : equipDetailData.equipment_type === 'bulldozer'
                ? bulldozer
                : excuvators
            }
            alt="equipment"
            width={494}
            height={309}
          />
        </div>
        <div className="w-full">
          <div className="mb-3 ml-2 mt-2 text-2xl font-semibold">
            주간 가동률
          </div>
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
    </>
  );
};

export default EquipDetail;
