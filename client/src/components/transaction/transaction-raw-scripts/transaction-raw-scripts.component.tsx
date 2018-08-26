import * as React from 'react';

import { TransactionInput } from '../../../models/generated/transactionInput';
import { TransactionOutput } from '../../../models/generated/transactionOutput';

interface ITransactionRawScriptsProps {
  items: Array<TransactionOutput | TransactionInput>;
}

import './transaction-raw-scripts.scss';

export class TransactionRawScriptsComponent extends React.PureComponent<ITransactionRawScriptsProps> {
  render (): JSX.Element {
    return (
      <div className='bi-transaction-raw-scripts'>
        {
          this.props.items.map((item: TransactionInput | TransactionOutput, index: number) => {
            return (
              <div className='bi-transaction-raw-scripts__item' key={ `${index}_${item.address}` }>
                {
                  Object.keys(item)
                    .reduce((acc, key) => `${acc}${key}: ${item[key]} `, '')
                }
              </div>
            );
          })
        }
      </div>
    );
  }
}
