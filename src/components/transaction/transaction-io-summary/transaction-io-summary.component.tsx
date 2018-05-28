import * as React from 'react';
import { FormattedMessage } from 'react-intl';

import { formatNumberMetricPrefix } from '../../../utils/formatNumberMetricPrefix';

import { TimestampComponent } from '../../common/timestamp/timestamp.component';

import './transaction-io-summary.scss';

interface ITransactionIoSummaryProps {
  summary: any;
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
              <FormattedMessage id='components.transaction-summary.size'/>
            </div>
            
            <div
              className='bi-transaction-summary__cell bi-transaction-summary__cell--value bi-table__cell'>
              { formatNumberMetricPrefix(this.props.summary.size, 'k') }B
            </div>
          </div>
          
          <div className='bi-transaction-summary__row bi-table__row'>
            <div className='bi-transaction-summary__cell bi-transaction-summary__cell--header bi-table__cell'>
              <FormattedMessage id='components.transaction-summary.timestamp'/>
            </div>
            
            <div
              className='bi-transaction-summary__cell bi-transaction-summary__cell--value bi-table__cell'>
              <TimestampComponent timestamp={ this.props.summary.timestamp }/>
            </div>
          </div>
          
        </div>
      </div>
    );
  }
}
