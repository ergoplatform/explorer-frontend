import * as React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { Link } from 'react-router-dom';

interface IBlockHeaderProps {
  block: any;
  references: any;
}

import { ArrowIcon } from '../../common/icons/common.icons';

import './block-header.scss';

class BlockHeaderComponent extends React.PureComponent {
  props: IBlockHeaderProps & InjectedIntlProps;
  
  render (): JSX.Element {
    return (
      <div className='bi-block-header g-flex'>
        <div className='bi-block-header__title g-flex__item-fixed'>
          { this.props.intl.formatMessage({ id: 'common.block.block' }) } #{ this.props.block.header.height }
        </div>
        
        <div className='bi-block-header__navigation g-flex__item-fixed'>
          {
            this.props.references.previousId ?
              <Link className='bi-block-header__navigation-btn bi-block-header__navigation-btn--prev'
                    to={ `/blocks/${this.props.references.previousId}` }>
                <ArrowIcon className='bi-block-header__navigation-btn-icon'/>
              </Link> : null
          }
          
          {
            this.props.references.nextId ?
              <Link className='bi-block-header__navigation-btn bi-block-header__navigation-btn--next'
                    to={ `/blocks/${this.props.references.nextId}` }>
                <ArrowIcon className='bi-block-header__navigation-btn-icon'/>
              </Link> : null
          }
        </div>
      </div>
    );
  }
}

export default injectIntl<IBlockHeaderProps>(BlockHeaderComponent);
