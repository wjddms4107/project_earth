import React, { useEffect, useState } from 'react';
import { EquipListTypeSelect, EquipListAreaSelect, EquipListTable } from '.';
import EquipListDataAPI from 'assets/data/equipListData.json';
import { API } from 'config';

export const EquipList = () => {
  const [equipList, setEquipList] = useState([]);
  const [type, setType] = useState('');
  const [area, setArea] = useState('');
  const [menuItemType, setMenuItemType] = useState([]);
  const [menuItemArea, setMenuItemArea] = useState([]);

  /**
   * 장비 리스트 데이터 요청 함수
   */
  const getEquipList = async () => {
    // const res = await fetch(`${API.EQUIP_LIST}`).then(res => res.json());
    const res = EquipListDataAPI;
    const list = res.message;
    const menuItemType = [...new Set(list.map(data => data.equipment_type))];
    const menuItemArea = [...new Set(list.map(data => data.equipment_area))];
    setEquipList(list);
    setMenuItemType(menuItemType);
    setMenuItemArea(menuItemArea);
  };

  useEffect(() => {
    getEquipList();
  }, []);

  /**
   * 조회 버튼 클릭 시 쿼리 파라미터 수정, 해당 데이터 요청 함수
   */
  const clickSearch = () => {
    const typeQuery = `type=${type}`;
    const areaQuery = `area=${area}`;
    const finalQuery =
      (type === '') & (area !== '')
        ? `?${areaQuery}`
        : (area === '') & (type !== '')
        ? `?${typeQuery}`
        : (area === '') & (type === '')
        ? ''
        : `?${typeQuery}&${areaQuery}`;
    fetch(`${API.EQUIP_LIST}${finalQuery}`)
      .then(res => res.json())
      .then(data => setEquipList(data.message));
  };

  return (
    <section className="flex justify-center items-start flex-col w-full px-10 pt-3 gap-5 ">
      <div className="w-full">
        <h1 className="text-2xl font-bold">장비 리스트</h1>
        <div className="flex justify-between mt-5 px-14 py-10 gap-10 border-achromatic-text_disabled border-[1px] rounded-md bg-achromatic-bg_paper">
          <div className="flex w-full gap-5">
            <div>
              <h2 className="text-sm font-semibold">장비 타입</h2>
              <EquipListTypeSelect
                type={type}
                handleType={e => setType(e.target.value)}
                menuItemType={menuItemType}
              />
            </div>
            <div>
              <h2 className="text-sm font-semibold">장비 구역</h2>
              <EquipListAreaSelect
                area={area}
                handleArea={e => setArea(e.target.value)}
                menuItemArea={menuItemArea}
              />
            </div>
          </div>
          <div className="flex justify-end items-end w-full gap-5">
            <button
              className="max-w-[270px] min-w-[80px] w-full h-8 py-1 text-blue text-sm border-blue border-[1px] rounded-md"
              onClick={() => {
                getEquipList();
                setType('');
                setArea('');
              }}
            >
              초기화
            </button>
            <button
              className="max-w-[270px] min-w-[80px] w-full h-8 py-1 text-achromatic-bg_default text-sm bg-blue border-2 rounded-md"
              onClick={() => {
                clickSearch();
              }}
            >
              조 회
            </button>
          </div>
        </div>
      </div>
      <h1 className="pt-12 text-2xl font-semibold">
        조회 장비 ({equipList.length}대)
      </h1>
      <EquipListTable equipList={equipList} />
    </section>
  );
};
