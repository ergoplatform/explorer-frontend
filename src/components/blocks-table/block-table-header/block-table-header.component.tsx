import * as React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';

import './blocks-table-header.scss';

class BlockTableHeader extends React.Component {
  props: InjectedIntlProps;
  
  render (): JSX.Element {
    return (
      <div className='bi-blocks-table-header bi-blocks-table__row bi-table__row'>
        <div className='bi-blocks-table__cell bi-table__cell'>
          { this.props.intl.formatMessage({ id: 'common.block.height' }) }
        </div>
        <div className='bi-blocks-table__cell bi-table__cell'>
          { this.props.intl.formatMessage({ id: 'common.block.age' }) }
        </div>
        <div className='bi-blocks-table__cell bi-table__cell'>
          { this.props.intl.formatMessage({ id: 'common.block.transactions' }) }
        </div>
        <div className='bi-blocks-table__cell bi-table__cell'>
          { this.props.intl.formatMessage({ id: 'common.block.minedBy' }) }
        </div>
        <div className='bi-blocks-table__cell bi-table__cell'>
          { this.props.intl.formatMessage({ id: 'common.block.size' }) }
        </div>
        <div className='bi-blocks-table__cell bi-table__cell'>
          { this.props.intl.formatMessage({ id: 'common.block.votes' }) }
        </div>
      </div>
    );
  }
}

export const BlockTableHeaderComponent = injectIntl(BlockTableHeader);
