import * as React from 'react';
import {FormattedMessage} from 'react-intl';

import './paginate-simple.scss';

import { ArrowIcon, DoubleArrowIcon } from '../icons/common.icons';


interface IPaginateSimpleProps {
  total: number;
  limit: number;
  forcePage: number;
  onPageChange: (selected: number) => void;
}

export class PaginateSimpleComponent extends React.PureComponent<IPaginateSimpleProps> {
  constructor (props: IPaginateSimpleProps) {
    super(props);
    
    this.setPage = this.setPage.bind(this);
  }
  
  render (): JSX.Element | null {
    const pageCount = Math.ceil(this.props.total / this.props.limit);
    
    if (!pageCount) {
      return null;
    }
    
    return (
      <div className='bi-paginate-simple'>
        <button className='bi-paginate-simple__btn bi-paginate-simple__btn--prev  bi-btn bi-btn--flat'
                disabled={ this.props.forcePage === 0 }
                onClick={ this.setPage(0) }>
          <DoubleArrowIcon className='bi-paginate-simple__btn-icon'/>
        </button>
        
        <button className='bi-paginate-simple__btn bi-paginate-simple__btn--prev bi-btn--flat'
                disabled={ this.props.forcePage === 0 }
                onClick={ this.setPage(this.props.forcePage - 1) }>
          <ArrowIcon className='bi-paginate-simple__btn-icon'/>
        </button>
        
        <span className='bi-paginate-simple__status'>
          <FormattedMessage id='components.paginate-simple.page-of' values={{current: this.props.forcePage + 1, total: pageCount }}/>
        </span>
        
        <button className='bi-paginate-simple__btn bi-paginate-simple__btn--next bi-btn--flat'
                disabled={ this.props.forcePage === pageCount - 1 }
                onClick={ this.setPage(this.props.forcePage + 1) }>
          <ArrowIcon className='bi-paginate-simple__btn-icon'/>
        </button>
        
        <button className='bi-paginate-simple__btn bi-paginate-simple__btn--next bi-btn--flat'
                disabled={ this.props.forcePage === pageCount - 1 }
                onClick={ this.setPage(pageCount - 1) }>
          <DoubleArrowIcon className='bi-paginate-simple__btn-icon'/>
        </button>
      </div>
    );
  }
  
  private setPage (page: number): () => void {
    return () => {
      this.props.onPageChange(page);
    };
  }
}

