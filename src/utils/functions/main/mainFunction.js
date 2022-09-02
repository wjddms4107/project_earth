export function customizeLine(LineData, value) {
  LineData.unshift({ day: null, progress: value });
  return LineData;
}
