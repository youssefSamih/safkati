import * as Localization from 'expo-localization';
import i18n from 'i18n-js';
import en from './locales/en';
import fr from './locales/fr';
import ar from './locales/ar';

i18n.fallbacks = true;
i18n.locale = 'fr';

i18n.translations = {
  en,
  fr,
  ar
};

export default i18n;