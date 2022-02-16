import React from 'react';

import { Asset } from '../../../models/generated/asset';

import './transaction-raw-scripts.scss';

interface ITransactionRawScriptsProps {
  items: any[];
}

const isBadValue = (item: any) => {
  if (
    item === null ||
    (typeof item === 'object' && Object.keys(item).length === 0) ||
    (typeof item === 'string' && item.trim().length === 0)
  ) {
    return true;
  }

  return false;
};

export class TransactionRawScriptsComponent extends React.PureComponent<ITransactionRawScriptsProps> {
  render(): JSX.Element {
    return (
      <div className="bi-transaction-raw-scripts">
        {this.props.items.map((item, index) => {
          return (
            <ul className="bi-transaction-raw-scripts__item" key={index}>
              {Object.keys(item).map((key, i) => {
                if (isBadValue(item[key])) {
                  return null;
                }

                if (key === 'assets') {
                  return (
                    <li key={key}>
                      <b>{key}</b>:{' '}
                      <ul>
                        {item[key].map((it: Asset) => (
                          <li key={item}>
                            <b>{it.tokenId}</b>: {it.amount}
                          </li>
                        ))}
                      </ul>
                    </li>
                  );
                }

                if (typeof item[key] === 'object') {
                  return (
                    <li key={key}>
                      <b>{key}</b>:{' '}
                      <ul>
                        {Object.keys(item[key]).map((k) => {
                          if (typeof item[key][k] === 'object') {
                            return (
                              <li key={k}>
                                <b>{k}</b>:{' '}
                                <ul>
                                  {Object.keys(item[key][k]).map((k2) => {
                                    return (
                                      <li key={k2}>
                                        <b>{k2}</b>: {item[key][k][k2]}
                                      </li>
                                    );
                                  })}
                                </ul>
                              </li>
                            );
                          }
                          return (
                            <li key={k}>
                              <b>{k}</b>: {item[key][k]}
                            </li>
                          );
                        })}
                      </ul>
                    </li>
                  );
                }

                return (
                  <li key={`${key}${i}`}>
                    <b>{key}</b>:{' '}
                    {typeof item[key] === 'boolean'
                      ? JSON.stringify(item[key])
                      : item[key]}
                  </li>
                );
              })}
            </ul>
          );
        })}
      </div>
    );
  }
}
