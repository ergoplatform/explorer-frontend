import * as queryString from 'query-string';
import * as React from 'react';
import Helmet from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { ActionCreatorsMapObject, bindActionCreators } from 'redux';

import environment from '../../config/environment';

import './address.scss';

import { AppActions } from '../../actions/app.actions';
import { AddressState } from '../../reducers/address.reducer';
import { AppState } from '../../store/app.store';

import { AddressActions } from '../../actions/address.actions';

import { AddressActionsComponent } from '../../components/address/address-actions/address-actions.component';
import { AddressSummaryComponent } from '../../components/address/address-summary/address-summary.component';
import { AddressTransactionsComponent } from '../../components/address/address-transactions/address-transactions.component';
import { PaginateSimpleComponent } from '../../components/common/paginate-simple/paginate-simple.component';
import { TransactionsComponent } from '../../components/transactions/transactions.component';

class Address extends React.PureComponent {
  props: RouteComponentProps<{ id: string }> & AddressState & AddressActions & AppActions;
  params: any;
  
  constructor (props: any) {
    super(props);
    
    this.params = this.getParams();
    
    this.getPageUrl = this.getPageUrl.bind(this);
  }
  
  componentDidMount (): void {
    if (this.props.preloaded) {
      this.props.clearPreloadedState();
      
      return;
    }
    
    this.props.getAddress(this.props.match.params.id);
    this.props.getAddressTransactions(this.props.match.params.id, this.params);
  }
  
  componentWillReceiveProps (nextProps: any): void {
    const params = this.getParams();
    
    if (this.props.match.params.id !== nextProps.match.params.id) {
      this.params = params;
      
      this.props.getAddress(nextProps.match.params.id);
      this.props.getAddressTransactions(nextProps.match.params.id, this.params);
      
      return;
    }
    
    if (JSON.stringify(params) !== JSON.stringify(this.params)) {
      this.params = params;
      
      this.props.getAddressTransactions(this.props.match.params.id, this.params);
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
        
        <FormattedMessage id='common.pages.address.title' values={ { id: this.props.address.summary.id } }>
          {
            title => (
              <Helmet>
                <title>{ title }</title>
              </Helmet>
            )
          }
        </FormattedMessage>
        
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
            <TransactionsComponent transactions={ this.props.transactions.items }
                                   address={ this.props.address.summary.id }/>
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
    
    offset = parseInt(offset, 10);
    limit  = parseInt(limit, 10) || 30;
    
    return {
      limit,
      offset: offset || 0
    };
  }
}


function mapStateToProps (state: AppState): AddressState {
  return state.address;
}

function mapDispatchToProps (dispatch: any): ActionCreatorsMapObject {
  return bindActionCreators({ ...AddressActions, ...AppActions }, dispatch);
}

export const AddressComponent = connect(mapStateToProps, mapDispatchToProps)(Address);
