import * as queryString from 'query-string';
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
import { PaginateSimpleComponent } from '../../components/common/paginate-simple/paginate-simple.component';
import { TransactionsComponent } from '../../components/transactions/transactions.component';

class Address extends React.PureComponent {
  props: RouteComponentProps<{ id: string }> & AddressState & AddressActions;
  params: any;
  
  constructor (props: any) {
    super(props);
    
    this.getPageUrl = this.getPageUrl.bind(this);
  }
  
  componentDidMount (): void {
    this.params = this.getParams();
    
    this.props.getAddress(this.params.id);
    this.props.getAddressTransactions(this.params.id, this.params);
  }
  
  componentWillReceiveProps (nextProps: any): void {
    const params = this.getParams();
    
    if (JSON.stringify(params) !== JSON.stringify(this.params)) {
      if (params.id !== this.params.id) {
        this.props.getAddress(params.id);
      }
      
      this.params = params;
      
      this.props.getAddressTransactions(this.params.id, this.params);
    }
  }
  
  render (): JSX.Element {
    return (
      <div className='bi-address g-flex-column__item-fixed'>
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
    if (!this.props.address || this.props.fetching) {
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
        
        { this.props.transactions &&
        (
          <div className='bi-address__transactions'>
            { !this.props.transactionFetching &&
            <TransactionsComponent transactions={ this.props.transactions.items }/>
            }
            
            <div className='bi-address__transactions-footer g-flex'>
              <PaginateSimpleComponent total={ this.props.transactions.total }
                                       limit={ this.params.limit }
                                       getPageUrl={ this.getPageUrl }
                                       forcePage={ Math.floor(this.params.offset / this.params.limit) }/>
            </div>
          </div>
        )
        }
      </div>
    );
  }
  
  private getPageUrl (page: number): string {
    const params = queryString.parse(this.props.history.location.search);
    
    params.offset = page * this.params.limit;
    
    return `${this.props.location.pathname}?${queryString.stringify(params)}`;
  }
  
  private getParams (): any {
    let { offset, limit } = queryString.parse(this.props.history.location.search);
    const id              = this.props.match.params.id;
    
    offset = parseInt(offset, 10);
    limit  = parseInt(limit, 10) || 30;
    
    return {
      id,
      limit,
      offset: offset || 0
    };
  }
}


function mapStateToProps (state: AppState): AddressState {
  return state.address;
}

function mapDispatchToProps (dispatch: any): ActionCreatorsMapObject {
  return bindActionCreators(AddressActions, dispatch);
}

export const AddressComponent = connect(mapStateToProps, mapDispatchToProps)(Address);
