import * as React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { Link } from 'react-router-dom';

import './block-table.scss';

import { formatNumberMetricPrefix } from '../../utils/formatNumberMetricPrefix';

import BlockTableHeaderComponent from './block-table-header/block-table-header.component';

class BlockTableComponent extends React.Component {
  props: {
    blocks: any[],
  } & InjectedIntlProps;
  
  render (): JSX.Element {
    return (
      <div className='bi-block-table'>
        <div className='bi-block-table__title'>
          { this.props.intl.formatMessage({ id: 'components.block-table.title' }) }
        </div>
        
        <div className='bi-block-table__table'>
          <BlockTableHeaderComponent/>
          
          {
            this.props.blocks.map((block) => {
              return (
                <div className='bi-block-table__row' key={ block.height }>
                  <div className='bi-block-table__cell'>
                    <Link to={ `/blocks/${block.id}` }>
                      { block.height }
                    </Link>
                  </div>
                  <div className='bi-block-table__cell'>{ block.timestamp }</div>
                  <div className='bi-block-table__cell'>{ block.transactionsCount }</div>
                  <div className='bi-block-table__cell'>
                    <Link to={ `/addresses/${block.miner.id}` }>
                      { block.miner.name || block.miner.id }
                    </Link>
                  </div>
                  <div className='bi-block-table__cell'>{ formatNumberMetricPrefix(block.size) }B</div>
                  <div className='bi-block-table__cell'>{ block.votes }</div>
                </div>
              );
            })
          }
        </div>
      </div>
    );
  }
}

export default injectIntl(BlockTableComponent);
