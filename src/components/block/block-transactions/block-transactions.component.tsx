import * as React from 'react';

import BlockTransactionsItemComponent from './block-transactions-item/block-transactions-item.component';

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
            return (<BlockTransactionsItemComponent transaction={ transaction } key={ transaction.id }/>);
          })
        }
      </div>
    );
  }
}

export default BlockTransactionsComponent;
