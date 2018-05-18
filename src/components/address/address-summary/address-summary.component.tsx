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
        
        <div className='bi-address-summary__body bi-table'>
          <div className='bi-address-summary__row bi-table__row'>
            <div className='bi-address-summary__cell bi-address-summary__cell--header bi-table__cell'>
              { this.props.intl.formatMessage({ id: 'components.address-summary.hash' }) }
            </div>
            
            <div className='bi-address-summary__cell bi-address-summary__cell--value bi-table__cell u-word-wrap'>
              { this.props.summary.id }
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export const AddressSummaryComponent = injectIntl<IAddressSummaryProps>(AddressSummary);
