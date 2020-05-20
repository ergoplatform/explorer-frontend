import React from 'react';
import { FormattedMessage } from 'react-intl';
import { RouteComponentProps, withRouter } from 'react-router-dom';

import './unconfirmed-transactions-table-header.scss';

class UnconfirmedTransactionsTableHeader extends React.Component<
  RouteComponentProps<any>
> {
  render(): JSX.Element {
    return (
      <div className="bi-blocks-table-header bi-blocks-table__row bi-table__row">
        <div className="bi-blocks-table__cell bi-table__cell">
          <FormattedMessage id="common.token.id" />
        </div>

        <div className="bi-blocks-table__cell bi-table__cell">
          <FormattedMessage id="components.unconfirmed-transactions.creation-timestamp" />
        </div>

        <div className="bi-blocks-table__cell bi-table__cell">
          <FormattedMessage id="components.unconfirmed-transactions.inputs-quantity" />
        </div>

        <div className="bi-blocks-table__cell bi-table__cell">
          <FormattedMessage id="components.unconfirmed-transactions.outputs-quantity" />
        </div>

        <div className="bi-blocks-table__cell bi-table__cell">
          <FormattedMessage id="common.block.size" />
        </div>
      </div>
    );
  }
}

export const UnconfirmedTransactionsTableHeaderComponent = withRouter(
  UnconfirmedTransactionsTableHeader
);
