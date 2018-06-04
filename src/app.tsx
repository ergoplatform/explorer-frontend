import * as React from 'react';
import { addLocaleData } from "react-intl";
import { Provider } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';
import { LastLocationProvider } from 'react-router-last-location';

import * as en from "react-intl/locale-data/en";
import * as ru from "react-intl/locale-data/ru";

import { AppComponent } from './containers/app/app.component';
import { ConnectedIntlProvider } from './containers/connected-intl-provider/connected-intl-provider';
import { AppStore } from './store/app.store';

const TextComponent = (props: any) => {
  return props.children;
};

addLocaleData([...en, ...ru]);

export const App = () => {
  return (<Provider store={ AppStore }>
    <ConnectedIntlProvider textComponent={TextComponent}>
      <BrowserRouter>
        <LastLocationProvider>
          <Route path='/' component={ AppComponent }/>
        </LastLocationProvider>
      </BrowserRouter>
    </ConnectedIntlProvider>
  </Provider>);
};
