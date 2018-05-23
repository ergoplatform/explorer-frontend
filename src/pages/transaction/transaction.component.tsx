import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { ActionCreatorsMapObject, bindActionCreators } from 'redux';

import { Transaction as TransactionModel } from '../../models/generated/transaction';

import { TransactionActions } from '../../actions/transaction.actions';
import { AppState } from '../../store/app.store';

import { TransactionState } from '../../reducers/transaction.reducer';

import { TransactionsItemComponent } from '../../components/transactions/transactions-item/transactions-item.component';

import './transaction.scss';

class Transaction extends React.PureComponent {
  props: RouteComponentProps<{
    id: string;
  }> & TransactionState & TransactionActions;
  
  componentDidMount (): void {
    this.props.getTransaction(this.props.match.params.id);
  }
  
  render (): JSX.Element {
    return (
      <div className='bi-transaction'>
        <div className='bi-transaction__header'>
          <div className='bi-transaction__title'>
            <FormattedMessage id='components.transaction.title'/>
          </div>
        </div>
        { this.renderBody() }
      </div>
    );
  }
  
  private renderBody (): JSX.Element | null {
    if (!this.props.transaction) {
      return null;
    }
    
    const transaction: TransactionModel = {
      id: this.props.transaction.summary.id,
      inputs: this.props.transaction.inputs,
      outputs: this.props.transaction.outputs,
    };
    
    return (
      <div className='bi-transaction__body'>
        <TransactionsItemComponent transaction={ transaction }/>
      </div>
    );
  }
}

function mapStateToProps (state: AppState): TransactionState {
  return state.transaction;
}

function mapDispatchToProps (dispatch: any): ActionCreatorsMapObject {
  return bindActionCreators(TransactionActions, dispatch);
}

export const TransactionComponent = connect(mapStateToProps, mapDispatchToProps)(Transaction);
