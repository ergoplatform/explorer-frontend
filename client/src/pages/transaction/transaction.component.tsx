import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { ActionCreatorsMapObject, bindActionCreators } from 'redux';

import { Transaction as TransactionModel } from '../../models/generated/transaction';

import { TransactionActions } from '../../actions/transaction.actions';
import { AppState } from '../../store/app.store';

import { TransactionState } from '../../reducers/transaction.reducer';

import { TransactionIoSummaryComponent } from '../../components/transaction/transaction-io-summary/transaction-io-summary.component';
import { TransactionSummaryComponent } from '../../components/transaction/transaction-summary/transaction-summary.component';
import { TransactionsItemComponent } from '../../components/transactions/transactions-item/transactions-item.component';

import './transaction.scss';

class Transaction extends React.PureComponent {
  props: RouteComponentProps<{
    id: string;
  }> & TransactionState & TransactionActions;
  
  componentDidMount (): void {
    this.props.getTransaction(this.props.match.params.id);
  }
  
  componentWillReceiveProps (nextProps: any): void {
    if (nextProps.match.params.id !== this.props.match.params.id) {
      this.props.getTransaction(nextProps.match.params.id);
    }
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
      timestamp: this.props.transaction.summary.timestamp
    };
    
    return (
      <div className='bi-transaction__body'>
        <TransactionsItemComponent transaction={ transaction }/>
  
        <div className='bi-transaction__tables g-flex'>
          <div className='bi-transaction__table g-flex__item'>
            <TransactionSummaryComponent summary={ this.props.transaction.summary }/>
          </div>
  
          <div className='bi-transaction__table g-flex__item'>
            <TransactionIoSummaryComponent summary={ this.props.transaction.ioSummary }/>
          </div>
        </div>
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
