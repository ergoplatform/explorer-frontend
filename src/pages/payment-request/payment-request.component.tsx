import QRCode from 'qrcode.react';
import queryString from 'query-string';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { RouteComponentProps } from 'react-router';

import environment from '../../config/environment';

import './payment-request.scss';

type IPaymentRequestProps = RouteComponentProps<any>;

export default class PaymentRequestComponent extends React.PureComponent<IPaymentRequestProps> {
  input!: HTMLDivElement;

  state: any = {
    copied: false,
  };

  constructor(props: IPaymentRequestProps) {
    super(props);

    this.copyAddressToClipboard = this.copyAddressToClipboard.bind(this);
  }

  getError(address: string, amount: string) {
    if (!address?.trim().length) {
      return { error: true, message: 'Invalid address' };
    }

    if (Number(amount) < 0) {
      return { error: true, message: 'Invalid amount' };
    }

    return { error: false };
  }

  render(): JSX.Element {
    const { address, amount, description }: any = queryString.parse(
      this.props.location.search
    );

    const mobileAppLink = `ergo:${address}${
      !amount && !description ? '' : '?'
    }${queryString.stringify({
      amount,
      description: description || undefined,
    })}`;

    const { error, message } = this.getError(address, amount);

    return (
      <div className="bi-payment-request">
        <div className="bi-payment-request__header">
          <div className="bi-payment-request__title">
            <FormattedMessage id="components.payment-request.title" />

            {!error && (
              <div className="bi-payment-request__subtitle">
                <FormattedMessage
                  id="components.payment-request.subtitle"
                  values={{
                    coinName: environment.blockchain.coinName.toUpperCase(),
                  }}
                />
              </div>
            )}
          </div>
        </div>
        {error ? (
          <div className="text-error">{message}</div>
        ) : (
          <div className="bi-payment-request__body">
            {(amount > 0 || description) && (
              <div className="bi-payment-request__info">
                {amount > 0 && (
                  <div className="bi-payment-request__amount">
                    {amount} {environment.blockchain.coinName.toUpperCase()}
                  </div>
                )}
                {description && (
                  <div className="bi-payment-request__description">
                    <FormattedMessage id="components.payment-request.for" />{' '}
                    <cite>«{description}»</cite>
                  </div>
                )}
              </div>
            )}
            <QRCode value={address} size={146} />

            <div className="bi-payment-request__address g-flex">
              <div
                className="bi-payment-request__input g-flex__item"
                ref={(ref: HTMLDivElement) => (this.input = ref)}
              >
                {address}
              </div>

              <button
                className="bi-payment-request__btn-copy g-flex__item-fixed"
                onClick={this.copyAddressToClipboard}
              >
                {this.state.copied ? (
                  <FormattedMessage id="components.payment-request.copied" />
                ) : (
                  <FormattedMessage id="components.payment-request.copy" />
                )}
              </button>
            </div>

            <a
              className="bi-payment-request__mobile-app-link"
              href={mobileAppLink}
            >
              Click here to open wallet app
            </a>
          </div>
        )}
      </div>
    );
  }

  private selectInput(): void {
    (window.getSelection() as Selection).selectAllChildren(this.input);
  }

  private copyAddressToClipboard(): void {
    this.selectInput();

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
