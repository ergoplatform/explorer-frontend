import React from 'react';
import { FormattedMessage } from 'react-intl';

import { FullAddressTransactions } from '../../../models/generated/fullAddressTransactions';

import './address-transactions.scss';

import { CoinValueComponent } from '../../common/coin-value/coin-value.component';

interface IAddressTransactionsProps {
  summary: FullAddressTransactions;
}

export class AddressTransactionsComponent extends React.Component<IAddressTransactionsProps> {
  render (): JSX.Element {
    return (
      <div className='bi-address-transactions'>
        <div className='bi-address-transactions__header'>
          <FormattedMessage id='components.address-transactions.title'/>
        </div>

        <div className='bi-address-transactions__body bi-table'>
          <div className='bi-address-transactions__row bi-table__row'>
            <div className='bi-address-transactions__cell bi-address-transactions__cell--header bi-table__cell'>
              <FormattedMessage id='components.address-transactions.confirmed'/>
            </div>

            <div className='bi-address-transactions__cell bi-table__cell'>
              { this.props.summary.confirmed }
            </div>
          </div>

          <div className='bi-address-transactions__row bi-table__row'>
            <div className='bi-address-transactions__cell bi-address-transactions__cell--header bi-table__cell'>
              <FormattedMessage id='components.address-transactions.totalReceived'/>
            </div>

            <div className='bi-address-transactions__cell bi-table__cell'>
              <CoinValueComponent value={ this.props.summary.totalReceived }/>
            </div>
          </div>

          <div className='bi-address-transactions__row bi-table__row'>
            <div className='bi-address-transactions__cell bi-address-transactions__cell--header bi-table__cell'>
              <FormattedMessage id='components.address-transactions.confirmedBalance'/>
            </div>

            <div className='bi-address-transactions__cell bi-table__cell'>
              <CoinValueComponent value={ this.props.summary.confirmedBalance }/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
