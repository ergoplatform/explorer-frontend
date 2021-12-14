import React from 'react';
import { FormattedMessage } from 'react-intl';
import format from 'format-number';
import { Link } from 'react-router-dom';
import { CollapseText } from 'src/components/collapse-text/collapse-text.component';

import './issued-tokens-table.scss';

interface IssuedTokensTableProps {
  tokens: any[];
  isFetching: boolean;
}

export class IssuedTokensTableComponent extends React.Component<IssuedTokensTableProps> {
  render(): JSX.Element {
    return (
      <div className="bi-issued-tokens-table">
        {!this.props.tokens ? null : this.renderTable()}
      </div>
    );
  }

  private renderTable(): JSX.Element {
    return (
      <table className="bi-issued-tokens-table__body bi-table">
        <thead className="bi-issued-tokens-table-header">
          <tr className="bi-issued-tokens-table-header bi-issued-tokens-table__row bi-table__row">
            <th
              className="bi-issued-tokens-table__cell bi-table__cell"
              colSpan={1}
            >
              <FormattedMessage id="common.token.id" />
            </th>

            <th
              className="bi-issued-tokens-table__cell bi-table__cell"
              colSpan={2}
            >
              <FormattedMessage id="common.token.name" />
            </th>

            <th
              className="bi-issued-tokens-table__cell bi-table__cell"
              colSpan={1}
            >
              <FormattedMessage id="common.token.amount" />
            </th>

            <th
              className="bi-issued-tokens-table__cell bi-table__cell"
              colSpan={1}
            >
              <FormattedMessage id="common.token.decimals" />
            </th>

            <th
              className="bi-issued-tokens-table__cell bi-table__cell"
              colSpan={3}
            >
              <FormattedMessage id="common.token.description" />
            </th>
          </tr>
        </thead>

        <tbody>
          {this.props.tokens.map((token) => {
            return (
              <Link
                to={`/token/${token.id}`}
                className="bi-issued-tokens-table__row bi-table__row"
                key={token.id}
              >
                <td
                  className="bi-issued-tokens-table__cell bi-table__cell bi-tokens-table__cell"
                  colSpan={1}
                >
                  <div className="bi-issued-tokens-table__cell-name bi-tokens-table__cell-name">
                    <FormattedMessage id="common.token.id" />
                  </div>

                  <input
                    className="bi-tokens-table__input"
                    type="text"
                    value={token.id}
                    readOnly
                  />
                </td>

                <td
                  className="bi-issued-tokens-table__cell bi-table__cell  bi-tokens-table__cell"
                  colSpan={2}
                >
                  <div className="bi-issued-tokens-table__cell-name bi-tokens-table__cell-name">
                    <FormattedMessage id="common.token.name" />
                  </div>

                  {token.name}
                </td>

                <td
                  className="bi-issued-tokens-table__cell bi-table__cell  bi-tokens-table__cell"
                  colSpan={1}
                >
                  <div className="bi-issued-tokens-table__cell-name bi-tokens-table__cell-name">
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
                </td>

                <td
                  className="bi-issued-tokens-table__cell bi-table__cell  bi-tokens-table__cell"
                  colSpan={1}
                >
                  <div className="bi-issued-tokens-table__cell-name bi-tokens-table__cell-name">
                    <FormattedMessage id="common.token.decimals" />
                  </div>

                  {token.decimals}
                </td>

                <td
                  className="bi-issued-tokens-table__cell bi-table__cell  bi-tokens-table__cell"
                  colSpan={3}
                >
                  <div className="bi-issued-tokens-table__cell-name bi-tokens-table__cell-name">
                    <FormattedMessage id="common.token.description" />
                  </div>

                  <div>
                    <CollapseText lines={2}>{token.description}</CollapseText>
                  </div>
                </td>
              </Link>
            );
          })}
        </tbody>
      </table>
    );
  }
}
