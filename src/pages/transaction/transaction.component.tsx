import React from 'react';
import { RouteComponentProps } from 'react-router';

import ConfirmedTransactionComponent from '../confirmed-transaction/confirmed-transaction.component';
import UnconfirmedTransactionComponent from '../unconfirmed-transaction/unconfirmed-transaction.component';
import { ErrorMessageComponent } from '../../components/error-message/error-mesage.component';
import { TransactionActions } from 'src/actions/transaction.actions';
import { connect } from 'react-redux';
import { GET_UNCONFIRMED_TRANSACTION_STRUCT } from 'src/constants/struct.types';
import { resetStruct } from 'redux-struct';

class Transaction extends React.PureComponent<
  RouteComponentProps<{
    id: string;
  }> & {
    dispatchClearTransactionsState: TransactionActions['clearTransactionsState'];
  }
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
    this.setState({ isUnconfirmedTransactionFailed: true });
  };

  setConfirmedTransactionFailed = () => {
    this.setState({ isConfirmedTransactionFailed: true });
  };

  componentWillUnmount() {
    this.props.dispatchClearTransactionsState();
  }

  render(): any {
    const {
      isConfirmed,
      isConfirmedTransactionFailed,
      isUnconfirmedTransactionFailed,
    } = this.state;

    if (!isConfirmedTransactionFailed || !isUnconfirmedTransactionFailed) {
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

const mapDispatchToProps = (dispatch: any) => ({
  dispatchClearTransactionsState: () => {
    dispatch(TransactionActions.clearTransactionsState());
    dispatch(resetStruct(GET_UNCONFIRMED_TRANSACTION_STRUCT));
  },
});

export default connect(null, mapDispatchToProps)(Transaction);
