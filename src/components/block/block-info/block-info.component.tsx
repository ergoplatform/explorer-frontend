import * as React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';

import { FullBlock } from '../../../models/generated/fullBlock';

interface IBlockInfoProps {
  block: FullBlock;
}

import './block-info.scss';

class BlockInfo extends React.PureComponent {
  props: IBlockInfoProps & InjectedIntlProps;
  
  render (): JSX.Element {
    return (
      <div className='bi-block-info'>
        <div className='bi-block-info__table'>
          <div className='bi-block-info__row'>
            <div className='bi-block-info__cell bi-block-info__cell--header'>
              { this.props.intl.formatMessage({ id: 'common.block.height' }) }
            </div>
            
            <div className='bi-block-info__cell'>
              { this.props.block.header.height }
            </div>
          </div>
          
          <div className='bi-block-info__row'>
            <div className='bi-block-info__cell bi-block-info__cell--header'>
              { this.props.intl.formatMessage({ id: 'common.block.age' }) }
            </div>
            
            <div className='bi-block-info__cell'>
              { this.props.block.header.timestamp }
            </div>
          </div>
          
          <div className='bi-block-info__row'>
            <div className='bi-block-info__cell bi-block-info__cell--header'>
              { this.props.intl.formatMessage({ id: 'common.block.hash' }) }
            </div>
            
            <div className='bi-block-info__cell'>
              { this.props.block.header.id }
            </div>
          </div>
          
          <div className='bi-block-info__row'>
            <div className='bi-block-info__cell bi-block-info__cell--header'>
              { this.props.intl.formatMessage({ id: 'common.block.nonce' }) }
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

export const BlockInfoComponent = injectIntl<IBlockInfoProps>(BlockInfo);
