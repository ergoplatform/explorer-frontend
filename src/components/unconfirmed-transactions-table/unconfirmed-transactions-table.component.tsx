import React from 'react';
import { FormattedMessage } from 'react-intl';
import { formatNumberMetricPrefix } from '../../utils/formatNumberMetricPrefix';

import './unconfirmed-transactions-table.scss';
import { UnconfirmedTransactionsTableHeaderComponent } from './unconfirmed-transactions-header/unconfirmed-transactions-table-header.component';
import { TimestampComponent } from '../common/timestamp/timestamp.component';
import { Link } from 'react-router-dom';

interface UnconfirmedTransactionsTableProps {
  transactions: any[];
  isFetching: boolean;
}

export class UnconfirmedTransactionsTableComponent extends React.Component<UnconfirmedTransactionsTableProps> {
  render(): JSX.Element {
    return (
      <div className="bi-blocks-table">
        {!this.props.transactions ? null : this.renderTable()}
      </div>
    );
  }

  private renderTable(): JSX.Element {
    return (
      <div className="bi-blocks-table__body bi-table">
        <UnconfirmedTransactionsTableHeaderComponent />

        {this.props.transactions.map((transaction) => {
          return (
            <div
              className="bi-blocks-table__row bi-table__row"
              key={transaction.id}
            >
              <div className="bi-blocks-table__cell bi-table__cell bi-tokens-table__cell">
                <div className="bi-blocks-table__cell-name bi-tokens-table__cell-name">
                  <FormattedMessage id="common.token.id" />
                </div>

                <Link
                  to={`/transactions/${transaction.id}`}
                  title={transaction.id}
                >
                  {transaction.id.slice(0, 10)}
                </Link>
              </div>

              <div className="bi-blocks-table__cell bi-table__cell bi-tokens-table__cell">
                <div className="bi-blocks-table__cell-name bi-tokens-table__cell-name">
                  <FormattedMessage id="components.unconfirmed-transactions.creation-timestamp" />
                </div>
                <TimestampComponent timestamp={transaction.creationTimestamp} />
              </div>

              <div className="bi-blocks-table__cell bi-table__cell bi-tokens-table__cell">
                <div className="bi-blocks-table__cell-name bi-tokens-table__cell-name">
                  <FormattedMessage id="components.unconfirmed-transactions.inputs-quantity" />
                </div>
                {transaction.inputs.length}
              </div>

              <div className="bi-blocks-table__cell bi-table__cell bi-tokens-table__cell">
                <div className="bi-blocks-table__cell-name bi-tokens-table__cell-name">
                  <FormattedMessage id="components.unconfirmed-transactions.outputs-quantity" />
                </div>

                {transaction.outputs.length}
              </div>

              <div className="bi-blocks-table__cell bi-table__cell  bi-tokens-table__cell">
                <div className="bi-blocks-table__cell-name bi-tokens-table__cell-name">
                  <FormattedMessage id="common.block.size" />
                </div>

                <span className="u-word-wrap u-word-wrap--ellipsis">
                  {formatNumberMetricPrefix(transaction.size, {
                    desiredFormat: 'k',
                  })}
                  B
                </span>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}
