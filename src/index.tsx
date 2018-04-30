import * as React from 'react';
import * as ReactDOM from 'react-dom';

import registerServiceWorker from './utils/registerServiceWorker';

import './assets/styles/main.scss';

import { AppComponent } from './containers/app.component';

ReactDOM.render(
  <AppComponent />,
  document.getElementById('root') as HTMLElement
);

registerServiceWorker();
