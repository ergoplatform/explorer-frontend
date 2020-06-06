import React from 'react';
import { RouteComponentProps } from 'react-router';

import ConfirmedTransactionComponent from '../confirmed-transaction/confirmed-transaction.component';
import UnconfirmedTransactionComponent from '../unconfirmed-transaction/unconfirmed-transaction.component';

class Transaction extends React.PureComponent<
  RouteComponentProps<{
    id: string;
  }>
> {
  state = {
    isConfirmed: false,
  };

  toggleIsConfirmed = (isConfirmed: boolean) => {
    this.setState({ isConfirmed });
  };

  render(): any {
    if (!this.state.isConfirmed) {
      return (
        <UnconfirmedTransactionComponent
          toggleIsConfirmed={this.toggleIsConfirmed}
        />
      );
    }

    return (
      <ConfirmedTransactionComponent
        toggleIsConfirmed={this.toggleIsConfirmed}
      />
    );
  }
}

export default Transaction;
