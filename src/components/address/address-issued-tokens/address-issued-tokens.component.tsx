import React from 'react';
import { FormattedMessage } from 'react-intl';

import { Asset } from '../../../models/generated/asset';

import { MAX_TOKENS_RENDERED } from '../../../constants/global.constants';

import './address-issued-tokens.scss';
import { CoinValueComponent } from '../../common/coin-value/coin-value.component';

interface FullAddressIssuedTokens {
  issuedTokens: Array<Asset> | undefined;
}

export class AddressIssuedTokensComponent extends React.Component<
  FullAddressIssuedTokens
> {
  promote(amount: number) {
    return amount;
  }

  render() {
    const { issuedTokens } = this.props;

    if (!issuedTokens || issuedTokens.length === 0) {
      return null;
    }

    const tokensToRender = issuedTokens.slice(0, MAX_TOKENS_RENDERED);

    return (
      <div className="bi-address-issued-tokens">
        <div className="bi-address-issued-tokens__header">
          <FormattedMessage id="components.address-issued-tokens.title" />
        </div>
        <div className="bi-address-issued-tokens__body bi-table">
          {tokensToRender.map((token: Asset, i: number) => {
            return (
              <div
                key={`${Math.random()} - ${i}`}
                className="bi-address-issued-tokens__row bi-table__row"
              >
                <div className="bi-address-issued-tokens__cell bi-table__cell u-word-wrap u-word-wrap--ellipsis">
                  <FormattedMessage id={token.tokenId} />
                </div>

                <div className="bi-address-issued-tokens__cell bi-table__cell">
                  <CoinValueComponent coinName={' '} value={token.amount} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
