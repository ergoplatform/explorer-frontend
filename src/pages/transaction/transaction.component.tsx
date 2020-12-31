import React from 'react';
import { RouteComponentProps } from 'react-router';

import ConfirmedTransactionComponent from '../confirmed-transaction/confirmed-transaction.component';
import UnconfirmedTransactionComponent from '../unconfirmed-transaction/unconfirmed-transaction.component';
import { ErrorMessageComponent } from '../../components/error-message/error-mesage.component';

class Transaction extends React.PureComponent<
  RouteComponentProps<{
    id: string;
  }>
> {
  state = {
    isConfirmed: false,
    isConfirmedTransactionFailed: false,
    isUnconfirmedTransactionFailed: false,
  };

  toggleIsConfirmed = (isConfirmed: boolean) => {
    this.setState({ isConfirmed });
  };

  setUnconfirmedTransactionFailed = () => {
    this.setState({ isConfirmedTransactionFailed: true });
  };

  setConfirmedTransactionFailed = () => {
    this.setState({ isConfirmedTransactionLoaded: true });
  };

  render(): any {
    const {
      isConfirmed,
      isConfirmedTransactionFailed,
      isUnconfirmedTransactionFailed,
    } = this.state;

    if (!isConfirmedTransactionFailed && !isUnconfirmedTransactionFailed) {
      if (!isConfirmed) {
        return (
          <UnconfirmedTransactionComponent
            toggleIsConfirmed={this.toggleIsConfirmed}
            setFailed={this.setUnconfirmedTransactionFailed}
          />
        );
      }

      return (
        <ConfirmedTransactionComponent
          toggleIsConfirmed={this.toggleIsConfirmed}
          setFailed={this.setConfirmedTransactionFailed}
        />
      );
    }

    return (
      <ErrorMessageComponent message="components.transaction.error-message" />
    );
  }
}

export default Transaction;
