import QRCode from 'qrcode.react';
import queryString from 'query-string';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import ReactModal from 'react-modal';
import { RouteComponentProps, withRouter } from 'react-router';
import { parseFloat } from 'src/utils/parseFloat';

import environment from '../../../config/environment';

import { AddressId } from '../../../models/generated/addressId';

import { CrossIcon } from '../../common/icons/common.icons';

import './payment-request-modal.scss';

type IPaymentRequestModalProps = RouteComponentProps<any> & {
  isOpen: boolean;
  onClose: () => void;
  address: AddressId;
};

interface IPaymentRequestState {
  amount: number;
  copied: boolean;
  description: string;
}

class PaymentRequestModal extends React.PureComponent<
  IPaymentRequestModalProps,
  IPaymentRequestState
> {
  link!: HTMLDivElement;

  state: IPaymentRequestState = {
    amount: 0,
    copied: false,
    description: '',
  };

  constructor(props: IPaymentRequestModalProps) {
    super(props);

    this.setAmount = this.setAmount.bind(this);
    this.setDescription = this.setDescription.bind(this);
    this.copyLinkToClipboard = this.copyLinkToClipboard.bind(this);
    this.selectLink = this.selectLink.bind(this);
  }

  render(): JSX.Element {
    const link = this.getLink();

    return (
      <ReactModal
        className="bi-payment-request-modal bi-modal bi-modal--scale g-scroll-y"
        overlayClassName="bi-modal-overlay"
        closeTimeoutMS={150}
        isOpen={this.props.isOpen}
        onRequestClose={this.props.onClose}
      >
        <button className="bi-modal__btn-close" onClick={this.props.onClose}>
          <CrossIcon className="bi-modal__btn-close-icon" />
        </button>

        <div className="bi-payment-request-modal__title">
          <FormattedMessage id="components.payment-request-modal.title" />

          <div className="bi-payment-request-modal__subtitle">
            <FormattedMessage id="components.payment-request-modal.subtitle" />
          </div>
        </div>

        <div className="bi-payment-request-modal__form">
          <label className="bi-payment-request-modal__form-item g-flex">
            <span className="bi-payment-request-modal__label g-flex__item-fixed">
              <FormattedMessage id="components.payment-request-modal.amount" />
            </span>

            <div className="bi-payment-request-modal__input-wrapper g-flex__item">
              <input
                className="bi-payment-request-modal__input"
                type="number"
                onChange={this.setAmount}
                min={0}
              />

              <span className="bi-payment-request-modal__input-currency">
                {environment.blockchain.coinName.toUpperCase()}
              </span>
            </div>
          </label>

          <label className="bi-payment-request-modal__form-item g-flex">
            <span className="bi-payment-request-modal__label bi-payment-request-modal__label--line">
              <FormattedMessage id="components.payment-request-modal.description" />
            </span>

            <div className="bi-payment-request-modal__input-wrapper g-flex__item">
              <textarea
                className="bi-payment-request-modal__input bi-payment-request-modal__input--textarea"
                onChange={this.setDescription}
              />
            </div>
          </label>
        </div>

        <div className="bi-payment-request-modal__result g-flex">
          <div className="g-flex__item-fixed bi-payment-request-modal__qrcode">
            <QRCode value={link} size={156} />
          </div>

          <div className="g-flex__item-fixed bi-payment-request-modal__link g-flex-column">
            <div className="bi-payment-request-modal__link-header g-flex-column__item-fixed">
              <FormattedMessage id="components.payment-request-modal.link" />:
            </div>

            <div
              className="bi-payment-request-modal__link-body u-word-wrap g-scroll-y g-flex-column__item"
              onClick={this.selectLink}
              ref={(ref: HTMLDivElement) => (this.link = ref)}
            >
              {link}
            </div>
          </div>
        </div>

        <div className="bi-payment-request-modal__footer g-flex-column__item g-flex">
          <button
            className="bi-payment-request-modal__btn-copy bi-btn bi-btn--flat"
            onClick={this.copyLinkToClipboard}
          >
            {this.state.copied ? (
              <FormattedMessage id="components.payment-request-modal.copied" />
            ) : (
              <FormattedMessage id="components.payment-request-modal.copy" />
            )}
          </button>
        </div>
      </ReactModal>
    );
  }

  private getLink(): string {
    const params = queryString.stringify({
      address: this.props.address,
      amount: this.state.amount,
      description: this.state.description,
    });

    const host = environment.environments
      ? environment.environments[0].url
      : window.location.origin;

    return `${host}/payment-request?${params}`;
  }

  private setAmount(event: React.ChangeEvent<HTMLInputElement>): void {
    this.setState({
      amount: parseFloat(event.target.value, 9),
    });
  }

  private setDescription(event: React.ChangeEvent<HTMLTextAreaElement>): void {
    this.setState({
      description: event.target.value,
    });
  }

  private selectLink(): void {
    (window.getSelection() as Selection).selectAllChildren(this.link);
  }

  private copyLinkToClipboard(): void {
    this.selectLink();

    document.execCommand('copy');
    (window.getSelection() as Selection).removeAllRanges();

    this.setState({
      copied: true,
    });

    setTimeout(() => {
      this.setState({
        copied: false,
      });
    }, 1000);
  }
}

export const PaymentRequestModalComponent = withRouter(PaymentRequestModal);
