import * as React from 'react';
import { Link } from 'react-router-dom';

import { AnyoneCanSpendTransaction } from '../../../models/generated/anyoneCanSpendTransaction';

import './transactions-item.scss';

interface IBlockTransactionsItemProps {
  transaction: AnyoneCanSpendTransaction;
}

class TransactionsItem extends React.PureComponent {
  props: IBlockTransactionsItemProps;
  
  render (): JSX.Element {
    let totalOutput = 0;
    
    return (
      <div className='bi-transactions-item'>
        <div className='bi-transactions-item__header'>
          <Link className='bi-transactions-item__title u-word-wrap'
                to={ `/transactions/${this.props.transaction.id}` }>
            { this.props.transaction.id }
          </Link>
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
                  <div className='bi-transactions-item__output g-flex' key={ address.id }>
                    <Link className='g-flex__item u-word-wrap'
                          to={ `/addresses/${address.id}` }>
                      { address.id }
                    </Link>
                    
                    <div className='bi-transactions-item__value g-flex__item-fixed'>
                      { address.value } ERGO
                    </div>
                  </div>
                );
              })
            }
            
            <div className='bi-transactions-item__total-value g-flex-column__item-fixed'>
              { totalOutput } ERGO
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export const TransactionsItemComponent = TransactionsItem;
