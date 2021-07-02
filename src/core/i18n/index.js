//i18n-setup.js
import Vue from 'vue'
import VueI18n from 'vue-i18n'
import messages from './languages'
import axios from 'axios'

Vue.use(VueI18n)
console.log(messages);
export const i18n = new VueI18n({
  locale: 'en', // set locale
  fallbackLocale: 'en',
  messages: messages.en // set locale messages
})

const loadedLanguages = ['en'] // our default language that is preloaded

function setI18nLanguage(lang) {
  i18n.locale = lang
  axios.defaults.headers.common['Accept-Language'] = lang
  document.querySelector('html').setAttribute('lang', lang)
  return lang
}
var def = JSON.parse(localStorage.getItem('lang'));
if (def) {
  loadLanguageAsync(def.name)
}
else
  loadLanguageAsync('en')

export function loadLanguageAsync(lang) {
  if (i18n.locale === lang) {
    return Promise.resolve(setI18nLanguage(lang))
  }

  if (loadedLanguages.includes(lang)) {
    return Promise.resolve(setI18nLanguage(lang))
  }

  return import(`./languages/${lang}.js`).then(
    (messages) => {
      i18n.setLocaleMessage(lang, messages.default[lang])
      loadedLanguages.push(lang)
      return setI18nLanguage(lang)
    }
  )
}