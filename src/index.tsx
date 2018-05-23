import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { addLocaleData } from 'react-intl';
import * as ReactModal from 'react-modal';

import * as en from 'react-intl/locale-data/en';
import * as ru from 'react-intl/locale-data/ru';

import { Provider } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';

import registerServiceWorker from './utils/registerServiceWorker';

import './assets/styles/main.scss';

import './config/axios.config';

import { ConnectedIntlProvider } from './containers/connected-intl-provider/connected-intl-provider';
import { AppStore } from './store/app.store';

import { AppComponent } from './containers/app/app.component';
import { enableTabMode } from './utils/enableTabMode';

addLocaleData([...en, ...ru]);

const rootElement = document.getElementById('root') as HTMLElement;

ReactModal.setAppElement(rootElement);

ReactDOM.render(
  <Provider store={ AppStore }>
    <ConnectedIntlProvider>
      <BrowserRouter>
        <Route path='/' component={ AppComponent }/>
      </BrowserRouter>
    </ConnectedIntlProvider>
  </Provider>, rootElement
);

enableTabMode();
registerServiceWorker();
