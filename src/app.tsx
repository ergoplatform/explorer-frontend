import React from 'react';
import { addLocaleData } from 'react-intl';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { LastLocationProvider } from 'react-router-last-location';

import en from 'react-intl/locale-data/en';
import ru from 'react-intl/locale-data/ru';
import id from 'react-intl/locale-data/id';
import tr from 'react-intl/locale-data/tr';

import { AppComponent } from './containers/app/app.component';

import { ConnectedIntlProvider } from './containers/connected-intl-provider/connected-intl-provider';
import { configureStore } from './store/app.store';
import { ServerErrorComponent } from './pages/server-error/server-error.component';
import { transitions, positions, Provider as AlertProvider } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';

// optional configuration
const alertOptions = {
  // you can also just use 'bottom center'
  position: positions.TOP_RIGHT,
  timeout: 5000,
  offset: '10px',
  // you can also just use 'scale'
  transition: transitions.FADE,
};

const TextComponent = (props: any) => {
  return props.children;
};

const preloadedState = window.__PRELOADED_STATE__ || {};

delete window.__PRELOADED_STATE__;

const settings = JSON.parse(localStorage.getItem('settings') as string) || {};

const languages = ['en', 'ru', 'id', 'tr'];
let locale = languages[0];

const pathLanguage = window.location.pathname.split('/')[1];

if (languages.includes(pathLanguage)) {
  locale = pathLanguage;
}

preloadedState.settings = {
  ...(preloadedState.settings || {}),
  ...settings,
  isSidebarDisplayed: false,
  locale,
};

const AppStore = configureStore(preloadedState);

addLocaleData([...en, ...ru, ...id, ...tr]);

export const App = () => {
  return (
    <AlertProvider template={AlertTemplate} {...alertOptions}>
      <Provider store={AppStore}>
        <ConnectedIntlProvider textComponent={TextComponent}>
          <BrowserRouter basename={`/${locale}`}>
            <LastLocationProvider>
              <Switch>
                {window.__HAS_ERROR__ && (
                  <Route path="/" component={ServerErrorComponent} />
                )}

                <Route path="/" component={AppComponent} />
              </Switch>
            </LastLocationProvider>
          </BrowserRouter>
        </ConnectedIntlProvider>
      </Provider>
    </AlertProvider>
  );
};
