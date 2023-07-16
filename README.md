project_earth_frontend
> 실시간 CCTV 영상을 활용한 공정 모니터링 시스템 </br>
> [데모 영상](https://youtu.be/CRZ2Smt_EfQ) </br>
> [웹 페이지](https://project-earth-js.netlify.app/) </br>
> : 웹 페이지는 해당 기업 서버로 배포를 했었지만 내려진 상태입니다. </br>
> : 이에 netlify로 다시 배포를 했고 Equipment와 Progress 페이지를 mock data로 대체 구현해놓았습니다! </br>
> : 전체 구현에 대한 사항은 데모 영상 참고 부탁드립니다 : ) </br>


## 1. 제작 기간 & 참여 인원
- 2022년 8월 16일 ~ 2022년 9월 7일
- Front-End : 노정은, 오창훈 </br>
Back-End : 홍현진, 황유정

## 2. 사용 기술
- React
- Javascrips
- Tailwind CSS
- RESTful API
- 라이브러리 : Recharts, MUI, google map

## 3. 핵심 기술
#### `Project Earth란?`
- 산업 현장에 설치된 CCTV 영상 및 영상 분석 정보 수집 Pipeline
- 해당 정보를 토대로 현황 모니터링 및 공정률 분석이 가능한 플랫폼 개발

#### `Project Earth 핵심 기능`
- CCTV 영상 정보 수집
- 영상 분석 데이터 수집
- 수집 데이터 전처리 및 가공
- 분석 결과를 통한 현황 모니터링 및 공정률 분석
- 고객사 insight 제공

#### `개발 내용`
<img width="871" alt="스크린샷 2023-07-16 오후 9 46 53" src="https://github.com/wjddms4107/project_earth/assets/78889402/79a00717-35c4-4f6d-80d9-15b887a8bf13">

* 현황 모니터링 </br>
➡️ 중장비 운영 상태 및 구역 공정률 현황 실시간 모니터링 / CCTV 영상 송출로 사용자 확인 가능 </br>

* 중장비 관리 </br>
➡️ 중장비 가동률 분석 정보 (일, 주, 월) / 중장비 정보 관리 </br>

* 지역별 공정률 </br>
➡️ 지역별 공정률 분석 정보(주, 월) </br>

* 구역 관리 </br>
➡️ 구역 공정률 분석 정보(주, 월) / 구역 정보 관리 </br>

#### `FRONTEND 각 담당페이지`
- [노정은](https://jeongeuni.tistory.com/54?category=1103401): 중장비 통계 페이지, 중장비 관리 페이지, 중장비 세부 페이지, 구역 통계 페이지, 구역 세부 페이지 </br>
- 오창훈 : 네브바, 실시간 모니터링 페이지, 구역 관리 페이지

## 4. 핵심 문제 해결 경험
### 4.1 실시간으로 바뀌는 데이터 만지기 ➡️ [코드로 이동: EquipAnalysis](https://github.com/wjddms4107/project_earth/blob/9bfeaf453d3cfac8aeab9483d5d690bfb6538a7a/src/pages/Equipment/EquipAnalysis.js#L25), [코드로 이동: EquipAnalysisPieChart](https://github.com/wjddms4107/project_earth/blob/9bfeaf453d3cfac8aeab9483d5d690bfb6538a7a/src/pages/Equipment/components/EquipAnalysisPieChart.js#L8)

<img width="600" src="https://user-images.githubusercontent.com/78889402/192100870-b7330d64-f57d-444b-b5a1-e1d4c2474152.gif">

- 중장비 통계 페이지에서 보이는 작업장비들은 실시간으로 바뀌는 데이터입니다.

- 위코드 부트캠프에서 프로젝트를 할 때는 고정되어 있는 데이터를 만졌는데 
기업협업 프로젝트에서는 데이터가 실시간으로 바뀌어 고정되어 있는 데이터가 하나도 없었습니다.
그래서 데이터에 접근하면 데이터가 있다가 없어지는 경우가 생겨 오류가 발생했습니다.

- 이에 Backend에게 받은 데이터를 상수 데이터로 만들고 이 상수 데이터를 활용하여 구현해 낼 수 있었습니다.

<details>
<summary><b>기존 코드</b></summary>
<div markdown="1">


 ~~~javascript
const EQUIPINFO_DATA = [
  { id: 1, sort: 'excavators'},
  { id: 2, sort: 'backhoe'},
  { id: 3, sort: 'bulldozer'},
  { id: 4, sort: 'wheel_loader' },
];

// 위의 상수 데이터 이용해서 map 돌리기
{EQUIPINFO_DATA.map(({ id, sort }) => {
      return (
        <div className="w-full h-full flex flex-col pr-2 pl-2" key={id}>
           <div className="flex justify-center align-middle relative text-2xl font-bold top-[131px]">
             {rateData[sort]}%
            </div>
            <div className="flex justify-center">
              <EquipPieChart key={id} equipData={equipData} sort={sort} />
             </div>
             <div className="flex pt-3 justify-center text-3xl font-bold">
               {sort}
             </div>
         </div>
      );
})}
~~~


</div>
</details>

<details>
<summary><b>개선된 코드</b></summary>
<div markdown="1">

~~~javascript
const EQUIPINFO_DATA = [
    Object.keys(equipData).map((data, index) => {
      return { id: index + 1, sort: data };
    }),
  ];

// 위의 상수 데이터 이용해서 map 돌리기
{EQUIPINFO_DATA[0].map(({ id, sort }) => {
    return (
      <div className="h-full pr-2 pl-2" key={id}>
        <div className="flex justify-center align-middle relative text-2xl font-bold top-[131px]">
          {!rateData[sort]
            ? 'NO DATA'
            : `${Math.floor(rateData[sort] * 100)}%`}
        </div>
        <div className="flex justify-center">
          <EquipAnalysisPieChart
            key={id}
            equipData={equipData}
            sort={sort}
          />
        </div>
        <div className="flex pt-3 justify-center text-3xl font-bold">
          {sort}
        </div>
      </div>
    );
})}

// EquipAnalysisPieChart 컴포넌트 코드 
export const EquipAnalysisPieChart = ({ equipData, sort }) => {
  const isData = equipData.length !== 0;

  const data = [
    {
      name: 'Idle',
      value: sort && equipData[sort].idle,
    },
    {
      name: 'Travel',
      value: sort && equipData[sort].travel,
    },
    {
      name: 'Working',
      value: sort && equipData[sort].load,
    },
    {
      name: 'Unload',
      value: sort && equipData[sort].unload,
    },
  ];

  if (!isData) return <div>로딩중입니다.</div>;

  return (
    <PieChart width={220} height={230}>
      <Pie
        data={data}
        cx="50%"
        cy="50%"
        innerRadius={40}
        outerRadius={110}
        labelLine={false}
        label={renderCustomizedLabel}
        fill="#8884d8"
        dataKey="value"
        paddingAngle={0}
        nameKey="name"
      >
        {equipData[sort]
          ? data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index]} />
            ))
          : null}
      </Pie>
    </PieChart>
  );
};

~~~


</div>
</details>


### 4.2 구역별 공정률 페이지: Line Chart 한 칸 띄우기 ➡️ [코드로 이동](https://github.com/wjddms4107/project_earth/blob/9bfeaf453d3cfac8aeab9483d5d690bfb6538a7a/src/pages/Progress/Progress.js#L21)
<img width="600" src="https://user-images.githubusercontent.com/78889402/190293782-ba95c4f5-84f3-43f0-9300-66f3dcebe783.png">
<img width="600" src="https://user-images.githubusercontent.com/78889402/192101308-097848ba-a574-4735-adeb-98b344450742.gif">

- 주별, 월별에 따라 구역별로 공정률이 얼마나 진행됐는지 볼 수 있게 하기 위해 recharts라이브러리의 line chart를 활용했습니다. 간단해 보이는 이 페이지에 2~3일 동안 고민하여 구현했던 소중한 작업물이 있습니다.
- 그것은 그래프에서 line을 그릴 때 x좌표(일별)에서 0 ~ 5 부분이 한 줄로 찍- 이어지고 5부터 그래프가 시작하는 부분입니다. 원래는 0 ~ 5 부분이 없고 바로 시작했는데 오늘이 5일이라면 점하나 만 찍히는 이상한 그래프가 그려졌습니다. 이것은 사용자 입장에서 매우 불편하다고 생각했고 수정하고 싶었습니다.
- 금방 할 수 있는 것처럼 보였지만 stackoverflow, 공식문서, 다수의 블로그도 찾아보았지만 답이 없었습니다. 이에 제가 생각한 방법은 Backene에게 받은 데이터 앞에 임의로 데이터를 넣는 것 입니다. 그렇게 최종 공정률 Line Chart 데이터 배열을 만들어 줌으로써 해결할 수 있었습니다.

<details>
<summary><b>해결 step1. Line Chart는 공정률 페이지와 구역 디테일 페이지에 쓰이니 utils 활용</b></summary>
<div markdown="1">


~~~javascript
// utils의 functions폴더에 함수 만들어놓고 line chart를 구현해야 하는 페이지에서 import하여 사용하기
export function customizeLine(LineData, value) {
  LineData.unshift({ day: null, progress: value });
  return LineData;
}
~~~


</div>
</details>

<details>
<summary><b>해결 step2. fetch 받아온 공정률 Line Chart 데이터 배열 맨 앞에 객체 하나 추가</b></summary>
<div markdown="1">


~~~javascript
const getProgressData = async () => {
    const res = await fetch(`${API.PROGRESS}${timeStore.ProgressTime}`).then(
      res => res.json()
    );
    Object.keys(res.results).map(area =>
      customizeLine(res.results[area], res.results[area][0].progress)
    );
    setAreaData(res.results);
};
~~~


</div>
</details>

### 4.3 import 관리하기
- 각 페이지 마다 컴포넌트도 많고 mock data 등 import 해오는 것이 많아 import구문이 매우 지저분 했습니다. 어디에 존재하고 무슨 동작을 하는 컴포넌트 인지 알 수 있게 하기 위해 import를 관리해 보있습니다.

- 먼저 절대경로를 설정했습니다. 최상위에 jsconfig.json 파일 생성하여 baseUrl과 include를 설정한 후 파일 경로를 바꿔주었습니다.


~~~javascript
{
  "compilerOptions": {
    "baseUrl": "src",
  },
  "include": ["src"]
}
~~~
- 또한 같은 파일에 있는 모듈을 index 파일로 묶어 export 해주었습니다.
<details>
<summary><b>기존 import와 현재 import</b></summary>
<div markdown="1">

기존 import
~~~javascript
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import EquipPieChart from './components/EquipPieChart';
import TruckBarChart from './components/TruckBarChart';
import EquipDate from './components/EquipDate';
import timeStore from '../../stores/timeStore';
import EquipDataAPI from '../../assets/data/equipData.json';
~~~

현재 import
~~~javascript
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import {
  EquipAnalysisPieChart,
  EquipAnalysisBarChart,
  EquipAnalysisDate,
} from '.';
import { timeStore } from 'stores/timeStore';
import EquipDataAPI from 'assets/data/equipData.json';
~~~

</div>
</details>

<br/>

## 5. 그 외 문제 해결 방법

<details>
<summary><b>pie chart의 각 value 나타내기</b></summary>
<div markdown="1">
<img width="800" alt="스크린샷 2022-09-22 오후 7 48 50" src="https://user-images.githubusercontent.com/78889402/191727763-6032ab7b-2e54-4d7a-bec5-bc4cfe39bbf5.png">

- value가 0이면 보이지 않게 했고, 0이 아니면 해당 value가 중앙에 보이게 했습니다.
- [https://github.com/wjddms4107/project_earth/blob/9bfeaf453d3cfac8aeab9483d5d690bfb6538a7a/src/pages/Equipment/components/EquipAnalysisPieChartLabel.js#L1](https://github.com/wjddms4107/project_earth/blob/9bfeaf453d3cfac8aeab9483d5d690bfb6538a7a/src/pages/Equipment/components/EquipAnalysisPieChartLabel.js#L1)

</div>
</details>

<details>
<summary><b>select box dropdown 구현하기</b></summary>
<div markdown="1">

- Set객체로 겹치는 데이터는 지워주었습니다.
- ` const menuItemType = [...new Set(list.map(data => data.equipment_type))];`
- [EquipList](https://github.com/wjddms4107/project_earth/blob/9bfeaf453d3cfac8aeab9483d5d690bfb6538a7a/src/pages/Equipment/EquipList.js#L16)
- [EquipListAreaSelect](https://github.com/wjddms4107/project_earth/blob/9bfeaf453d3cfac8aeab9483d5d690bfb6538a7a/src/pages/Equipment/components/EquipListAreaSelect.js#L17)

</div>
</details>

<details>
<summary><b>Matarial UI 커스텀</b></summary>
<div markdown="1">
 <img width="700" alt="스크린샷 2022-09-16 오전 11 27 48" src="https://user-images.githubusercontent.com/78889402/190543503-fe503658-b04e-418f-91e4-1176e2019f11.png">
 
- MUI로 select box, table을 구현할 수 있었으나 문제는 커스컴에 있었습니다. 기능을 구현하기는 쉽지만 내가 원하는 레이아웃으로 커스텀하기가 꽤 까다로웠습니다.
- 이에 구글링과 공식문서를 통해 사용자 정의 스타일을 적용할 수 있게해주는 `makeStyles` React hook이 있다는 것을 알았고 커스텀할 수 있었습니다.
- [table](https://github.com/wjddms4107/project_earth/blob/9bfeaf453d3cfac8aeab9483d5d690bfb6538a7a/src/pages/Equipment/components/EquipListTable.js#L13)
- [select box](https://github.com/wjddms4107/project_earth/blob/main/src/pages/Equipment/components/EquipListAreaSelect.js)
 
</div>
</details>

<details>
<summary><b>장비에 알맞는 이미지 보여주기</b></summary>
<div markdown="1">

- 가시성 좋은 swich문으로 구현했습니다.
- [https://github.com/wjddms4107/project_earth/blob/9bfeaf453d3cfac8aeab9483d5d690bfb6538a7a/src/pages/Equipment/EquipDetail.js#L41](https://github.com/wjddms4107/project_earth/blob/9bfeaf453d3cfac8aeab9483d5d690bfb6538a7a/src/pages/Equipment/EquipDetail.js#L41)

</div>
</details>


<details>
<summary><b>google map 해당 지역에 marker, circle 표시</b></summary>
<div markdown="1">
<img width="800" alt="스크린샷 2022-09-22 오후 7 55 42" src="https://user-images.githubusercontent.com/78889402/191729031-fe107db5-e6d2-4da5-a154-fef9c5b847a7.png">

- https://github.com/wjddms4107/project_earth/blob/9bfeaf453d3cfac8aeab9483d5d690bfb6538a7a/src/pages/Area/components/AreaDetailMap.js#L10


</div>
</details>

<details>
<summary><b>mobx로 상태관리</b></summary>
<div markdown="1">

- EquipAnalysis 페이지는 '일별/주별/월별' 선택가능, Progress 페이지는 '주별/월별' 선택가능한데 비슷한 코드를 두 번 쓰는 것이 비효율적이라 생각했습니다.
- [store](https://github.com/wjddms4107/project_earth/blob/main/src/stores/timeStore.js)
- [EquipAnalysis](https://github.com/wjddms4107/project_earth/blob/9bfeaf453d3cfac8aeab9483d5d690bfb6538a7a/src/pages/Equipment/EquipAnalysis.js#L67)
- [Progress](https://github.com/wjddms4107/project_earth/blob/9bfeaf453d3cfac8aeab9483d5d690bfb6538a7a/src/pages/Progress/Progress.js#L52)

</div>
</details>

## 6. 🎥 각 페이지별 View
> [데모 영상](https://youtu.be/CRZ2Smt_EfQ)

<table>
  <thead>
    <tr>
      <th>
        main
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td align="center">
        <img width="789" alt="image" src="https://user-images.githubusercontent.com/78889402/188804037-f5e78e9a-b841-434d-aa49-544561d85b97.jpeg"> 
      </td>
    </tr>
  </tbody>
</table>
<table>
  <thead>
    <tr>
      <th>
        equipment analysis
      </th>
      <th>
        equipment list
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td align="center">
        <img width="789" alt="equipment analysis" src="https://user-images.githubusercontent.com/78889402/188804414-4264b103-f984-4202-a231-9cc52f121b13.png">
      </td>
      <td align="center">
         <img width="789" alt="equipment list" src="https://user-images.githubusercontent.com/78889402/188804514-30c3adc7-86c9-4e95-91aa-724453314c84.png">
      </td>
    </tr>
  </tbody>
</table>
<table>
  <thead>
    <tr>
      <th>
        equipment detail
      </th>
      <th>
        progress
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td align="center">
       <img width="789" alt="equipment detail" src="https://user-images.githubusercontent.com/78889402/188804540-b1715feb-82ff-4b2d-9243-4848f3a048fb.png">
      </td>
      <td align="center">
        <img width="789" alt="progress" src="https://user-images.githubusercontent.com/78889402/188804575-3b905dff-b076-4324-9fea-43c9de188217.png">
      </td>
    </tr>
  </tbody>
</table>
<table>
  <thead>
    <tr>
      <th>
        area list
      </th>
      <th>
        area detail
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
     <td align="center">
         <img width="789" alt="progress" src="https://user-images.githubusercontent.com/78889402/188804603-9d69ce6b-6dc6-402a-89a2-1ebb6b582207.png">
      </td>
      <td align="center">
        <img width="789" alt="image" src="https://user-images.githubusercontent.com/78889402/188804744-4ac0e067-b767-493a-be08-6a5908533def.jpeg">
      </td>
    </tr>
  </tbody>
</table>

## 7. 프로젝트 회고
- [노정은님 회고록 - 기능 구현에 대한 회고](https://jeongeuni.tistory.com/63)  <br />
