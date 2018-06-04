import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';

import { SearchBlock } from '../../models/generated/searchBlock';

import { formatNumberMetricPrefix } from '../../utils/formatNumberMetricPrefix';

import { TimestampComponent } from '../common/timestamp/timestamp.component';
import { BlockTableHeaderComponent } from './block-table-header/block-table-header.component';

import './blocks-table.scss';

interface IBlockTableProps {
  blocks: SearchBlock[];
  isFetching: boolean;
}

export class BlocksTableComponent extends React.Component<IBlockTableProps> {
  render (): JSX.Element {
    return (
      <div className='bi-blocks-table'>
        { this.props.isFetching ? null : this.renderTable() }
      </div>
    );
  }
  
  private renderTable (): JSX.Element {
    return (
      <div className='bi-blocks-table__body bi-table'>
        <BlockTableHeaderComponent/>
        
        {
          this.props.blocks.map((block) => {
            return (
              <div className='bi-blocks-table__row bi-table__row' key={ block.height }>
                <div className='bi-blocks-table__cell bi-table__cell'>
                  <div className='bi-blocks-table__cell-name'>
                    <FormattedMessage id='common.block.height'/>
                  </div>
                  
                  <Link to={ `/blocks/${block.id}` }>
                    { block.height }
                  </Link>
                </div>
                <div className='bi-blocks-table__cell bi-table__cell'>
                  <div className='bi-blocks-table__cell-name'>
                    <FormattedMessage id='common.block.age'/>
                  </div>
                  
                  <TimestampComponent timestamp={ block.timestamp }/>
                </div>
                <div className='bi-blocks-table__cell bi-table__cell'>
                  <div className='bi-blocks-table__cell-name'>
                    <FormattedMessage id='common.block.transactions'/>
                  </div>
                  
                  { block.transactionsCount }
                </div>
                <div className='bi-blocks-table__cell bi-table__cell'>
                  <div className='bi-blocks-table__cell-name'>
                    <FormattedMessage id='common.block.minedBy'/>
                  </div>
                  
                  <Link to={ `/addresses/${block.miner.id}` } className='u-word-wrap u-word-wrap--ellipsis'>
                    { block.miner.name || block.miner.id }
                  </Link>
                </div>
                <div className='bi-blocks-table__cell bi-table__cell'>
                  <div className='bi-blocks-table__cell-name'>
                    <FormattedMessage id='common.block.size'/>
                  </div>
                  
                  { formatNumberMetricPrefix(block.size, { desiredFormat: 'k' }) }B
                </div>
                <div className='bi-blocks-table__cell bi-table__cell'>
                  <div className='bi-blocks-table__cell-name'>
                    <FormattedMessage id='common.block.votes'/>
                  </div>
                  { block.votes }
                </div>
              </div>
            );
          })
        }
      </div>
    );
  }
}
