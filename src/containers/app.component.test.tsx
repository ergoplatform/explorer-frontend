import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { AppComponent } from './app.component';

it('App Renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<AppComponent/>, div);
});
