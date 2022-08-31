import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import translationKr from './translation.kr.json';

i18next.use(initReactI18next).init({
  resources: {
    kr: { translation: translationKr },
  },
  lng: 'kr',
});
