import React from 'react';
import { FormattedMessage } from 'react-intl';
import format from 'format-number';
// import * as vlq from 'vlq';

import { IssuedTokensTableHeaderComponent } from './issued-tokens-table/issued-tokens-table-header.component';

import './issued-tokens-table.scss';

interface IssuedTokensTableProps {
  tokens: any[];
  isFetching: boolean;
}

export class IssuedTokensTableComponent extends React.Component<
  IssuedTokensTableProps
> {
  render(): JSX.Element {
    return (
      <div className="bi-blocks-table">
        {!this.props.tokens ? null : this.renderTable()}
      </div>
    );
  }

  private renderTable(): JSX.Element {
    return (
      <div className="bi-blocks-table__body bi-table">
        <IssuedTokensTableHeaderComponent />

        {this.props.tokens.map((token) => {
          return (
            <div className="bi-blocks-table__row bi-table__row" key={token.id}>
              <div className="bi-blocks-table__cell bi-table__cell bi-tokens-table__cell">
                <div className="bi-blocks-table__cell-name bi-tokens-table__cell-name">
                  <FormattedMessage id="common.token.id" />
                </div>

                <input
                  className="bi-tokens-table__input"
                  type="text"
                  value={token.id}
                  readOnly
                />
              </div>

              <div className="bi-blocks-table__cell bi-table__cell  bi-tokens-table__cell">
                <div className="bi-blocks-table__cell-name bi-tokens-table__cell-name">
                  <FormattedMessage id="common.token.name" />
                </div>

                {token.name}
              </div>

              <div className="bi-blocks-table__cell bi-table__cell bi-tokens-table__cell">
                <div className="bi-blocks-table__cell-name bi-tokens-table__cell-name">
                  <FormattedMessage id="common.token.amount" />
                </div>

                <input
                  className="bi-tokens-table__input"
                  type="text"
                  value={format({ integerSeparator: ' ' })(
                    token.emissionAmount
                  )}
                  readOnly
                />
              </div>

              <div className="bi-blocks-table__cell bi-table__cell bi-tokens-table__cell">
                <div className="bi-blocks-table__cell-name bi-tokens-table__cell-name">
                  <FormattedMessage id="common.token.decimals" />
                </div>

                {token.decimals}
              </div>

              <div className="bi-blocks-table__cell bi-table__cell bi-tokens-table__cell">
                <div className="bi-blocks-table__cell-name bi-tokens-table__cell-name">
                  <FormattedMessage id="common.token.description" />
                </div>

                {token.description}
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}
