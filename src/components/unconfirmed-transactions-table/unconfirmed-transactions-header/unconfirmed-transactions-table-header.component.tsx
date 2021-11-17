import React from 'react';
// import queryString from 'query-string';
import { FormattedMessage } from 'react-intl';
import { RouteComponentProps, withRouter } from 'react-router-dom';

// import {
//   SortDirectionAscIcon,
//   SortDirectionDescIcon,
//   SortDirectionIcon,
// } from '../../common/icons/common.icons';

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
          {/* <Link
            className={this.getSortDirectionClassName('creationtimestamp')}
            to={`/mempool?${this.getSortLink('creationtimestamp')}`}
          > */}
          <FormattedMessage id="components.unconfirmed-transactions.creation-timestamp" />
          {/*
            <SortDirectionIcon className="bi-blocks-table-header__sort-icon" />
            <SortDirectionAscIcon className="bi-blocks-table-header__sort-icon bi-blocks-table-header__sort-icon--asc" />
            <SortDirectionDescIcon className="bi-blocks-table-header__sort-icon bi-blocks-table-header__sort-icon--desc" />
          </Link> */}
        </div>

        <div className="bi-blocks-table__cell bi-table__cell">
          <FormattedMessage id="components.unconfirmed-transactions.inputs-quantity" />
        </div>

        <div className="bi-blocks-table__cell bi-table__cell">
          <FormattedMessage id="components.unconfirmed-transactions.outputs-quantity" />
        </div>

        <div className="bi-blocks-table__cell bi-table__cell">
          {/* <Link
            className={this.getSortDirectionClassName('size')}
            to={`/mempool?${this.getSortLink('size')}`}
          > */}
          <FormattedMessage id="common.block.size" />

          {/* <SortDirectionIcon className="bi-blocks-table-header__sort-icon" />
            <SortDirectionAscIcon className="bi-blocks-table-header__sort-icon bi-blocks-table-header__sort-icon--asc" />
            <SortDirectionDescIcon className="bi-blocks-table-header__sort-icon bi-blocks-table-header__sort-icon--desc" />
          </Link> */}
        </div>
      </div>
    );
  }

  // private getSortDirectionClassName(sortedColumn: string): string {
  //   const { sortBy, sortDirection } = queryString.parse(
  //     this.props.history.location.search
  //   );
  //   const classNames = [
  //     'bi-blocks-table-header__sort',
  //     'u-word-wrap u-word-wrap--ellipsis',
  //   ];

  //   if (sortBy === sortedColumn && sortDirection) {
  //     classNames.push(`bi-blocks-table-header__sort--${sortDirection}`);
  //   }

  //   return classNames.join(' ');
  // }

  // private getSortLink(sortedColumn: string): string {
  //   const params = queryString.parse(this.props.history.location.search);

  //   const { sortBy, sortDirection } = params;

  //   let newSortDirection: string | null = 'asc';
  //   if (sortBy === sortedColumn && sortDirection === 'desc') {
  //     return queryString.stringify({
  //       ...params,
  //       offset: undefined,
  //       sortBy: undefined,
  //       sortDirection: undefined,
  //     });
  //   }

  //   if (sortBy === sortedColumn && sortDirection !== 'desc') {
  //     newSortDirection = 'desc';
  //   }

  //   return queryString.stringify({
  //     ...params,
  //     offset: undefined,
  //     sortBy: sortedColumn,
  //     sortDirection: newSortDirection,
  //   });
  // }
}

export const UnconfirmedTransactionsTableHeaderComponent = withRouter(
  UnconfirmedTransactionsTableHeader
);
