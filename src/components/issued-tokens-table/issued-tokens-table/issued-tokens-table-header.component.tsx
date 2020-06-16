import React from 'react';
import { FormattedMessage } from 'react-intl';
import { RouteComponentProps, withRouter } from 'react-router-dom';

import './issued-tokens-table-header.scss';

class IssuedTokensTableHeader extends React.Component<
  RouteComponentProps<any>
> {
  render(): JSX.Element {
    return (
      <div className="bi-blocks-table-header bi-blocks-table__row bi-table__row">
        <div className="bi-blocks-table__cell bi-table__cell">
          <FormattedMessage id="common.token.id" />
        </div>

        <div className="bi-blocks-table__cell bi-table__cell">
          <FormattedMessage id="common.token.name" />
        </div>

        <div className="bi-blocks-table__cell bi-table__cell">
          <FormattedMessage id="common.token.amount" />
        </div>

        <div className="bi-blocks-table__cell bi-table__cell">
          <FormattedMessage id="common.token.decimals" />
        </div>

        <div className="bi-blocks-table__cell bi-table__cell">
          <FormattedMessage id="common.token.description" />
        </div>
      </div>
    );
  }
}

export const IssuedTokensTableHeaderComponent = withRouter(
  IssuedTokensTableHeader
);
