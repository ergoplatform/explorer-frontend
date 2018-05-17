import * as React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';

import { FullAddressSummary } from '../../../models/generated/fullAddressSummary';

import './address-summary.scss';

interface IAddressSummaryProps {
  summary: FullAddressSummary;
}

class AddressSummary extends React.PureComponent {
  props: IAddressSummaryProps & InjectedIntlProps;
  
  render (): JSX.Element {
    return (
      <div className='bi-address-summary'>
        <div className='bi-address-summary__header'>
          { this.props.intl.formatMessage({ id: 'components.address-summary.title' }) }
        </div>
        
        <div className='bi-address-summary__body'>
          <div className='bi-address-summary__row'>
            <div className='bi-address-summary__cell bi-address-summary__cell--header'>
              { this.props.intl.formatMessage({ id: 'components.address-summary.hash' }) }
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

export const AddressSummaryComponent = injectIntl<IAddressSummaryProps>(AddressSummary);
