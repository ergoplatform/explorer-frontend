import React from 'react';
import { FormattedMessage } from 'react-intl';
import { RouteComponentProps, withRouter } from 'react-router-dom';

import {
  SortDirectionAscIcon,
  SortDirectionDescIcon,
  SortDirectionIcon,
} from '../../common/icons/common.icons';

import './issued-tokens-table-header.scss';

class IssuedTokensTableHeader extends React.Component<
  RouteComponentProps<any>
> {
  render(): JSX.Element {
    return (
      <div className="bi-blocks-table-header bi-blocks-table__row bi-table__row">
        <div className="bi-blocks-table__cell bi-table__cell">
          <FormattedMessage id="common.token.id" />

          <SortDirectionIcon className="bi-blocks-table-header__sort-icon" />
          <SortDirectionAscIcon className="bi-blocks-table-header__sort-icon bi-blocks-table-header__sort-icon--asc" />
          <SortDirectionDescIcon className="bi-blocks-table-header__sort-icon bi-blocks-table-header__sort-icon--desc" />
        </div>

        <div className="bi-blocks-table__cell bi-table__cell">
          <FormattedMessage id="common.token.name" />

          <SortDirectionIcon className="bi-blocks-table-header__sort-icon" />
          <SortDirectionAscIcon className="bi-blocks-table-header__sort-icon bi-blocks-table-header__sort-icon--asc" />
          <SortDirectionDescIcon className="bi-blocks-table-header__sort-icon bi-blocks-table-header__sort-icon--desc" />
        </div>

        <div className="bi-blocks-table__cell bi-table__cell">
          <FormattedMessage id="common.token.amount" />

          <SortDirectionIcon className="bi-blocks-table-header__sort-icon" />
          <SortDirectionAscIcon className="bi-blocks-table-header__sort-icon bi-blocks-table-header__sort-icon--asc" />
          <SortDirectionDescIcon className="bi-blocks-table-header__sort-icon bi-blocks-table-header__sort-icon--desc" />
        </div>

        <div className="bi-blocks-table__cell bi-table__cell">
          <FormattedMessage id="common.token.decimals" />

          <SortDirectionIcon className="bi-blocks-table-header__sort-icon" />
          <SortDirectionAscIcon className="bi-blocks-table-header__sort-icon bi-blocks-table-header__sort-icon--asc" />
          <SortDirectionDescIcon className="bi-blocks-table-header__sort-icon bi-blocks-table-header__sort-icon--desc" />
        </div>

        <div className="bi-blocks-table__cell bi-table__cell">
          <FormattedMessage id="common.token.description" />

          <SortDirectionIcon className="bi-blocks-table-header__sort-icon" />
          <SortDirectionAscIcon className="bi-blocks-table-header__sort-icon bi-blocks-table-header__sort-icon--asc" />
          <SortDirectionDescIcon className="bi-blocks-table-header__sort-icon bi-blocks-table-header__sort-icon--desc" />
        </div>
      </div>
    );
  }
}

export const IssuedTokensTableHeaderComponent = withRouter(
  IssuedTokensTableHeader
);
