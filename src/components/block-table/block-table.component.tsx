import * as React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { Link } from 'react-router-dom';

import './block-table.scss';

import { formatNumberMetricPrefix } from '../../utils/formatNumberMetricPrefix';

import BlockTableHeaderComponent from './block-table-header/block-table-header.component';

interface IBlockTableProps {
  blocks: any[];
  isFetching: boolean;
}

class BlockTableComponent extends React.PureComponent {
  props: InjectedIntlProps & IBlockTableProps;
  
  render (): JSX.Element {
    return (
      <div className='bi-block-table'>
        <div className='bi-block-table__header'>
          { this.props.intl.formatMessage({ id: 'components.block-table.title' }) }
        </div>
        
        { this.props.isFetching ? null : this.renderTable() }
      </div>
    );
  }
  
  private renderTable (): JSX.Element {
    return (
      <div className='bi-block-table__body'>
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
    );
  }
}

export default injectIntl<IBlockTableProps>(BlockTableComponent);
