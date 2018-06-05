import * as React from 'react';
import { hot } from 'react-hot-loader';
import { Route, Switch } from 'react-router';

import { HeaderComponent } from '../../components/header/header.component';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';

import { AddressComponent } from '../../pages/address/address.component';
import { ApiComponent } from '../../pages/api/api.component';
import { BlockComponent } from '../../pages/block/block.component';
import { ChartComponent } from '../../pages/chart/chart.component';
import { ChartsComponent } from '../../pages/charts/charts.component';
import { DataComponent } from '../../pages/data/data.component';
import { NotFoundComponent } from '../../pages/not-found/not-found.component';
import { StatsComponent } from '../../pages/stats/stats.component';
import { TransactionComponent } from '../../pages/transaction/transaction.component';

import './app.scss';

class App extends React.PureComponent {
  render (): JSX.Element {
    return (
      <div className='bi-app g-flex'>
        <SidebarComponent/>
        
        <div className='bi-app__wrapper g-flex__item g-flex-column'>
          <HeaderComponent/>
          
          <div className='bi-app__body g-flex-column__item g-flex-column g-scroll-y'>
            <Switch>
              <Route exact={ true } path='/' component={ DataComponent }/>
              
              <Route exact={ true } path='/api' component={ ApiComponent }/>
              
              <Route path='/blocks/:id' component={ BlockComponent }/>
              
              <Route exact={ true } path='/addresses/:id' component={ AddressComponent }/>
              
              <Route exact={ true } path='/transactions/:id' component={ TransactionComponent }/>
              
              <Route exact={ true } path='/stats' component={ StatsComponent }/>
              
              <Route exact={ true } path='/charts' component={ ChartsComponent }/>
              <Route exact={ true } path='/charts/:chartType' component={ ChartComponent }/>
              
              <Route component={ NotFoundComponent }/>
            </Switch>
          </div>
        </div>
      </div>
    );
  }
}

export const AppComponent = hot(module)(App);
