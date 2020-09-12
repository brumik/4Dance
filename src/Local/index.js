import i18n from 'i18n-js';
import memoize from 'lodash.memoize'; // Use for caching/memoize for better performance
import * as Localization from 'expo-localization';
import { I18nManager } from 'react-native';

export const translationGetters = {
  en: () => require('./en.json'),
  cs: () => require('./cs.json')
};

export const trans = memoize(
  (key, config) =>
    i18n.t(key, config).includes('missing') ? key : i18n.t(key, config),
  (key, config) => (config ? key + JSON.stringify(config) : key)
);

export const init = () => {
  let localeLanguageTag = Localization.locale;
  let isRTL = Localization.isRTL;

  // update layout direction
  I18nManager.forceRTL(isRTL);

  // set fallback language
  if (!Object.hasOwnProperty.call(translationGetters, localeLanguageTag)) {
    localeLanguageTag = 'en';
  }

  // set i18n-js config
  i18n.translations = {
    [localeLanguageTag]: translationGetters[localeLanguageTag]()
  };

  i18n.locale = localeLanguageTag;
};
