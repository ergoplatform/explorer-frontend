import * as React from 'react';
import { addLocaleData } from 'react-intl';
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router-dom';
import { LastLocationProvider } from 'react-router-last-location';

import * as en from 'react-intl/locale-data/en';
import * as ru from 'react-intl/locale-data/ru';

import { AppComponent } from '../containers/app/app.component';
import { ConnectedIntlProvider } from '../containers/connected-intl-provider/connected-intl-provider';
import { configureStore } from '../store/app.store';

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
