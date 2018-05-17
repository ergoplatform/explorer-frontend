import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { ActionCreatorsMapObject, bindActionCreators } from 'redux';

import { TransactionActions } from '../../actions/transaction.actions';
import { AppState } from '../../store/app.store';

import { TransactionState } from '../../reducers/transaction.reducer';

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
        { this.props.transaction ? this.props.transaction.summary.id : null }
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

export const TransactionComponent =  connect(mapStateToProps, mapDispatchToProps)(Transaction);
