import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import EquipTypeSelect from './components/EquipTypeSelect';
import EquipAreaSelect from './components/EquipAreaSelcet';
import EquipListTable from './components/EquipListTable';
import EquipListDataAPI from '../../assets/data/equipListData.json';

const EquipList = () => {
  const navigate = useNavigate();
  const [equipList, setEquipList] = useState([]);
  const getEquipList = async () => {
    navigate('/equipment/list');
    // `http://192.168.0.129:8000/equipment/list`
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
      type === ''
        ? `?area=${area}`
        : area === ''
        ? `?type=${type}`
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

  const [type, setType] = useState('');
  const [area, setArea] = useState('');

  const handleType = event => {
    setType(event.target.value);
  };

  const handleArea = event => {
    setArea(event.target.value);
  };
  return (
    <div className="px-4">
      <div className="bg-achromatic-bg_paper">
        <div className="pb-1 text-2xl font-semibold">장비 리스트</div>
        <div className="flex pt-7 pb-9 border-2 rounded-md border-achromatic-text_disabled justify-between">
          <div className="flex">
            <div className="mx-16">
              <div className="text-sm font-semibold">장비 타입</div>
              <EquipTypeSelect type={type} handleType={handleType} />
            </div>
            <div>
              <div className="text-sm font-semibold">장비 구역</div>
              <EquipAreaSelect area={area} handleArea={handleArea} />
            </div>
          </div>
          <div className="flex">
            <div className="mr-16">
              <div className="text-sm font-semibold">&nbsp;&nbsp;</div>
              <button
                className="w-[270px] h-[34px] text-sm  border-2 rounded-md border-blue text-blue"
                onClick={() => {
                  getEquipList();
                  clickInitialization();
                }}
              >
                초기화
              </button>
            </div>
            <div className="mr-16">
              <div className="text-sm font-semibold">&nbsp;&nbsp;</div>
              <button
                className="w-[270px] h-[34px] text-sm border-2 rounded-md bg-blue text-achromatic-bg_default"
                onClick={() => {
                  type === '' && area === ''
                    ? alert(
                        '장비 타입이나 장비 구역 중 하나라도 선택해야 합니다.'
                      )
                    : clickSearch();
                }}
              >
                조회
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="pb-1 pt-12 text-2xl font-semibold">
        조회 장비 ({equipList.length}대)
      </div>
      <EquipListTable equipList={equipList} />
    </div>
  );
};
export default EquipList;
