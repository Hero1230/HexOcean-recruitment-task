import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import plApp from './utils/locales/pl/app.json'
import enApp from './utils/locales/en/app.json'

i18n.use(initReactI18next).init({
  resources: {
    pl: { translation: plApp },
    en: { translation: enApp }
  },
  lng: 'en',
  fallbackLng: 'pl',
  interpolation: {
    escapeValue: false
  }
})
export default i18n
