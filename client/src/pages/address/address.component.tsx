import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { ActionCreatorsMapObject, bindActionCreators } from 'redux';

import environment from '../../config/environment';

import './address.scss';

import { AddressState } from '../../reducers/address.reducer';
import { AppState } from '../../store/app.store';

import { AddressActions } from '../../actions/address.actions';

import { AddressActionsComponent } from '../../components/address/address-actions/address-actions.component';
import { AddressSummaryComponent } from '../../components/address/address-summary/address-summary.component';
import { AddressTransactionsComponent } from '../../components/address/address-transactions/address-transactions.component';
import { TransactionsComponent } from '../../components/transactions/transactions.component';

class Address extends React.PureComponent {
  props: RouteComponentProps<{ id: string }> & AddressState & AddressActions;
  
  componentDidMount (): void {
    this.props.getAddress(this.props.match.params.id);
    this.props.getAddressTransactions(this.props.match.params.id);
  }
  
  componentWillReceiveProps (nextProps: any): void {
    if (nextProps.match.params.id !== this.props.match.params.id) {
      this.props.getAddress(nextProps.match.params.id);
      this.props.getAddressTransactions(nextProps.match.params.id);
    }
  }
  
  render (): JSX.Element {
    return (
      <div className='bi-address'>
        <div className='bi-address__header'>
          <div className='bi-address__title'>
            { environment.blockchain.coinName.toUpperCase() } Address
          </div>
        </div>
        
        { this.renderBody() }
      </div>
    );
  }
  
  private renderBody (): JSX.Element | null {
    if (!this.props.address || !this.props.transactions) {
      return null;
    }
    
    return (
      <div className='bi-address__body'>
        <div className='bi-address__tables g-flex'>
          <div className='bi-address__table g-flex__item'>
            <AddressSummaryComponent summary={ this.props.address.summary }/>
          </div>
          
          <div className='bi-address__table g-flex__item'>
            <AddressTransactionsComponent summary={ this.props.address.transactions }/>
          </div>
        </div>
        
        <div className='bi-address__actions'>
          <AddressActionsComponent address={ this.props.address }/>
        </div>
        
        <div className='bi-address__transactions'>
          <TransactionsComponent transactions={ this.props.transactions }/>
        </div>
      </div>
    );
  }
}

function mapStateToProps (state: AppState): AddressState {
  return state.address;
}

function mapDispatchToProps (dispatch: any): ActionCreatorsMapObject {
  return bindActionCreators(AddressActions, dispatch);
}

export const AddressComponent = connect(mapStateToProps, mapDispatchToProps)(Address);
