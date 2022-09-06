const BASE_URL = 'http://175.209.190.39:19999';

export const API = {
  MAIN: `${BASE_URL}`,
  MAIN_PROGRESS: `${BASE_URL}/progress?select=realtime`,
  EQUIP_ANALYSIS: `${BASE_URL}/equipment/analysis?select=`,
  EQUIP_LIST: `${BASE_URL}/equipment/list`,
  EQUIP_DETAIL: `${BASE_URL}/equipment/detail/`,
  PROGRESS: `${BASE_URL}/progress?select=`,
  AREA_LIST: `${BASE_URL}/area/list`,
  AREA_DETAIL: `${BASE_URL}/area/detail/`,
  AREA_DETAIL_LINECHART: `${BASE_URL}/progress?select=weekly&area=`,
};
