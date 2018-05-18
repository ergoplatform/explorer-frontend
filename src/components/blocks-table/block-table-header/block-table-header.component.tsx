import * as React from 'react';
import { FormattedMessage } from 'react-intl';

import './blocks-table-header.scss';

export class BlockTableHeaderComponent extends React.Component {
  render (): JSX.Element {
    return (
      <div className='bi-blocks-table-header bi-blocks-table__row bi-table__row'>
        <div className='bi-blocks-table__cell bi-table__cell'>
          <FormattedMessage id='common.block.height'/>
        </div>
        
        <div className='bi-blocks-table__cell bi-table__cell'>
          <FormattedMessage id='common.block.age'/>
        </div>
        
        <div className='bi-blocks-table__cell bi-table__cell'>
          <FormattedMessage id='common.block.transactions'/>
        </div>
        
        <div className='bi-blocks-table__cell bi-table__cell'>
          <FormattedMessage id='common.block.minedBy'/>
        </div>
        
        <div className='bi-blocks-table__cell bi-table__cell'>
          <FormattedMessage id='common.block.size'/>
        </div>
        
        <div className='bi-blocks-table__cell bi-table__cell'>
          <FormattedMessage id='common.block.votes'/>
        </div>
      </div>
    );
  }
}
