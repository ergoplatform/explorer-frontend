import * as React from 'react';

import { FullAddressTransactionSummary } from '../../../models/generated/fullAddress';

import './address-transactions.scss';

class AddressTransactionsComponent extends React.PureComponent {
  props: {
    summary: FullAddressTransactionSummary;
  };
  
  render (): JSX.Element {
    return (
      <div className='bi-address-transactions'>
        <div className='bi-address-transactions__header'>
          TRANSACTIONS
        </div>
        
        <div className='bi-address-transactions__body'>
          <div className='bi-address-transactions__row'>
            <div className='bi-address-transactions__cell'>
              No. Transactions
            </div>
            
            <div className='bi-address-transactions__cell'>
              { this.props.summary.total }
            </div>
          </div>
  
          <div className='bi-address-transactions__row'>
            <div className='bi-address-transactions__cell'>
              Total Received
            </div>
    
            <div className='bi-address-transactions__cell'>
              { this.props.summary.totalReceived }
            </div>
          </div>
  
          <div className='bi-address-transactions__row'>
            <div className='bi-address-transactions__cell'>
              Final Balance
            </div>
    
            <div className='bi-address-transactions__cell'>
              { this.props.summary.balance }
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AddressTransactionsComponent;
