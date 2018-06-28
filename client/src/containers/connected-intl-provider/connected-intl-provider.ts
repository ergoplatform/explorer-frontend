import { IntlProvider } from 'react-intl';
import { connect } from 'react-redux';

import { AppState } from '../../store/app.store';

export const messages = {
  en: require('../../locales/en.json'),
  ru: require('../../locales/ru.json')
};

function mapStateToProps (state: AppState): any {
  const locale  = state.settings.locale || 'en';
  
  return {
    locale,
    messages: { ...messages.en, ...messages[locale] }
  };
}

export const ConnectedIntlProvider = connect(mapStateToProps)(IntlProvider);
