import * as React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';

import './block-table-header.scss';

class BlockTableHeaderComponent extends React.Component {
  props: InjectedIntlProps;
  
  render (): JSX.Element {
    return (
      <div className='bi-block-table-header bi-block-table__row'>
        <div className='bi-block-table__cell'>
          { this.props.intl.formatMessage({ id: 'common.block.height' }) }
        </div>
        <div className='bi-block-table__cell'>
          { this.props.intl.formatMessage({ id: 'common.block.age' }) }
        </div>
        <div className='bi-block-table__cell'>
          { this.props.intl.formatMessage({ id: 'common.block.transactions' }) }
        </div>
        <div className='bi-block-table__cell'>
          { this.props.intl.formatMessage({ id: 'common.block.minedBy' }) }
        </div>
        <div className='bi-block-table__cell'>
          { this.props.intl.formatMessage({ id: 'common.block.size' }) }
        </div>
        <div className='bi-block-table__cell'>
          { this.props.intl.formatMessage({ id: 'common.block.votes' }) }
        </div>
      </div>
    );
  }
}

export default injectIntl(BlockTableHeaderComponent);
