import * as React from 'react';
import { FormattedMessage } from 'react-intl';

import { FullBlock } from '../../../models/generated/fullBlock';

interface IBlockInfoProps {
  block: FullBlock;
}

import './block-info.scss';

export class BlockInfoComponent extends React.Component<IBlockInfoProps> {
  render (): JSX.Element {
    return (
      <div className='bi-block-info'>
        <div className='bi-block-info__table'>
          <div className='bi-block-info__row'>
            <div className='bi-block-info__cell bi-block-info__cell--header'>
              <FormattedMessage id='common.block.height'/>
            </div>
            
            <div className='bi-block-info__cell'>
              { this.props.block.header.height }
            </div>
          </div>
          
          <div className='bi-block-info__row'>
            <div className='bi-block-info__cell bi-block-info__cell--header'>
              <FormattedMessage id='common.block.age'/>
            </div>
            
            <div className='bi-block-info__cell'>
              { this.props.block.header.timestamp }
            </div>
          </div>
          
          <div className='bi-block-info__row'>
            <div className='bi-block-info__cell bi-block-info__cell--header'>
              <FormattedMessage id='common.block.hash'/>
            </div>
            
            <div className='bi-block-info__cell'>
              { this.props.block.header.id }
            </div>
          </div>
          
          <div className='bi-block-info__row'>
            <div className='bi-block-info__cell bi-block-info__cell--header'>
              <FormattedMessage id='common.block.nonce'/>
            </div>
            
            <div className='bi-block-info__cell'>
              { this.props.block.header.nonce }
            </div>
          </div>
        </div>
      </div>
    );
  }
}
