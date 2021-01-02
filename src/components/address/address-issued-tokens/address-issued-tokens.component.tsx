import React, { useState } from 'react';
import { FormattedMessage } from 'react-intl';

import { Asset } from '../../../models/generated/asset';

import { MAX_TOKENS_RENDERED } from '../../../constants/global.constants';

import './address-issued-tokens.scss';
import { CoinValueComponent } from '../../common/coin-value/coin-value.component';
import { AddressIssuedTokensModalComponent } from '../../modals/address-issued-tokens-modal/address-issued-tokens-modal.component';
import { CopyTextComponent } from '../../common/copy-text/copy-text.component';
import { useAlert } from 'react-alert';

interface AddressIssuedTokensProps {
  issuedTokens: Array<Asset> | undefined;
}

export const AddressIssuedTokensComponent = (
  props: AddressIssuedTokensProps
) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { issuedTokens } = props;
  const alert = useAlert();

  if (!issuedTokens || issuedTokens.length === 0) {
    return null;
  }

  const tokensToRender = issuedTokens.slice(0, MAX_TOKENS_RENDERED);

  return (
    <>
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
                <div className="bi-address-issued-tokens__cell bi-table__cell bi-address-issued-tokens__cell--token-id">
                  <CopyTextComponent
                    isNotShowIcon
                    onClick={() =>
                      alert.show(
                        <span style={{ textTransform: 'initial' }}>Copied</span>
                      )
                    }
                  >
                    <FormattedMessage id={token.tokenId} />
                  </CopyTextComponent>
                </div>

                <div className="bi-address-issued-tokens__cell bi-table__cell bi-address-issued-tokens__cell--amount">
                  <CoinValueComponent coinName={' '} value={token.amount} />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {issuedTokens.length > MAX_TOKENS_RENDERED && (
        <div className="bi-address-issued-tokens__btn-container g-flex">
          <div className="bi-address-issued-tokens__item g-flex__item-fixed">
            <button
              className="bi-address-issued-tokens__btn bi-btn"
              onClick={() => setIsModalOpen(true)}
            >
              <FormattedMessage id="components.address-issued-tokens.allTokens" />
            </button>
          </div>

          <AddressIssuedTokensModalComponent
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            issuedTokens={props.issuedTokens}
          />
        </div>
      )}
    </>
  );
};
