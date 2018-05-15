import * as React from 'react';

import './address-transactions.scss';

class AddressTransactionsComponent extends React.PureComponent {
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
              12305
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AddressTransactionsComponent;
