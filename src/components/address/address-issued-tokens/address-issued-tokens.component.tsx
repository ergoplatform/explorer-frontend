import React from 'react';
import { FormattedMessage } from 'react-intl';

import { Asset } from '../../../models/generated/asset';

import { MAX_TOKENS_RENDERED } from '../../../constants/global.constants';

import './address-issued-tokens.scss';
import { CoinValueComponent } from '../../common/coin-value/coin-value.component';
import { AddressIssuedTokensModalComponent } from '../../modals/address-issued-tokens-modal/address-issued-tokens-modal.component';

interface AddressIssuedTokensState {
  isModalOpen: boolean;
}

interface AddressIssuedTokensProps {
  issuedTokens: Array<Asset> | undefined;
}

export class AddressIssuedTokensComponent extends React.Component<
  AddressIssuedTokensProps,
  AddressIssuedTokensState
> {
  constructor(props: AddressIssuedTokensProps) {
    super(props);

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  state: AddressIssuedTokensState = {
    isModalOpen: false,
  };

  render() {
    const { issuedTokens } = this.props;

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

        {issuedTokens.length > MAX_TOKENS_RENDERED && (
          <div className="bi-address-issued-tokens__btn-container g-flex">
            <div className="bi-address-issued-tokens__item g-flex__item-fixed">
              <button
                className="bi-address-issued-tokens__btn bi-btn"
                onClick={this.openModal()}
              >
                <FormattedMessage id="components.address-issued-tokens.allTokens" />
              </button>
            </div>

            <AddressIssuedTokensModalComponent
              isOpen={this.state.isModalOpen}
              onClose={this.closeModal()}
              issuedTokens={this.props.issuedTokens}
            />
          </div>
        )}
      </>
    );
  }

  private openModal(): () => void {
    return () => {
      this.setState({
        isModalOpen: true,
      });
    };
  }

  private closeModal(): () => void {
    return () => {
      this.setState({
        isModalOpen: false,
      });
    };
  }
}
