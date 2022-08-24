import React from 'react';

const EquipList = () => {
  return (
    <>
      <div>
        <div className="pb-1 text-xl font-bold ">장비 리스트</div>
        <div className="flex border-2 justify-between">
          <div className="flex">
            <div className="mx-16">
              <div>장비 타입</div>
              <div className="w-[200px] border-2">장비 타입 셀렉트박스</div>
            </div>
            <div>
              <div>장비 구역</div>
              <div className="w-[200px] border-2">장비 구역 셀렉트박스</div>
            </div>
          </div>
          <div className="flex">
            <div className="mr-16">
              <div>&nbsp;&nbsp;</div>
              <button className="w-[270px] border-2">초기화</button>
            </div>
            <div className="mr-16">
              <div>&nbsp;&nbsp;</div>
              <button className="w-[270px] border-2">조회</button>
            </div>
          </div>
        </div>
      </div>
      <div className="pb-1 text-xl font-bold">조회 장비 (00대)</div>
    </>
  );
};

export default EquipList;
