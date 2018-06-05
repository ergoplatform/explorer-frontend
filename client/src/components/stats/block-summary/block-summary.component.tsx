import * as React from 'react';
import { FormattedMessage } from 'react-intl';

import './block-summary.scss';

interface IBlockSummaryProps {
  summary: any;
}

export class BlockSummaryComponent extends React.PureComponent<IBlockSummaryProps> {
  render (): JSX.Element {
    return (
      <div className='bi-block-summary'>
        <div className='bi-block-summary__header'>
          <FormattedMessage id='components.block-summary.title'/>
        </div>
  
        <div className='bi-block-summary__body bi-table'>
          <div className='bi-block-summary__row bi-table__row'>
            <div className='bi-block-summary__cell bi-block-summary__cell--header bi-table__cell'>
              <FormattedMessage id='components.block-summary.total'/>
            </div>
      
            <div className='bi-block-summary__cell bi-block-summary__cell--value bi-table__cell u-word-wrap'>
              { this.props.summary.total }
            </div>
          </div>
  
          <div className='bi-block-summary__row bi-table__row'>
            <div className='bi-block-summary__cell bi-block-summary__cell--header bi-table__cell'>
              <FormattedMessage id='components.block-summary.averageMiningTime'/>
            </div>
    
            <div className='bi-block-summary__cell bi-block-summary__cell--value bi-table__cell u-word-wrap'>
              { this.props.summary.averageMiningTime }
            </div>
          </div>
        </div>
      </div>
    );
  }
}
