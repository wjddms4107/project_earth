import React from 'react';
export const EquipAnalysisDate = ({ time }) => {
  /**
   * 월요일 구하는 함수
   * @param {*} d
   * @returns Date객체로 월요일
   */
  function getMonday(d) {
    d = new Date(d);
    let day = d.getDay(),
      diff = d.getDate() - day + (day === 0 ? -6 : 1);
    return new Date(d.setDate(diff));
  }

  // 월요일 Data객체 - yyyy년 mm월 dd일로 가공하기
  const mondayData = getMonday(new Date());
  const mondayYear = mondayData.getFullYear().toString();
  const mondayMonth = mondayData.getMonth() + 1;
  const mondayDay = mondayData.getDate();
  const finalMonday = `${mondayYear}년 ${
    mondayMonth >= 10 ? mondayMonth : '0' + mondayMonth
  }월 ${mondayDay >= 10 ? mondayDay : '0' + mondayDay}일 `;

  // Date객체 - yyyy년 mm월 dd일로 가공하기
  const date = new Date();
  const year = date.getFullYear().toString();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  // 일별, 주별, 월별 기준 구하기
  const dailyDate = `${year}년 ${month >= 10 ? month : '0' + month}월 ${
    day >= 10 ? day : '0' + day
  }일 `;
  const weeklyDate =
    time === 'weekly' && finalMonday !== dailyDate
      ? `${finalMonday} ~ ${dailyDate}`
      : dailyDate;
  const monthlyDate = `${year}년 ${month >= 10 ? month : '0' + month}월`;

  return (
    <div>
      기준 :{' '}
      {time === 'daily'
        ? dailyDate
        : time === 'weekly'
        ? weeklyDate
        : monthlyDate}
    </div>
  );
};
