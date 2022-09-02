import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { EquipListTypeSelect, EquipListAreaSelect, EquipListTable } from '.';
import EquipListDataAPI from 'assets/data/equipListData.json';

export const EquipList = () => {
  const navigate = useNavigate();
  const [equipList, setEquipList] = useState([]);
  const [type, setType] = useState('');
  const [area, setArea] = useState('');

  const getEquipList = async () => {
    navigate('/equipment/list');
    // const res = await fetch(`http://192.168.0.129:8000/equipment/list`).then(
    //   res => res.json()
    // );
    const res = EquipListDataAPI;
    const list = res.message;
    setEquipList(list);
  };

  useEffect(() => {
    getEquipList();
  }, []);

  const clickSearch = () => {
    const typeQuery = `type=${type}`;
    const areaQuery = `area=${area}`;
    const finalQuery =
      (type === '') & (area !== '')
        ? `?area=${area}`
        : (area === '') & (type !== '')
        ? `?type=${type}`
        : (area === '') & (type === '')
        ? ''
        : `?${typeQuery}&${areaQuery}`;
    navigate(`/equipment/list${finalQuery}`);
    fetch(`http://192.168.0.129:8000/equipment/list${finalQuery}`)
      .then(res => res.json())
      .then(data => setEquipList(data.message));
  };

  const clickInitialization = () => {
    setType('');
    setArea('');
  };

  const handleType = event => {
    setType(event.target.value);
  };

  const handleArea = event => {
    setArea(event.target.value);
  };

  return (
    <section className="flex justify-center items-start flex-col w-full px-10 pt-3 gap-5 ">
      <div className="equipSelectContainer w-full">
        <h1 className="text-2xl font-bold">장비 리스트</h1>
        <div className="flex justify-between mt-5 px-14 py-10 gap-10 border-achromatic-text_disabled border-[1px] rounded-md bg-achromatic-bg_paper">
          <div className="flex w-full gap-5">
            <div className="equipSelect">
              <div className="text-sm font-semibold">장비 타입</div>
              <EquipListTypeSelect type={type} handleType={handleType} />
            </div>
            <div>
              <div className="text-sm font-semibold">장비 구역</div>
              <EquipListAreaSelect area={area} handleArea={handleArea} />
            </div>
          </div>
          <div className="flex justify-end items-end w-full gap-5">
            <button
              className="resetButton max-w-[270px] min-w-[80px] w-full h-8 py-1 text-blue text-sm border-blue border-[1px] rounded-md"
              onClick={() => {
                getEquipList();
                clickInitialization();
              }}
            >
              초기화
            </button>
            <button
              className="inqueryButton max-w-[270px] min-w-[80px] w-full h-8 py-1 text-achromatic-bg_default text-sm bg-blue border-2 rounded-md"
              onClick={() => {
                clickSearch();
              }}
            >
              조 회
            </button>
          </div>
        </div>
      </div>
      <div className="pt-12 text-2xl font-semibold">
        조회 장비 ({equipList.length}대)
      </div>
      <EquipListTable equipList={equipList} />
    </section>
  );
};
