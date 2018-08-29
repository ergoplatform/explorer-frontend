import * as React from 'react';
import { addLocaleData } from 'react-intl';
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router-dom';
import { LastLocationProvider } from 'react-router-last-location';

import * as en from 'react-intl/locale-data/en';
import * as ru from 'react-intl/locale-data/ru';

import '../client/src/assets/styles/main.scss';

import { AppComponent } from '../client/src/containers/app/app.component';
import { ServerErrorComponent } from '../client/src/pages/server-error/server-error.component';

import { ConnectedIntlProvider } from '../client/src/containers/connected-intl-provider/connected-intl-provider';
import { configureStore } from '../client/src/store/app.store';

const TextComponent = (props: any) => {
  return props.children;
};

addLocaleData([...en, ...ru]);

export const App = ({ location, context, preloadedState, hasError }: any) => {
  const languages = ['en', 'ru'];
  let locale      = languages[0];
  
  const pathLanguage = location.split('/')[1];
  
  if (languages.includes(pathLanguage)) {
    locale = pathLanguage;
  }
  
  if (!preloadedState.settings) {
    preloadedState.settings = {};
  }
  
  preloadedState.settings.locale = locale;
  
  const AppStore = configureStore(preloadedState);
  
  return (<Provider store={ AppStore }>
    <ConnectedIntlProvider textComponent={ TextComponent }>
      <StaticRouter location={ location } context={ context } basename={ `/${locale}` }>
        <LastLocationProvider>
          { hasError ? <ServerErrorComponent/> : <AppComponent/> }
        </LastLocationProvider>
      </StaticRouter>
    </ConnectedIntlProvider>
  </Provider>);
};
