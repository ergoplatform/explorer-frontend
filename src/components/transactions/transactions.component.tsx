import * as React from 'react';

import { AnyoneCanSpendTransaction } from '../../models/generated/anyoneCanSpendTransaction';

import { TransactionsItemComponent } from './transactions-item/transactions-item.component';

import './transactions.scss';

interface IBlockTransactionProps {
  transactions: AnyoneCanSpendTransaction[];
}

class Transactions extends React.PureComponent {
  props: IBlockTransactionProps;
  
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

export const TransactionsComponent = Transactions;
