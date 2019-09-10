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
console.log("lang ", i18n.locale)
/*if(i18n.locale == 'ar'){
	I18nManager.forceRTL(true);
	//I18nManager.forceLTR(true);
}else{
	//I18nManager.forceLTR(false);
	I18nManager.forceRTL(false);
}*/
//

i18n.translations = {
  en,
  fr,
  ar
};

export default i18n;