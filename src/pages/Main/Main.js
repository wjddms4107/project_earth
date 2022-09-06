import { useState, useEffect } from 'react';
import { VehiclePieChart, ProcessPieChart, TableChart } from '.';
import Streamedian from 'components/Streamedian';
import { DataFilter } from 'types/Main/dataFilter';
import { API } from 'config';

export const Main = () => {
  const [data, setData] = useState();
  const [progressData, setProgressData] = useState();
  const [tableList, setTableList] = useState([]);

  /**
   * 상태별 중장비, 시간별 중장비 데이터 요청
   */
  const equipRequest = async () => {
    try {
      const res = await fetch(`${API.MAIN}`);
      const result = await res.json();
      if (result.message === 'Not_Detected') {
        throw Error('Not_Detected');
      } else {
        setData(result.message[0]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  /**
   * 구역별 공정률 요청
   */
  const progressRequest = async () => {
    try {
      const res = await fetch(`${API.MAIN_PROGRESS}`);
      const result = await res.json();
      setProgressData(result.results);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    equipRequest();
    progressRequest();
    // setData(DATA[0]);
    // setProgressData(PROGRESS_RATE);
    const timer = setInterval(() => {
      equipRequest();
      // setData(DATA[0]);
    }, 1000 * 10);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (data && data !== 'Not_Detected') {
      let newClass = new DataFilter(data);
      newClass.setCountByType();
      newClass.setCountByState();
      newClass.setTypeByState();
      setTableList(current => {
        const newCurrent = [...current];
        newCurrent.length >= 10 && newCurrent.pop();
        newCurrent.unshift(newClass);
        return newCurrent;
      });
    }
  }, [data]);

  return (
    <section className="flex justify-center items-start max-full w-full px-10 pt-3 gap-5">
      <div className="flex justify-center items-start flex-col w-3/5 h-fit gap-12">
        <div className="w-full">
          <h1 className="text-2xl font-bold">상태별 중장비</h1>
          <VehiclePieChart data={tableList[0]} />
        </div>
        <div className="w-full">
          <h1 className="text-2xl font-bold">구역별 공정률</h1>
          <ProcessPieChart data={progressData} />
        </div>
      </div>

      <div className="flex justify-center items-start flex-col w-2/5 h-fit gap-12">
        <div className="w-full">
          <h1 className="text-2xl font-bold">CCTV</h1>
          <div className="flex flex-col mt-5 gap-3">
            <h2 className="text-xl font-semibold">구역A</h2>
            <Streamedian id="test1" url={process.env.REACT_APP_RTSP_URL01} />
          </div>
          <div className="flex flex-col mt-5 gap-3">
            <h2 className="text-xl font-semibold">구역B</h2>
            <Streamedian id="test2" url={process.env.REACT_APP_RTSP_URL02} />
          </div>
        </div>
        <div className="w-full">
          <h1 className="text-2xl font-bold">시간별 중장비 상태</h1>
          <div className="mt-5">
            <TableChart data={tableList} />
          </div>
        </div>
      </div>
    </section>
  );
};

const DATA = [
  {
    datetime: '2022-08-19T19:23:24',
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

const PROGRESS_RATE = [
  { name: '구역A', progress: 40 },
  { name: '구역B', progress: 60 },
];
