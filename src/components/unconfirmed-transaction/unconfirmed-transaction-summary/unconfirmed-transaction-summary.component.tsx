import React from 'react';
import { FormattedMessage } from 'react-intl';

import { formatNumberMetricPrefix } from '../../../utils/formatNumberMetricPrefix';

import './unconfirmed-transaction-summary.scss';

interface ITransactionSummaryProps {
  summary: any;
}

export class UnconfirmedTransactionSummaryComponent extends React.Component<ITransactionSummaryProps> {
  render(): JSX.Element {
    return (
      <div className="bi-unconfirmed-transaction-summary">
        <div className="bi-unconfirmed-transaction-summary__header">
          <FormattedMessage id="components.transaction-summary.title" />
        </div>

        <div className="bi-unconfirmed-transaction-summary__body bi-table">
          <div className="bi-unconfirmed-transaction-summary__row bi-table__row">
            <div className="bi-unconfirmed-transaction-summary__cell bi-unconfirmed-transaction-summary__cell--header bi-table__cell">
              <FormattedMessage id="components.transaction-summary.size" />
            </div>

            <div className="bi-unconfirmed-transaction-summary__cell bi-unconfirmed-transaction-summary__cell--value bi-table__cell">
              {formatNumberMetricPrefix(this.props.summary.size, {
                desiredFormat: 'k',
              })}
              B
            </div>
          </div>
        </div>
      </div>
    );
  }
}
