import * as React from 'react';

import { FullBlock } from '../../../models/generated/fullBlock';

import './block-adproofs.scss';

interface IBlockAdproofsProps {
  block: FullBlock;
}

export class BlockAdproofsComponent extends React.PureComponent<IBlockAdproofsProps> {
  render (): JSX.Element {
    return (
      <div className='bi-block-adproofs g-flex-column'>
        <div className='bi-block-adproofs__header g-flex-column__item-fixed'>
          { this.props.block.adProofs.headerId }
        </div>
        
        <div className='bi-block-adproofs__body g-flex-column__item'>
          { this.props.block.adProofs.proofBytes }
        </div>
      </div>
    );
  }
}
