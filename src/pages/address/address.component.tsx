import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { ActionCreatorsMapObject, bindActionCreators } from 'redux';

import './address.scss';

import { AddressState } from '../../reducers/address.reducer';
import { AppState } from '../../store/app.store';

import { AddressActions } from '../../actions/address.actions';

import AddressSummaryComponent from '../../components/address/address-summary/address-summary.component';
import AddressTransactionsComponent from '../../components/address/address-transactions/address-transactions.component';

class AddressComponent extends React.PureComponent {
  props: RouteComponentProps<{ id: string }> & AddressState & AddressActions;
  
  componentDidMount (): void {
    this.props.getAddress(this.props.match.params.id);
  }
  
  render (): JSX.Element {
    return (
      <div className='bi-address'>
        <div className='bi-address__header'>
          <div className='bi-address__title'>
            ERGO Address
          </div>
        </div>
        
        { this.renderBody() }
      </div>
    );
  }
  
  private renderBody (): JSX.Element | null {
    if (!this.props.address) {
      return null;
    }
    
    return (
      <div className='bi-address__body'>
        <div className='bi-address__tables g-flex'>
          <div className='bi-address__table g-flex__item'>
            <AddressSummaryComponent summary={ this.props.address.summary }/>
          </div>
          
          <div className='bi-address__table g-flex__item'>
            <AddressTransactionsComponent/>
          </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(AddressComponent);
