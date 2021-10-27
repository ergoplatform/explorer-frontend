import React from 'react';

import { Asset } from '../../../models/generated/asset';

import './unconfirmed-transaction-raw-scripts.scss';

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

const getObjectRaw = (item: any, key: any) => {
  if (isBadValue(item[key])) {
    return <div key={key}></div>;
  }

  return (
    <li key={item[key]}>
      <b>{key}</b>:{' '}
      <ul>
        {Object.keys(item[key]).map((k) => {
          if (typeof item[key][k] === 'object') {
            return getObjectRaw(item[key], k);
          }

          return (
            <li key={item[key][k]}>
              <b>{k}</b>: {item[key][k]}
            </li>
          );
        })}
      </ul>
    </li>
  );
};

export class UnconfirmedTransactionRawScriptsComponent extends React.PureComponent<ITransactionRawScriptsProps> {
  render(): JSX.Element {
    return (
      <div className="bi-unconfirmed-transaction-raw-scripts">
        {this.props.items.map((item, index) => {
          return (
            <ul
              className="bi-unconfirmed-transaction-raw-scripts__item"
              key={index}
            >
              {Object.keys(item).map((key, i) => {
                if (isBadValue(item[key])) {
                  return null;
                }

                if (key === 'assets') {
                  return (
                    <li key={`${key}${index}`}>
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
                  return getObjectRaw(item, key);
                }

                return (
                  <li key={`${key}${index}`}>
                    <b>{key}</b>: {item[key]}
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
