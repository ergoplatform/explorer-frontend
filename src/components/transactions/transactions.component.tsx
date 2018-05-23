import * as React from 'react';

import { Transaction } from '../../models/generated/transaction';

import { TransactionsItemComponent } from './transactions-item/transactions-item.component';

import './transactions.scss';

interface IBlockTransactionProps {
  transactions: Transaction[];
}

export class TransactionsComponent extends React.PureComponent<IBlockTransactionProps> {
  render (): JSX.Element {
    return (
      <div className='bi-transactions'>
        {
          this.props.transactions.map((transaction) => {
            return (<TransactionsItemComponent transaction={ transaction } key={ transaction.id }/>);
          })
        }
      </div>
    );
  }
}
