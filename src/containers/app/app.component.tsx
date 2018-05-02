import * as React from 'react';
import { Route, Switch } from 'react-router';

import DataComponent from '../../components/data/data.component';
import NotFoundComponent from '../../components/not-found/not-found.component';
import SidebarComponent from '../../components/sidebar/sidebar.component';

import './app.scss';

export default class AppComponent extends React.PureComponent {
  render (): JSX.Element {
    return (
      <div className='bi-app g-flex'>
        <SidebarComponent/>
  
        <div className="bi-app__body g-flex__item">
          <Switch>
            <Route exact={ true } path='/' component={ DataComponent }/>
            
            <Route component={ NotFoundComponent }/>
          </Switch>
        </div>
      </div>
    );
  }
}
