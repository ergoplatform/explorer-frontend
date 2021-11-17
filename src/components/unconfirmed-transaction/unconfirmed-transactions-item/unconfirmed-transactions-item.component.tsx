import React from 'react';
import { FormattedMessage, FormattedPlural } from 'react-intl';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { AddressId } from '../../../models/generated/addressId';
import { Transaction } from '../../../models/generated/transaction';
import { TransactionOutput } from '../../../models/generated/transactionOutput';

import { SettingsState } from '../../../reducers/settings.reducer';
import { AppState } from '../../../store/app.store';

import { CoinValueComponent } from '../../common/coin-value/coin-value.component';
import { TimestampComponent } from '../../common/timestamp/timestamp.component';

import { DropdownListComponent } from '../../common/dropdown-list/dropdown-list.component';
import { ArrowThickIcon } from '../../common/icons/common.icons';
import './unconfirmed-transactions-item.scss';

interface IBlockTransactionsItemProps {
  transaction: Transaction;
  confirmations?: any;
  address?: AddressId;
  key?: string;
}

class UnconfirmedTransactionsItem extends React.Component<
  IBlockTransactionsItemProps & SettingsState
> {
  state: any = {
    isClient: false,
  };

  componentDidMount(): void {
    this.setState({
      isClient: true,
    });
  }

  renderAssets(assets: TransactionOutput['assets']): JSX.Element | null {
    if (assets.length === 0) {
      return null;
    }

    const defaultAssets = assets.map(({ amount, tokenId }) => ({
      label: tokenId.substr(0, 4),
      value: amount,
    }));

    const buttonText = `+${defaultAssets.length}`;

    return <DropdownListComponent list={assets} button={buttonText} />;
  }

  getAddressInputs = () =>
    this.props.transaction.inputs.reduce(
      (acc, { address, value }) =>
        address === this.props.address ? acc + value : acc,
      0
    );

  getAddressOutputs = () =>
    this.props.transaction.outputs.reduce(
      (acc, { address, value }) =>
        address === this.props.address ? acc + value : acc,
      0
    );

  getTransactionState = () => {
    const inputs = this.getAddressInputs();
    const outputs = this.getAddressOutputs();

    if (outputs !== 0 && outputs - inputs > 0) {
      return 'input';
    }

    return 'output';
  };

  render(): JSX.Element {
    let totalOutput = 0;
    const totalInputAddress = this.getAddressInputs();
    const totalOutputAddress = this.getAddressOutputs();
    const isOutput = this.getTransactionState() === 'output';

    return (
      <div className="bi-unconfirmed-transactions-item">
        <div className="bi-unconfirmed-transactions-item__header g-flex">
          <Link
            className="bi-unconfirmed-transactions-item__title u-word-wrap g-flex__item-fixed"
            to={`/transactions/${this.props.transaction.id}`}
          >
            {this.props.transaction.id}
          </Link>
          <div className="bi-unconfirmed-transactions-item__timestamp g-flex__item-fixed">
            <TimestampComponent
              timestamp={
                this.props.transaction.creationTimestamp ||
                this.props.transaction.timestamp
              }
            />
          </div>
        </div>

        <div className="bi-unconfirmed-transactions-item__body g-flex">
          <div className="bi-unconfirmed-transactions-item__inputs g-flex__item">
            {this.props.transaction.inputs.map((address, index) => {
              return (
                <div
                  className="bi-unconfirmed-transactions-item__input g-flex"
                  key={`${index}__${address.id}`}
                >
                  <div className="bi-unconfirmed-transactions-item__address">
                    {address.address ? (
                      <Link
                        className="u-word-wrap u-word-wrap--ellipsis"
                        to={`/addresses/${address.address}`}
                      >
                        {address.address}
                      </Link>
                    ) : (
                      <FormattedMessage id="components.transaction-item.null-address" />
                    )}
                  </div>

                  {this.props.isScriptsDisplayed &&
                    address.outputTransactionId && (
                      <div className="bi-unconfirmed-transactions-item__address-output g-flex g-flex__item-fixed">
                        (<CoinValueComponent value={address.value} />
                        {address.assets
                          ? this.renderAssets(address.assets)
                          : ''}
                        &nbsp;-&nbsp;
                        <Link
                          to={`/transactions/${address.outputTransactionId}`}
                        >
                          <FormattedMessage id="components.transaction-item.address-output" />
                        </Link>
                        )
                      </div>
                    )}
                </div>
              );
            })}
          </div>

          {this.props.address ? (
            <div
              className={[
                'bi-unconfirmed-transactions-item__arrow',
                isOutput
                  ? 'bi-unconfirmed-transactions-item__arrow--output'
                  : 'bi-unconfirmed-transactions-item__arrow--input',
              ].join(' ')}
            >
              <ArrowThickIcon className="bi-unconfirmed-transactions-item__arrow-icon" />
            </div>
          ) : (
            <div className="bi-unconfirmed-transactions-item__arrow">
              <ArrowThickIcon className="bi-unconfirmed-transactions-item__arrow-icon" />
            </div>
          )}

          <div className="bi-unconfirmed-transactions-item__outputs g-flex__item g-flex-column">
            {this.props.transaction.outputs.map((address, index) => {
              totalOutput += address.value;

              return (
                <div
                  className="bi-unconfirmed-transactions-item__output g-flex"
                  key={`${index}__${address.id}`}
                >
                  <div className="bi-unconfirmed-transactions-item__address g-flex__item-fixed">
                    {address.address ? (
                      <Link
                        className="u-word-wrap u-word-wrap--ellipsis"
                        to={`/addresses/${address.address}`}
                      >
                        {address.address}
                      </Link>
                    ) : (
                      <span className="u-word-wrap u-word-wrap--ellipsis">
                        <FormattedMessage id="components.transaction-item.null-address" />
                      </span>
                    )}
                  </div>

                  <div
                    className="bi-unconfirmed-transactions-item__address-spent g-flex__item u-word-wrap u-word-wrap--ellipsis"
                    style={{
                      display:
                        this.props.isScriptsDisplayed || !this.state.isClient
                          ? 'block'
                          : 'none',
                    }}
                  >
                    {address.spentTransactionId ? (
                      <Link to={`/transactions/${address.spentTransactionId}`}>
                        <FormattedMessage id="components.transaction-item.spent" />
                      </Link>
                    ) : (
                      <FormattedMessage id="components.transaction-item.unspent" />
                    )}
                  </div>

                  <div className="bi-unconfirmed-transactions-item__value g-flex__item-fixed">
                    <CoinValueComponent value={address.value} />

                    {this.renderAssets(address.assets)}
                  </div>
                </div>
              );
            })}

            <div className="bi-unconfirmed-transactions-item__footer g-flex-column__item-fixed g-flex">
              {this.props.confirmations > 0 && (
                <div className="bi-unconfirmed-transactions-item__confirmations g-flex__item-fixed">
                  {this.props.confirmations}{' '}
                  <FormattedPlural
                    value={this.props.confirmations}
                    one={
                      <FormattedMessage id="components.transaction-item.confirmation.one" />
                    }
                    other={
                      <FormattedMessage id="components.transaction-item.confirmation.other" />
                    }
                  />
                </div>
              )}

              <div className="bi-unconfirmed-transactions-item__confirmations g-flex__item-fixed item__confirmations--unconfirmed">
                <FormattedMessage id="components.transaction-item.unconfirmed" />
              </div>

              <div
                className={[
                  'bi-unconfirmed-transactions-item__total-value g-flex__item-fixed',
                  this.props.address &&
                    (isOutput
                      ? 'bi-unconfirmed-transactions-item__total-value--output'
                      : 'bi-unconfirmed-transactions-item__total-value--input'),
                ].join(' ')}
              >
                <CoinValueComponent
                  value={
                    this.props.address
                      ? Math.abs(totalOutputAddress - totalInputAddress)
                      : totalOutput
                  }
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(
  state: AppState,
  ownProps: IBlockTransactionsItemProps
): any {
  return {
    ...state.settings,
    ...ownProps,
  };
}

export const UnconfirmedTransactionsItemComponent = connect(mapStateToProps)(
  UnconfirmedTransactionsItem
);
