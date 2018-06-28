import * as React from 'react';
import { FormattedMessage, FormattedPlural } from 'react-intl';
import { Link } from 'react-router-dom';

import { Transaction } from '../../../models/generated/transaction';

import { CoinValueComponent } from '../../common/coin-value/coin-value.component';
import { TimestampComponent } from '../../common/timestamp/timestamp.component';

import './transactions-item.scss';

interface IBlockTransactionsItemProps {
  transaction: Transaction;
  confirmations?: any;
}

export class TransactionsItemComponent extends React.PureComponent<IBlockTransactionsItemProps> {
  render (): JSX.Element {
    let totalOutput = 0;
    
    return (
      <div className='bi-transactions-item'>
        <div className='bi-transactions-item__header g-flex'>
          <Link className='bi-transactions-item__title u-word-wrap g-flex__item-fixed'
                to={ `/transactions/${this.props.transaction.id}` }>
            { this.props.transaction.id }
          </Link>
          
          <div className='bi-transactions-item__timestamp g-flex__item-fixed'>
            <TimestampComponent timestamp={ this.props.transaction.timestamp }/>
          </div>
        </div>
        
        <div className='bi-transactions-item__body g-flex'>
          <div className='bi-transactions-item__inputs g-flex__item'>
            {
              this.props.transaction.inputs.map((address, index) => {
                return (
                  <div className='bi-transactions-item__input u-word-wrap' key={ address.id || index }>
                    <div className='bi-transactions-item__address'>
                      { address.id ? <Link className='u-word-wrap u-word-wrap--ellipsis'
                                           to={ `/addresses/${address.id}` }>
                          { address.id }
                        </Link>
                        : <FormattedMessage id='components.transaction-item.null-address'/>
                      }
                    </div>
                  </div>
                );
              })
            }
          </div>
          
          <div className='bi-transactions-item__outputs g-flex__item g-flex-column'>
            {
              this.props.transaction.outputs.map((address, index) => {
                totalOutput += address.value;
                
                return (
                  <div className='bi-transactions-item__output g-flex' key={ address.address || index }>
                    <div className='bi-transactions-item__address g-flex__item'>
                      { address.address ?
                        <Link className='u-word-wrap u-word-wrap--ellipsis'
                              to={ `/addresses/${address.address}` }>
                          { address.address }
                        </Link>
                        : <span className='u-word-wrap u-word-wrap--ellipsis'>
                          <FormattedMessage id='components.transaction-item.null-address'/>
                        </span>
                      }
                    </div>
                    
                    <div className='bi-transactions-item__value g-flex__item-fixed'>
                      <CoinValueComponent value={ address.value }/>
                    </div>
                  </div>
                );
              })
            }
            
            <div className='bi-transactions-item__footer g-flex-column__item-fixed g-flex'>
              { this.props.confirmations && (
                <div className='bi-transactions-item__confirmations g-flex__item-fixed'>
                  { this.props.confirmations } <FormattedPlural value={ this.props.confirmations }
                                   one={ <FormattedMessage id='components.transaction-item.confirmation.one'/> }
                                   other={ <FormattedMessage id='components.transaction-item.confirmation.other'/> }/>
                </div>
              ) }
              
              <div className='bi-transactions-item__total-value g-flex__item-fixed'>
                <CoinValueComponent value={ totalOutput }/>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
