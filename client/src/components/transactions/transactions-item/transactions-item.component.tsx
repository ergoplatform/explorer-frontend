import * as React from 'react';
import { FormattedMessage, FormattedPlural } from 'react-intl';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { Transaction } from '../../../models/generated/transaction';

import { SettingsState } from '../../../reducers/settings.reducer';
import { AppState } from '../../../store/app.store';

import { CoinValueComponent } from '../../common/coin-value/coin-value.component';
import { TimestampComponent } from '../../common/timestamp/timestamp.component';

import './transactions-item.scss';

interface IBlockTransactionsItemProps {
  transaction: Transaction;
  confirmations?: any;
}

class TransactionsItem extends React.PureComponent {
  props: IBlockTransactionsItemProps & SettingsState;
  
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
                  <div className='bi-transactions-item__input g-flex' key={ address.address || index }>
                    <div className='bi-transactions-item__address'>
                      { address.address ? <Link className='u-word-wrap u-word-wrap--ellipsis'
                                           to={ `/addresses/${address.address}` }>
                          { address.address }
                        </Link>
                        : <FormattedMessage id='components.transaction-item.null-address'/>
                      }
                    </div>
                    { this.props.isScriptsDisplayed && address.transactionId && (
                      <div className='bi-transactions-item__address-output g-flex__item-fixed'>
                        (<CoinValueComponent value={ address.value }/> - <Link
                        to={ `/transactions/${address.transactionId}` }>
                        <FormattedMessage id='components.transaction-item.address-output'/>
                      </Link>
                        )
                      </div>
                    ) }
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
                    <div className='bi-transactions-item__address g-flex__item-fixed'>
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
  
  
                    { this.props.isScriptsDisplayed && (
                      <div className='bi-transactions-item__address-spent g-flex__item'>
                        { address.spentTransactionId ?
                          (<Link to={ `/transactions/${address.spentTransactionId}` }>
                              <FormattedMessage id='components.transaction-item.spent'/>
                            </Link>
                          )
                          : (
                            (
                              <FormattedMessage id='components.transaction-item.unspent'/>
                            )
                          )
                        }
                      </div>
                    ) }
                    
                    <div className='bi-transactions-item__value g-flex__item-fixed'>
                      <CoinValueComponent value={ address.value }/>
                    </div>
                  </div>
                );
              })
            }
            
            <div className='bi-transactions-item__footer g-flex-column__item-fixed g-flex'>
              { this.props.confirmations > 0 && (
                <div className='bi-transactions-item__confirmations g-flex__item-fixed'>
                  { this.props.confirmations } <FormattedPlural value={ this.props.confirmations }
                                                                one={ <FormattedMessage
                                                                  id='components.transaction-item.confirmation.one'/> }
                                                                other={ <FormattedMessage
                                                                  id='components.transaction-item.confirmation.other'/> }/>
                </div>
              ) }
              
              { this.props.confirmations === 0 && (
                <div className='bi-transactions-item__confirmations g-flex__item-fixed item__confirmations--unconfirmed'>
                  <FormattedMessage id='components.transaction-item.unconfirmed'/>
                </div>
              )}
              
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

function mapStateToProps (state: AppState, ownProps: IBlockTransactionsItemProps): any {
  return {
    ...state.settings,
    ...ownProps
  };
}

export const TransactionsItemComponent = connect(mapStateToProps)(TransactionsItem);
