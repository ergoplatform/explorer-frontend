import * as React from 'react';
import environment from '../../../config/environment';

interface ICoinValueProps {
  value: number;
}

export class CoinValueComponent extends React.PureComponent<ICoinValueProps> {
  render (): JSX.Element {
    const { value } = this.props;
    
    let formattedValue = value/1e8;
    
    if (formattedValue < 1) {
      formattedValue = value;
    }
    
    return (
      <div className='bi-coin-value'>
        { formattedValue } { environment.blockchain.coinName.toUpperCase() }
      </div>
    );
  }
}
