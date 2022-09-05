/**
 * 공정률 Line Chart 데이터 배열 맨 앞에 객체 추가하는 함수
 * @param {*} LineData
 * @param {*} value
 * @returns 맨 앞에 객체 하나가 추가된 최종 공정률 Line chart 데이터 배열
 */
export function customizeLine(LineData, value) {
  LineData.unshift({ day: null, progress: value });
  return LineData;
}
