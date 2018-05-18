import * as React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';

import { FullAddressTransactionSummary } from '../../../models/generated/fullAddress';

import './address-transactions.scss';

interface IAddressTransactionsProps {
  summary: FullAddressTransactionSummary;
}

class AddressTransactions extends React.PureComponent {
  props: IAddressTransactionsProps & InjectedIntlProps;
  
  render (): JSX.Element {
    return (
      <div className='bi-address-transactions'>
        <div className='bi-address-transactions__header'>
          {
            this.props.intl.formatMessage({ id: 'components.address-transactions.title' })
          }
        </div>
        
        <div className='bi-address-transactions__body bi-table'>
          <div className='bi-address-transactions__row bi-table__row'>
            <div className='bi-address-transactions__cell bi-address-transactions__cell--header bi-table__cell'>
              {
                this.props.intl.formatMessage({ id: 'components.address-transactions.total' })
              }
            </div>
            
            <div className='bi-address-transactions__cell bi-table__cell'>
              { this.props.summary.total }
            </div>
          </div>
          
          <div className='bi-address-transactions__row bi-table__row'>
            <div className='bi-address-transactions__cell bi-address-transactions__cell--header bi-table__cell'>
              {
                this.props.intl.formatMessage({ id: 'components.address-transactions.totalReceived' })
              }
            </div>
            
            <div className='bi-address-transactions__cell bi-table__cell'>
              { this.props.summary.totalReceived }
            </div>
          </div>
          
          <div className='bi-address-transactions__row bi-table__row'>
            <div className='bi-address-transactions__cell bi-address-transactions__cell--header bi-table__cell'>
              {
                this.props.intl.formatMessage({ id: 'components.address-transactions.balance' })
              }
            </div>
            
            <div className='bi-address-transactions__cell bi-table__cell'>
              { this.props.summary.balance }
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export const AddressTransactionsComponent = injectIntl<IAddressTransactionsProps>(AddressTransactions);
