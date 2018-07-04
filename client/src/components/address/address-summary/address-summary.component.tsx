import * as React from 'react';
import { FormattedMessage } from 'react-intl';

import { FullAddressSummary } from '../../../models/generated/fullAddressSummary';

import './address-summary.scss';

interface IAddressSummaryProps {
  summary: FullAddressSummary;
}

export class AddressSummaryComponent extends React.Component<IAddressSummaryProps> {
  render (): JSX.Element {
    return (
      <div className='bi-address-summary'>
        <div className='bi-address-summary__header'>
          <FormattedMessage id='components.address-summary.title'/>
        </div>
        
        <div className='bi-address-summary__body bi-table'>
          <div className='bi-address-summary__row bi-table__row'>
            <div className='bi-address-summary__cell bi-address-summary__cell--header bi-table__cell'>
              <FormattedMessage id='components.address-summary.hash'/>
            </div>
            
            <div className='bi-address-summary__cell bi-address-summary__cell--value bi-table__cell u-word-wrap u-word-wrap--ellipsis'>
              { this.props.summary.id }
            </div>
          </div>
        </div>
      </div>
    );
  }
}
