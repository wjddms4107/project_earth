import Streamedian from '../Streamedian';
import VehiclePieChart from './VehiclePieChart';
import ProcessPieChart from './ProcessPieChart';
import TableChart from './TableChart';
import { useState, useEffect } from 'react';
import DataFilter from './dataFilter';

export default function Main() {
  const [data, setData] = useState();
  const [tableList, setTableList] = useState([]);

  async function request() {
    const res = await fetch('http://192.168.0.129:8000');
    const result = await res.json();
    setData(result.message[0]);
  }

  useEffect(() => {
    const timer = setInterval(async () => {
      // await request();
      // const newClass = new DataFilter(data);
      const newClass = new DataFilter(DATA[0]);
      newClass.setCountByType();
      newClass.setCountByState();
      newClass.setTypeByState();

      setTableList(current => {
        const newCurrent = [...current];
        newCurrent.length >= 20 && newCurrent.pop();
        newCurrent.unshift(newClass);
        return newCurrent;
      });
    }, 10000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="flex justify-center items-start max-full w-full px-10 pt-3 gap-5">
      <div className="leftPanel flex justify-center items-start flex-col w-1/2 h-fit gap-10">
        <div className="vehicleChart">
          <h1 className="text-2xl font-bold">상태별 중장비</h1>
          <VehiclePieChart data={tableList[0]} />
        </div>
        <div className="processChart">
          <h1 className="text-2xl font-bold">구역별 공정률</h1>
          {/* <ProcessPieChart /> */}
        </div>
      </div>

      <div className="rightPanel flex justify-center items-start flex-col w-1/2 h-fit gap-10">
        <div className="videoOut">
          <h1 className="text-2xl font-bold">CCTV</h1>
          <div className="w-full max-h-fit mt-5">
            <Streamedian id="test" url="rtsp://192.168.0.102/stream1" />
          </div>
        </div>
        <div>
          <h1 className="text-2xl font-bold">시간별 중장비 상태</h1>
          <div className="statusChart mt-5">
            <TableChart data={tableList} />
          </div>
        </div>
      </div>
    </section>
  );
}

const DATA = [
  {
    datetime: '2022-08-19T19:23:24+0900',
    type: [
      {
        detection_info: 'backhoe',
        state: 'unload',
      },
      {
        detection_info: 'wheel_loader',
        state: 'unload',
      },
      {
        detection_info: 'backhoe',
        state: 'load',
      },
      // {
      //   detection_info: 'bulldozer',
      //   state: 'travel',
      // },
      {
        detection_info: 'excavators',
        state: 'unload',
      },
      {
        detection_info: 'excavators',
        state: 'idle',
      },
      {
        detection_info: 'excavators',
        state: 'idle',
      },
      {
        detection_info: 'excavators',
        state: 'idle',
      },
      {
        detection_info: 'excavators',
        state: 'idle',
      },
    ],
  },
];
