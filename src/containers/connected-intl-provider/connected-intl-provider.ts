import { IntlProvider } from 'react-intl';
import { connect } from 'react-redux';
import enKeys from '../../locales/en/translations.json';
import ruKeys from '../../locales/ru/translations.json';
import idKeys from '../../locales/id/translations.json';
import trKeys from '../../locales/tr/translations.json';

import { AppState } from '../../store/app.store';

const flatJSONKeys = (msgs: any, finalMap = {}, finalKey = '') => {
  Object.keys(msgs).forEach((key: string) => {
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
  en: flatJSONKeys(enKeys),
  ru: flatJSONKeys(ruKeys),
  id: flatJSONKeys(idKeys),
  tr: flatJSONKeys(trKeys),
};

function mapStateToProps(state: AppState): any {
  const locale = state.settings.locale || 'en';

  return {
    locale,
    messages: { ...messages.en, ...messages[locale] },
  };
}

export const ConnectedIntlProvider = connect(mapStateToProps)(IntlProvider);
