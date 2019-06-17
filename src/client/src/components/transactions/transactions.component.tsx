import * as React from 'react';

import { AddressId } from '../../models/generated/addressId';
import { Transaction } from '../../models/generated/transaction';

import { TransactionsItemComponent } from './transactions-item/transactions-item.component';

import './transactions.scss';

interface IBlockTransactionProps {
  transactions: Transaction[];
  address?: AddressId;
}

export class TransactionsComponent extends React.PureComponent<IBlockTransactionProps> {
  render (): JSX.Element {
    return (
      <div className='bi-transactions'>
        {
          this.props.transactions.map((transaction) => {
            return (<TransactionsItemComponent key={ transaction.id } transaction={ transaction }
                                               address={ this.props.address }/>);
          })
        }
      </div>
    );
  }
}
