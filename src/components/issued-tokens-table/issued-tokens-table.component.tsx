import React from 'react';
import { FormattedMessage } from 'react-intl';
import format from 'format-number';
import { base16 } from 'rfc4648';
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
            <div
              className="bi-blocks-table__row bi-table__row"
              key={token.assets[0].tokenId}
            >
              <div className="bi-blocks-table__cell bi-table__cell bi-tokens-table__cell">
                <div className="bi-blocks-table__cell-name bi-tokens-table__cell-name">
                  <FormattedMessage id="common.token.id" />
                </div>

                <input
                  className="bi-tokens-table__input"
                  type="text"
                  value={token.assets[0].tokenId}
                  readOnly
                />
              </div>

              <div className="bi-blocks-table__cell bi-table__cell  bi-tokens-table__cell">
                <div className="bi-blocks-table__cell-name bi-tokens-table__cell-name">
                  <FormattedMessage id="common.token.name" />
                </div>

                {token.additionalRegisters.R4 &&
                  token.additionalRegisters.R4.slice(0, 2) === '0e' &&
                  new TextDecoder('utf-8')
                    .decode(base16.parse(token.additionalRegisters.R4))
                    .slice(2)}

                {token.additionalRegisters.R4 &&
                  token.additionalRegisters.R4.slice(0, 2) !== '0e' &&
                  "Can't decode this field"}
              </div>

              <div className="bi-blocks-table__cell bi-table__cell bi-tokens-table__cell">
                <div className="bi-blocks-table__cell-name bi-tokens-table__cell-name">
                  <FormattedMessage id="common.token.amount" />
                </div>

                <input
                  className="bi-tokens-table__input"
                  type="text"
                  value={format({ integerSeparator: ' ' })(
                    token.assets[0].amount
                  )}
                  readOnly
                />
              </div>

              <div className="bi-blocks-table__cell bi-table__cell bi-tokens-table__cell">
                <div className="bi-blocks-table__cell-name bi-tokens-table__cell-name">
                  <FormattedMessage id="common.token.decimals" />
                </div>

                {token.additionalRegisters.R6 &&
                  token.additionalRegisters.R6.slice(0, 2) === '0e' &&
                  new TextDecoder('utf-8')
                    .decode(base16.parse(token.additionalRegisters.R6))
                    .slice(2)}

                {token.additionalRegisters.R6 &&
                  token.additionalRegisters.R6.slice(0, 2) !== '0e' && (
                    <>
                      {token.additionalRegisters.R6} -{' '}
                      <span style={{ background: '#ffa707' }}>
                        non-format{' '}
                        <a href="https://github.com/ergoplatform/eips/blob/master/eip-0004.md">
                          EIP-4
                        </a>{' '}
                        field
                      </span>
                    </>
                  )}
              </div>

              <div className="bi-blocks-table__cell bi-table__cell bi-tokens-table__cell">
                <div className="bi-blocks-table__cell-name bi-tokens-table__cell-name">
                  <FormattedMessage id="common.token.description" />
                </div>

                {token.additionalRegisters.R5 &&
                  new TextDecoder('utf-8')
                    .decode(base16.parse(token.additionalRegisters.R5))
                    .slice(2)}
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}
