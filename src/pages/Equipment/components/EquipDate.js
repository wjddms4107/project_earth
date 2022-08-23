import React from 'react';

const EquipDate = () => {
  const date = new Date();

  const year = date.getFullYear().toString().slice(2);
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const weekday = date.toString().slice(0, 3);
  const weekdayToKo = WEEKDAY_TO_KO.map(data => {
    return data[weekday];
  });

  // console.log(date);
  return <div> 기준 : 2022년 08년 03일 ~ 2022년 08년 06일</div>;
};

const WEEKDAY_TO_KO = [
  {
    Mon: '월',
    Tue: '화',
    Wed: '수',
    Thu: '목',
    Fri: '금',
    Sat: '토',
    Sun: '일',
  },
];

export default EquipDate;
