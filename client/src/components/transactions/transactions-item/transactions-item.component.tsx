import * as React from 'react';
import { Link } from 'react-router-dom';

import { Transaction } from '../../../models/generated/transaction';

import { CoinValueComponent } from '../../common/coin-value/coin-value.component';
import { TimestampComponent } from '../../common/timestamp/timestamp.component';

import './transactions-item.scss';

interface IBlockTransactionsItemProps {
  transaction: Transaction;
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
              this.props.transaction.inputs.map((address) => {
                return (
                  <div className='bi-transactions-item__input u-word-wrap' key={ address.id }>
                    <Link to={ `/addresses/${address.id}` }>
                      { address.id }
                    </Link>
                  </div>
                );
              })
            }
          </div>
          
          <div className='bi-transactions-item__outputs g-flex__item g-flex-column'>
            {
              this.props.transaction.outputs.map((address) => {
                totalOutput += address.value;
                
                return (
                  <div className='bi-transactions-item__output g-flex' key={ address.address }>
                    <Link className='g-flex__item u-word-wrap'
                          to={ `/addresses/${address.address}` }>
                      { address.address }
                    </Link>
                    
                    <div className='bi-transactions-item__value g-flex__item-fixed'>
                      <CoinValueComponent value={ address.value }/>
                    </div>
                  </div>
                );
              })
            }
            
            <div className='bi-transactions-item__total-value g-flex-column__item-fixed'>
              <CoinValueComponent value={ totalOutput }/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
