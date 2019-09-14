import { I18nManager, AsyncStorage } from 'react-native';
import * as Localization from 'expo-localization';

import i18n from 'i18n-js';
import en from './locales/en';
import fr from './locales/fr';
import ar from './locales/ar';

i18n.fallbacks = true;
i18n.locale = 'fr';
/*const lang = await AsyncStorage.getItem('selectedLang');
if(lang){
 i18n.locale = lang;
}*/

i18n.translations = {
  fr,
  ar
};

console.log("lang ", i18n.locale);
I18nManager.allowRTL(i18n.locale in i18n.translations);
i18n.start  = I18nManager.isRTL ? 'right' : 'left';
i18n.end    = I18nManager.isRTL ? 'left' : 'right';

export default i18n;