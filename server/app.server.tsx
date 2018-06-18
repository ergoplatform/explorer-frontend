import * as React from 'react';
import { addLocaleData } from 'react-intl';
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router-dom';
import { LastLocationProvider } from 'react-router-last-location';

import * as en from 'react-intl/locale-data/en';
import * as ru from 'react-intl/locale-data/ru';

import '../client/src/assets/styles/main.scss';

import { AppComponent } from '../client/src/containers/app/app.component';
import { ConnectedIntlProvider } from '../client/src/containers/connected-intl-provider/connected-intl-provider';
import { configureStore } from '../client/src/store/app.store';
import { ServerErrorComponent } from '../client/src/pages/server-error/server-error.component';

const TextComponent = (props: any) => {
  return props.children;
};

addLocaleData([...en, ...ru]);

export const App = ({ location, context, preloadedState }: any) => {
  const AppStore = configureStore(preloadedState);
  
  return (<Provider store={ AppStore }>
    <ConnectedIntlProvider textComponent={ TextComponent }>
      <StaticRouter location={ location } context={ context }>
        <LastLocationProvider>
          <AppComponent/>
        </LastLocationProvider>
      </StaticRouter>
    </ConnectedIntlProvider>
  </Provider>);
};

export const Error = ({ location, context, preloadedState }: any) => {
  const AppStore = configureStore(preloadedState);
  
  return (<Provider store={ AppStore }>
    <ConnectedIntlProvider textComponent={ TextComponent }>
      <StaticRouter location={ location } context={ context }>
        <LastLocationProvider>
          <ServerErrorComponent/>
        </LastLocationProvider>
      </StaticRouter>
    </ConnectedIntlProvider>
  </Provider>);
};
