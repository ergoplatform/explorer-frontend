import * as React from 'react';

import { Asset } from '../../../models/generated/asset';

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
              <ul className='bi-transaction-raw-scripts__item' key={ index }>
                {
                  Object.keys(item)
                    .map((key, i) => {
                      if (
                        (item[key] === null )
                        ||(typeof item[key] === "object" && Object.keys(item[key]).length === 0)
                        || (typeof item[key] === "string" && item[key].trim().length === 0)
                      ) {
                        return null;
                      }

                      if (typeof item[key] === "object") {
                        if (key === "assets") {
                          return (
                            <li key={key}><b>{key}</b>: <ul>{
                              item[key].map((it: Asset) => <li key={item}><b>{it.tokenId}</b>: {it.amount}</li>)
                            }</ul></li>
                          );
                        }

                        return (
                          <li key={key}>
                            <b>{key}</b>: <ul>{
                              Object.keys(item[key])
                                .map(k => (<li key={k}><b>{k}</b>: {item[key][k]}</li>))
                            }</ul>
                          </li>
                        );
                      }

                      return (<li key={`${key}${i}`}><b>{key}</b>: {item[key]}}</li>);
                    })
                }
              </ul>
            );
          })
        }
      </div>
    );
  }
}
