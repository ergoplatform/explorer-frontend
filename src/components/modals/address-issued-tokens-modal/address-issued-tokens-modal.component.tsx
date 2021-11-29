import React from 'react';
import { FormattedMessage } from 'react-intl';
import ReactModal from 'react-modal';
import format from 'format-number';
import { Link } from 'react-router-dom';

import { Asset } from '../../../models/generated/asset';

import { CrossIcon } from '../../common/icons/common.icons';

import './address-issued-tokens-modal.scss';

interface AddressIssuedTokensModalProps {
  isOpen: boolean;
  issuedTokens: Array<Asset> | undefined;
  onClose: () => void;
  title?: string;
}

export class AddressIssuedTokensModalComponent extends React.PureComponent<AddressIssuedTokensModalProps> {
  render(): JSX.Element {
    const { title } = this.props;
    return (
      <ReactModal
        className="bi-address-issued-tokens-modal bi-modal bi-modal--scale"
        overlayClassName="bi-modal-overlay"
        isOpen={this.props.isOpen}
        onRequestClose={this.props.onClose}
      >
        <button className="bi-modal__btn-close" onClick={this.props.onClose}>
          <CrossIcon className="bi-modal__btn-close-icon" />
        </button>

        <div className="bi-address-issued-tokens-modal__table-header">
          {title || 'Address tokens'}
        </div>
        <div className="bi-address-issued-tokens-modal__container">
          <div className="bi-address-issued-tokens-modal__table-body bi-table">
            {this.props.issuedTokens &&
              this.props.issuedTokens.map((token: Asset, i: number) => {
                return (
                  <div
                    key={`${Math.random()} - ${i}`}
                    className="bi-address-issued-tokens-modal__row bi-table__row"
                  >
                    <Link
                      to={`/token/${token.tokenId}`}
                      className="bi-address-issued-tokens-modal__cell bi-table__cell bi-address-issued-tokens-modal__cell--token-id"
                    >
                      <FormattedMessage id={token.name || token.tokenId} />
                    </Link>

                    <div className="bi-address-issued-tokens-modal__cell bi-table__cell bi-address-issued-tokens-modal__cell--amount">
                      {format({ integerSeparator: ' ' })(
                        token.decimals > 0
                          ? token.amount / Math.pow(10, token.decimals)
                          : token.amount
                      )}
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </ReactModal>
    );
  }
}
