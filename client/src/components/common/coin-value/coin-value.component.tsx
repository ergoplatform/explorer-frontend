import * as React from 'react';
import environment from '../../../config/environment';

interface ICoinValueProps {
  value: number;
}

export class CoinValueComponent extends React.PureComponent<ICoinValueProps> {
  render (): JSX.Element {
    const { value } = this.props;
    
    return (
      <div className='bi-coin-value'>
        { value / 1e8 } { environment.blockchain.coinName.toUpperCase() }
      </div>
    );
  }
}
