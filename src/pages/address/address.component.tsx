import queryString from 'query-string';
import React from 'react';
import Helmet from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { bindActionCreators } from 'redux';

import environment from '../../config/environment';

import './address.scss';

import { AppActions } from '../../actions/app.actions';
import { AddressState } from '../../reducers/address.reducer';
import { AppState } from '../../store/app.store';

import { AddressActions } from '../../actions/address.actions';

import { AddressQrcodeActionComponent } from '../../components/address/address-qrcode-action/address-qrcode-action.component';
import { AddressRequetsPaymentActionComponent } from '../../components/address/address-request-payment-action/address-requets-payment-action.component';
import { AddressSummaryComponent } from '../../components/address/address-summary/address-summary.component';
import { AddressTransactionsComponent } from '../../components/address/address-transactions/address-transactions.component';
import { PaginateSimpleComponent } from '../../components/common/paginate-simple/paginate-simple.component';
import { TransactionsComponent } from '../../components/transactions/transactions.component';

class Address extends React.PureComponent<
  RouteComponentProps<{ id: string }> &
    AddressState &
    AddressActions &
    AppActions
> {
  params: any;

  constructor(props: any) {
    super(props);

    this.params = this.getParams();

    this.getPageUrl = this.getPageUrl.bind(this);
  }

  componentDidMount(): void {
    const {
      preloaded,
      clearPreloadedState,
      getAddress,
      getAddressTransactions,
      match,
    } = this.props;

    const currentAddress = match.params.id;

    if (preloaded) {
      clearPreloadedState();
      return;
    }

    getAddress(currentAddress);
    getAddressTransactions(currentAddress, this.params);
  }

  UNSAFE_componentWillReceiveProps(nextProps: any): void {
    const params = this.getParams();

    if (this.props.match.params.id !== nextProps.match.params.id) {
      this.params = params;

      this.props.getAddress(nextProps.match.params.id);
      this.props.getAddressTransactions(nextProps.match.params.id, this.params);

      return;
    }

    if (JSON.stringify(params) !== JSON.stringify(this.params)) {
      this.params = params;

      this.props.getAddressTransactions(
        this.props.match.params.id,
        this.params
      );
    }
  }

  render(): JSX.Element {
    return (
      <div className="bi-address g-flex-column__item-fixed">
        <div className="bi-address__header">
          <div className="bi-address__title">
            <FormattedMessage
              id="components.address.title"
              values={{
                coinName: environment.blockchain.coinName.toUpperCase(),
              }}
            />
          </div>
        </div>

        {this.renderBody()}
      </div>
    );
  }

  private renderBody(): JSX.Element | null {
    const { match, address, transactions } = this.props;

    if (this.props.fetching) {
      // TODO: Add nice loader
      return <p className="bi-address__fetching-text">Fetching data...</p>;
    }

    if (!address || this.props.fetching) {
      // TODO: Add Alert message
      return null;
    }

    return (
      <div className="bi-address__body">
        <FormattedMessage
          id="common.pages.address.title"
          values={{ id: match.params.id }}
        >
          {(title) => (
            <Helmet>
              <title>{title}</title>
            </Helmet>
          )}
        </FormattedMessage>

        <div className="bi-address__tables g-flex">
          <div className="bi-address__table g-flex__item">
            <AddressSummaryComponent addressId={match.params.id} />
            <AddressQrcodeActionComponent addressId={match.params.id} />
          </div>

          <div className="bi-address__table g-flex__item">
            <AddressTransactionsComponent
              summary={address}
              total={transactions?.total || 0}
            />

            <AddressRequetsPaymentActionComponent addressId={match.params.id} />
          </div>
        </div>

        {transactions && (
          <div className="bi-address__transactions">
            {!this.props.transactionFetching && (
              <TransactionsComponent
                transactions={transactions.items}
                address={match.params.id}
              />
            )}

            <div className="bi-address__transactions-footer g-flex">
              <PaginateSimpleComponent
                total={transactions.total}
                limit={this.params.limit}
                getPageUrl={this.getPageUrl}
                forcePage={Math.floor(this.params.offset / this.params.limit)}
              />
            </div>
          </div>
        )}
      </div>
    );
  }

  private getPageUrl(page: number): string {
    const params: any = queryString.parse(this.props.history.location.search);

    params.offset = page * this.params.limit;

    return `${this.props.location.pathname}?${queryString.stringify(params)}`;
  }

  private getParams(): any {
    let { offset, limit }: any = queryString.parse(
      this.props.history.location.search
    );

    offset = parseInt(offset, 10);
    limit = parseInt(limit, 10) || 30;

    return {
      limit,
      offset: offset || 0,
    };
  }
}

function mapStateToProps(state: AppState): AddressState {
  return state.address;
}

function mapDispatchToProps(dispatch: any): any {
  return bindActionCreators({ ...AddressActions, ...AppActions }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Address);
