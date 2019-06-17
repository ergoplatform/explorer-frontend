import * as React from 'react';

import environment from '../../../config/environment';

interface ICoinValueProps {
  value: number;
}

export class CoinValueComponent extends React.PureComponent<ICoinValueProps> {
  render (): JSX.Element {
    return (
      <div className='bi-coin-value'>
        { this.getFormattedValue() } { environment.blockchain.coinName.toUpperCase() }
      </div>
    );
  }

  private getFormattedValue (): string {
    const { value } = this.props;

    const formattedValue = value / 1e9;

    if (formattedValue < 1 && formattedValue !== 0) {
      return formattedValue.toFixed(9)
        .split('')
        .reduceRight((arr: string[], i: string) => {
          if (i === '0' && arr.length === 0) {
            return arr;
          }

          arr.push(i);

          return arr;
        }, [])
        .reverse()
        .join('');
    }

    return formattedValue.toString();
  }
}
