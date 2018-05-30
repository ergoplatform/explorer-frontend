import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';

import { formatNumberMetricPrefix } from '../../../utils/formatNumberMetricPrefix';

import { FullBlock } from '../../../models/generated/fullBlock';

import { TimestampComponent } from '../../common/timestamp/timestamp.component';

interface IBlockInfoProps {
  block: FullBlock;
}

import './block-info.scss';

export class BlockInfoComponent extends React.Component<IBlockInfoProps> {
  render (): JSX.Element {
    return (
      <div className='bi-block-info'>
        <div className='bi-block-info__table bi-table'>
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
              <TimestampComponent timestamp={ this.props.block.header.timestamp }/>
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
              <FormattedMessage id='common.block.parent'/>
            </div>
            
            <div className='bi-block-info__cell'>
              <Link to={ `/blocks/${this.props.block.header.parentId}` }>
                { this.props.block.header.parentId }
              </Link>
            </div>
          </div>
          
          <div className='bi-block-info__row'>
            <div className='bi-block-info__cell bi-block-info__cell--header'>
              <FormattedMessage id='common.block.nonce'/>
            </div>
            
            <div className='bi-block-info__cell'>
              { this.props.block.header.extensionHash }
            </div>
          </div>
          
          <div className='bi-block-info__row'>
            <div className='bi-block-info__cell bi-block-info__cell--header'>
              <FormattedMessage id='common.block.version'/>
            </div>
            
            <div className='bi-block-info__cell'>
              { this.props.block.header.version }
            </div>
          </div>
          
          <div className='bi-block-info__row'>
            <div className='bi-block-info__cell bi-block-info__cell--header'>
              <FormattedMessage id='common.block.interlinks'/>
            </div>
            
            <div className='bi-block-info__cell'>
              { this.props.block.header.interlinks.join(' ') }
            </div>
          </div>
          
          <div className='bi-block-info__row'>
            <div className='bi-block-info__cell bi-block-info__cell--header'>
              <FormattedMessage id='common.block.adProofsRoot'/>
            </div>
            
            <div className='bi-block-info__cell'>
              { this.props.block.header.adProofsRoot }
            </div>
          </div>
          
          <div className='bi-block-info__row'>
            <div className='bi-block-info__cell bi-block-info__cell--header'>
              <FormattedMessage id='common.block.transactionsRoot'/>
            </div>
            
            <div className='bi-block-info__cell'>
              { this.props.block.header.transactionsRoot }
            </div>
          </div>
          
          <div className='bi-block-info__row'>
            <div className='bi-block-info__cell bi-block-info__cell--header'>
              <FormattedMessage id='common.block.stateRoot'/>
            </div>
            
            <div className='bi-block-info__cell'>
              { this.props.block.header.stateRoot }
            </div>
          </div>
          
          <div className='bi-block-info__row'>
            <div className='bi-block-info__cell bi-block-info__cell--header'>
              <FormattedMessage id='common.block.nBits'/>
            </div>
            
            <div className='bi-block-info__cell'>
              { this.props.block.header.nBits }
            </div>
          </div>
          
          <div className='bi-block-info__row'>
            <div className='bi-block-info__cell bi-block-info__cell--header'>
              <FormattedMessage id='common.block.votes'/>
            </div>
            
            <div className='bi-block-info__cell'>
              { this.props.block.header.votes }
            </div>
          </div>
          
          <div className='bi-block-info__row'>
            <div className='bi-block-info__cell bi-block-info__cell--header'>
              <FormattedMessage id='common.block.equihashSolutions'/>
            </div>
            
            <div className='bi-block-info__cell u-word-wrap'>
              { this.props.block.header.equihashSolutions }
            </div>
          </div>
          
          <div className='bi-block-info__row'>
            <div className='bi-block-info__cell bi-block-info__cell--header'>
              <FormattedMessage id='common.block.size'/>
            </div>
            
            <div className='bi-block-info__cell'>
              { formatNumberMetricPrefix(this.props.block.header.blockSize, 'k') }B
            </div>
          </div>
        </div>
      </div>
    );
  }
}
