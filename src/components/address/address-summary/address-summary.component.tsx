import * as React from 'react';

import { FullAddressSummary } from '../../../models/generated/fullAddressSummary';

import './address-summary.scss';

interface IAddressSummaryProps {
  summary: FullAddressSummary;
}

class AddressSummaryComponent extends React.PureComponent {
  props: IAddressSummaryProps;
  
  render (): JSX.Element {
    return (
      <div className='bi-address-summary'>
        <div className='bi-address-summary__header'>
          Summary
        </div>
        
        <div className='bi-address-summary__body'>
          <div className='bi-address-summary__row'>
            <div className='bi-address-summary__cell bi-address-summary__cell--header'>
              Hash
            </div>
            
            <div className='bi-address-summary__cell bi-address-summary__cell--value'>
              { this.props.summary.id }
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AddressSummaryComponent;
