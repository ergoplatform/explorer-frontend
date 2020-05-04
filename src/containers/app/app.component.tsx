import React, { Suspense, lazy } from 'react';
import classNames from 'classnames';
import queryString from 'query-string';
import Helmet from 'react-helmet';
import { Route, RouteComponentProps, Switch, withRouter } from 'react-router';

import { HeaderComponent } from '../../components/header/header.component';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';

// import { ApiComponent } from '../../pages/api/api.component';

import './app.scss';

// import Loader from '../../components/loading/loading';

const AddressComponent = lazy(() =>
  import('../../pages/address/address.component')
);

const BlockComponent = lazy(() => import('../../pages/block/block.component'));
const ChartComponent = lazy(() => import('../../pages/chart/chart.component'));
const ChartsComponent = lazy(() =>
  import('../../pages/charts/charts.component')
);
const DataComponent = lazy(() => import('../../pages/data/data.component'));
const NotFoundComponent = lazy(() => import('../../pages/data/data.component'));
const PaymentRequestComponent = lazy(() =>
  import('../../pages/payment-request/payment-request.component')
);
const SearchResultsComponent = lazy(() =>
  import('../../pages/payment-request/payment-request.component')
);
const StatsComponent = lazy(() => import('../../pages/stats/stats.component'));
const TransactionComponent = lazy(() =>
  import('../../pages/transaction/transaction.component')
);
const WalletComponent = lazy(() =>
  import('../../pages/wallet/wallet.component')
);
const OrderBookComponent = lazy(() =>
  import('../../pages/order-book/order-book.component')
);
const IssuedTokensComponent = lazy(() =>
  import('../../pages/issued-tokens/issued-tokens.component')
);

class App extends React.PureComponent<RouteComponentProps<any>> {
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
            <Suspense
              fallback={
                <div className="bi-app__loading-text">Loading page...</div>
              }
            >
              <Switch>
                <Route exact path="/" component={DataComponent} />

                {/* <Route exact path="/api" component={ApiComponent} /> */}

                <Route path="/blocks/:id" component={BlockComponent} />

                <Route
                  exact
                  path="/addresses/:id"
                  component={AddressComponent}
                />

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

                <Route
                  exact
                  path="/search"
                  component={SearchResultsComponent}
                />

                <Route
                  exact
                  path="/payment-request"
                  component={PaymentRequestComponent}
                />

                <Route
                  exact
                  path="/order-book"
                  component={OrderBookComponent}
                />

                <Route
                  exact
                  path="/issued-tokens"
                  component={IssuedTokensComponent}
                />

                <Route path="*" component={NotFoundComponent} />
              </Switch>
            </Suspense>
          </div>
        </div>
      </div>
    );
  }
}

export const AppComponent = withRouter(App);
