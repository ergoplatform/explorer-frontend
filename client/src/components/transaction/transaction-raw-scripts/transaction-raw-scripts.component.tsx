import * as React from 'react';

interface ITransactionRawScriptsProps {
  items: any[];
}

import './transaction-raw-scripts.scss';

export class TransactionRawScriptsComponent extends React.PureComponent<ITransactionRawScriptsProps> {
  render (): JSX.Element {
    return (
      <div className='bi-transaction-raw-scripts'>
        {
          this.props.items.map((item, index) => {
            return (
              <div className='bi-transaction-raw-scripts__item' key={ index }>
                {
                  Object.keys(item)
                    .map((key) => {
                      return item[key];
                    })
                    .join(' ')
                }
              </div>
            );
          })
        }
      </div>
    );
  }
}
