import * as React from 'react';
import { FormattedMessage } from 'react-intl';

import { IoSummary } from '../../../models/generated/ioSummary';

import './transaction-io-summary.scss';

interface ITransactionIoSummaryProps {
  summary: IoSummary;
}

export class TransactionIoSummaryComponent extends React.Component<ITransactionIoSummaryProps> {
  render (): JSX.Element {
    return (
      <div className='bi-transaction-summary'>
        <div className='bi-transaction-summary__header'>
          <FormattedMessage id='components.transaction-io-summary.title'/>
        </div>
        
        <div className='bi-transaction-summary__body bi-table'>
          <div className='bi-transaction-summary__row bi-table__row'>
            <div className='bi-transaction-summary__cell bi-transaction-summary__cell--header bi-table__cell'>
              <FormattedMessage id='components.transaction-io-summary.totalCoinsTransferred'/>
            </div>
            
            <div className='bi-transaction-summary__cell bi-transaction-summary__cell--value bi-table__cell'>
              { this.props.summary.totalCoinsTransferred }
            </div>
          </div>
          
          <div className='bi-transaction-summary__row bi-table__row'>
            <div className='bi-transaction-summary__cell bi-transaction-summary__cell--header bi-table__cell'>
              <FormattedMessage id='components.transaction-io-summary.totalFee'/>
            </div>
    
            <div className='bi-transaction-summary__cell bi-transaction-summary__cell--value bi-table__cell'>
              { this.props.summary.totalFee }
            </div>
          </div>
  
          <div className='bi-transaction-summary__row bi-table__row'>
            <div className='bi-transaction-summary__cell bi-transaction-summary__cell--header bi-table__cell'>
              <FormattedMessage id='components.transaction-io-summary.feePerByte'/>
            </div>
    
            <div className='bi-transaction-summary__cell bi-transaction-summary__cell--value bi-table__cell'>
              { this.props.summary.feePerByte }
            </div>
          </div>
        </div>
      </div>
    );
  }
}
