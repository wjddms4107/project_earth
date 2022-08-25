import Streamedian from '../Streamedian';
import MainPieChart from './MainPieChart';
import MainTableChart from './MainTableChart';
import { useState, useEffect } from 'react';

export default function Main() {
  const [data, setData] = useState();

  async function request() {
    // const res = await fetch(
    //   `http://35.90.169.104:8000/products/${params.product_id}`
    // );
    const res = await fetch('/data/alpha_reconstructured.json');
    const result = await res.json();
    setData(result);
  }

  useEffect(() => {
    request();
  }, []);

  return (
    <section className="flex justify-center items-start max-full w-full px-10 pt-3 gap-5">
      <div className="leftPanel w-1/2 h-fit">
        <h1 className="text-2xl font-bold">상태별 중장비</h1>
        <div className="dataChart">
          <MainPieChart data={data} />
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
          <div className="tableChart mt-5">
            <MainTableChart data={data} />
          </div>
        </div>
      </div>
    </section>
  );
}
