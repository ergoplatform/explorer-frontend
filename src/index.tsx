import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';

import registerServiceWorker from './utils/registerServiceWorker';

import './assets/styles/main.scss';

import { AppComponent } from './containers/app.component';
import { AppStore } from './store/app.store';

ReactDOM.render(
  <Provider store={AppStore}>
    <BrowserRouter>
      <Route path='/' component={AppComponent}/>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root') as HTMLElement
);

registerServiceWorker();
