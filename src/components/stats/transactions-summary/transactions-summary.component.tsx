import React from 'react';
import { FormattedMessage } from 'react-intl';

import { CoinValueComponent } from '../../common/coin-value/coin-value.component';

import './transactions-summary.scss';

interface ITransactionsSummaryProps {
  summary: any;
}

export class TransactionsSummaryComponent extends React.PureComponent<ITransactionsSummaryProps> {
  render(): JSX.Element {
    return (
      <div className="bi-transactions-summary">
        <div className="bi-transactions-summary__header">
          <FormattedMessage id="components.transactions-summary.title" />
        </div>

        <div className="bi-transactions-summary__body bi-table">
          <div className="bi-transactions-summary__row bi-table__row">
            <div className="bi-transactions-summary__cell bi-transactions-summary__cell--header bi-table__cell">
              <FormattedMessage id="components.transactions-summary.total" />
            </div>

            <div className="bi-transactions-summary__cell bi-transactions-summary__cell--value bi-table__cell u-word-wrap">
              {this.props.summary.total}
            </div>

            <div className="bi-transactions-summary__cell bi-transactions-summary__cell--actions bi-table__cell" />
          </div>

          <div className="bi-transactions-summary__row bi-table__row">
            <div className="bi-transactions-summary__cell bi-transactions-summary__cell--header bi-table__cell">
              <FormattedMessage id="components.transactions-summary.totalFee" />
            </div>

            <div className="bi-transactions-summary__cell bi-transactions-summary__cell--value bi-table__cell u-word-wrap">
              <CoinValueComponent value={this.props.summary.totalFee} />
            </div>
          </div>

          <div className="bi-transactions-summary__row bi-table__row">
            <div className="bi-transactions-summary__cell bi-transactions-summary__cell--header bi-table__cell">
              <FormattedMessage id="components.transactions-summary.totalOutput" />
            </div>

            <div className="bi-transactions-summary__cell bi-transactions-summary__cell--value bi-table__cell u-word-wrap">
              <CoinValueComponent value={this.props.summary.totalOutput} />
            </div>

            <div className="bi-transactions-summary__cell bi-transactions-summary__cell--actions bi-table__cell" />
          </div>
        </div>
      </div>
    );
  }
}
