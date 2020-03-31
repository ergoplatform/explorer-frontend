import classNames from 'classnames';
import queryString from 'query-string';
import React from 'react';
import Helmet from 'react-helmet';
import { hot } from 'react-hot-loader';
import { Route, RouteComponentProps, Switch, withRouter } from 'react-router';

import { HeaderComponent } from '../../components/header/header.component';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';

import { AddressComponent } from '../../pages/address/address.component';
import { ApiComponent } from '../../pages/api/api.component';
import { BlockComponent } from '../../pages/block/block.component';
import { ChartComponent } from '../../pages/chart/chart.component';
import { ChartsComponent } from '../../pages/charts/charts.component';
import { DataComponent } from '../../pages/data/data.component';
import { NotFoundComponent } from '../../pages/not-found/not-found.component';
import { PaymentRequestComponent } from '../../pages/payment-request/payment-request.component';
import { SearchResultsComponent } from '../../pages/search-results/search-results.component';
import { StatsComponent } from '../../pages/stats/stats.component';
import { TransactionComponent } from '../../pages/transaction/transaction.component';
import { WalletComponent } from '../../pages/wallet/wallet.component';
import OrderBookComponent from '../../pages/order-book/order-book.component';
import IssuedTokenComponent from '../../pages/issued-token/issued-token.component';

import './app.scss';

class App extends React.PureComponent {
  public props!: RouteComponentProps<any>;

  private scrollBody!: HTMLDivElement;

  public componentDidUpdate(prevProps: any): void {
    if (this.props.location !== prevProps.location) {
      this.scrollBody.scrollTo(0, 0);
    }
  }

  public render(): JSX.Element {
    const { iframe } = queryString.parse(this.props.location.search);

    const appClassNames = classNames({
      'bi-app': true,
      'bi-app--iframe': !!iframe,
      'g-flex': true,
    });

    return (
      <div className={appClassNames}>
        <Helmet>
          <title>Ergo Explorer</title>
        </Helmet>

        <SidebarComponent />

        <div
          className="bi-app__wrapper g-flex__item g-flex-column g-scroll-y"
          ref={(ref: HTMLDivElement) => (this.scrollBody = ref)}
        >
          <HeaderComponent />

          <div className="bi-app__body g-flex-column__item g-flex-column">
            <Switch>
              <Route exact path="/" component={DataComponent} />

              <Route exact path="/api" component={ApiComponent} />

              <Route path="/blocks/:id" component={BlockComponent} />

              <Route exact path="/addresses/:id" component={AddressComponent} />

              <Route
                exact
                path="/transactions/:id"
                component={TransactionComponent}
              />

              <Route exact path="/stats" component={StatsComponent} />

              <Route exact path="/charts" component={ChartsComponent} />
              <Route
                exact
                path="/charts/:chartType"
                component={ChartComponent}
              />

              <Route exact path="/wallet" component={WalletComponent} />

              <Route exact path="/search" component={SearchResultsComponent} />

              <Route
                exact
                path="/payment-request"
                component={PaymentRequestComponent}
              />

              <Route exact path="/order-book" component={OrderBookComponent} />

              <Route
                exact
                path="/issued-token"
                component={IssuedTokenComponent}
              />

              <Route component={NotFoundComponent} />
            </Switch>
          </div>
        </div>
      </div>
    );
  }
}

export const AppComponent = hot(module)(withRouter(App));
