import * as  QRCode from 'qrcode.react';
import * as React from 'react';

import { FullAddressSummary } from '../../../models/generated/fullAddressSummary';

interface IAddressSummaryProps {
  summary: FullAddressSummary;
}

class AddressSummaryComponent extends React.PureComponent {
  props: IAddressSummaryProps;
  
  render (): JSX.Element {
    return (
      <div className='bi-address-summary'>
        { this.props.summary.id }
        
        <QRCode value={ this.props.summary.id }/>
      </div>
    );
  }
}

export default AddressSummaryComponent;
