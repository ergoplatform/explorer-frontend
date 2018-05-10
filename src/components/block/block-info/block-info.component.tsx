import * as React from 'react';

interface IBlockInfoProps {
  block: any;
}

import './block-info.scss';

class BlockInfoComponent extends React.PureComponent {
  props: IBlockInfoProps;
  
  render (): JSX.Element {
    return (
      <div className='bi-block-info'>
        <div className='bi-block-info__table'>
          <div className='bi-block-info__row'>
            <div className='bi-block-info__cell'>Height</div>
            <div className='bi-block-info__cell'>{ this.props.block.header.height }</div>
          </div>
  
          <div className='bi-block-info__row'>
            <div className='bi-block-info__cell'>Timestamp</div>
            <div className='bi-block-info__cell'>{ this.props.block.header.timestamp }</div>
          </div>
  
          <div className='bi-block-info__row'>
            <div className='bi-block-info__cell'>Hash</div>
            <div className='bi-block-info__cell'>{ this.props.block.header.id }</div>
          </div>
        </div>
      </div>
    );
  }
}

export default BlockInfoComponent;
