import * as React from 'react';
import { Link } from 'react-router-dom';

import './block-table.scss';

import { formatNumberMetricPrefix } from '../../utils/formatNumberMetricPrefix';

class BlockTableComponent extends React.PureComponent {
  props: {
    blocks: any[],
  };
  
  
  // TODO: Move block header to separate component, add i18n
  render (): JSX.Element {
    return (
      <div className='bi-block-table'>
        <div className='bi-block-table__title'>Latest blocks</div>
        
        <div className='bi-block-table__table'>
          
          <div className='bi-block-table__row bi-block-table__row--header'>
            <div className='bi-block-table__cell'>
              Height
            </div>
            <div className='bi-block-table__cell'>Age</div>
            <div className='bi-block-table__cell'>Transactions</div>
            <div className='bi-block-table__cell'>Mined by</div>
            <div className='bi-block-table__cell'>Size</div>
            <div className='bi-block-table__cell'>Votes</div>
          </div>
          
          {
            this.props.blocks.map((block) => {
              return (
                <div className='bi-block-table__row' key={ block.height }>
                  <div className='bi-block-table__cell'>
                    <Link to={ `/blocks/${block.height}` }>
                      { block.height }
                    </Link>
                  </div>
                  <div className='bi-block-table__cell'>{ block.timestamp }</div>
                  <div className='bi-block-table__cell'>{ block.transactionsCount }</div>
                  <div className='bi-block-table__cell'>
                    <Link to={ `/address/${block.miner.id}` }>
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

export default BlockTableComponent;
