import * as React from 'react';
import { Link } from 'react-router-dom';

import { FullBlock } from '../../../models/generated/fullBlock';

import './block-transactions.scss';

interface IBlockTransactionProps {
  block: FullBlock;
}

class BlockTransactionsComponent extends React.PureComponent {
  props: IBlockTransactionProps;
  
  render (): JSX.Element {
    return (
      <div className='bi-block-transactions'>
        {
          this.props.block.blockTransactions.transactions.map((transaction) => {
            return (
              <div className='bi-block-transactions__item' key={ transaction.id }>
                <div className='bi-block-transactions__item-header'>
                  <Link to={ `/transactions/${transaction.id}` }>
                    { transaction.id }
                  </Link>
                </div>
                
                <div className='bi-block-transactions__item-body g-flex'>
                  <div className='bi-block-transactions__inputs g-flex__item'>
                    {
                      transaction.inputs.map((address) => {
                        return (
                          <div className='bi-block-transactions__item-input' key={ address.id }>
                            <Link to={ `/address/${address.id}` }>
                              { address.id }
                            </Link>
                          </div>
                        );
                      })
                    }
                  </div>
                  
                  <div className='bi-block-transactions__outputs g-flex__item'>
                    {
                      transaction.outputs.map((address) => {
                        return (
                          <div className='bi-block-transactions__item-output' key={ address.id }>
                            <Link to={ `/address/${address.id}` }>
                              { address.id }
                            </Link>
                            
                            <div className='bi-block-transactions__item-value'>
                              { address.value } ERGO
                            </div>
                          </div>
                        );
                      })
                    }
                  </div>
                </div>
              </div>
            );
          })
        }
      </div>
    );
  }
}

export default BlockTransactionsComponent;
