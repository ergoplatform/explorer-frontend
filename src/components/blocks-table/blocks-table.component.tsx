import * as React from 'react';
import { Link } from 'react-router-dom';

import { formatNumberMetricPrefix } from '../../utils/formatNumberMetricPrefix';

import { BlockTableHeaderComponent } from './block-table-header/block-table-header.component';

import './blocks-table.scss';

interface IBlockTableProps {
  blocks: any[];
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
                  <Link to={ `/blocks/${block.id}` }>
                    { block.height }
                  </Link>
                </div>
                <div className='bi-blocks-table__cell bi-table__cell'>{ block.timestamp }</div>
                <div className='bi-blocks-table__cell bi-table__cell'>{ block.transactionsCount }</div>
                <div className='bi-blocks-table__cell bi-table__cell'>
                  <Link to={ `/addresses/${block.miner.id}` }>
                    { block.miner.name || block.miner.id }
                  </Link>
                </div>
                <div className='bi-blocks-table__cell bi-table__cell'>{ formatNumberMetricPrefix(block.size) }B</div>
                <div className='bi-blocks-table__cell bi-table__cell'>{ block.votes }</div>
              </div>
            );
          })
        }
      </div>
    );
  }
}
