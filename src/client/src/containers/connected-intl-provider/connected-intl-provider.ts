import { IntlProvider } from 'react-intl';
import { connect } from 'react-redux';

import { AppState } from '../../store/app.store';

const flatJSONKeys = (msgs: any, finalMap = {}, finalKey='') => {
  Object.keys(msgs)
    .forEach((key: string) => {
      let translationKey = key;
      
      if (finalKey) {
        translationKey = [finalKey, key].join('.');
      }
      
      if (typeof msgs[key] !== 'string') {
        flatJSONKeys(msgs[key], finalMap, translationKey);
      } else {
        finalMap[translationKey] = msgs[key];
      }
    }, finalMap);
  
  return finalMap;
};

export const messages = {
  en: flatJSONKeys(require('../../locales/en/translations.json')),
  ru: flatJSONKeys(require('../../locales/ru/translations.json'))
};

function mapStateToProps (state: AppState): any {
  const locale  = state.settings.locale || 'en';
  
  return {
    locale,
    messages: { ...messages.en, ...messages[locale] }
  };
}

export const ConnectedIntlProvider = connect(mapStateToProps)(IntlProvider);
