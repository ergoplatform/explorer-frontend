import * as React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import * as ReactPaginate from 'react-paginate';

interface IPaginateProps {
  total: number;
  limit: number;
  initialPage?: number;
  onPageChange: (selected: number) => void;
}

import './paginate.scss';

class PaginateComponent extends React.PureComponent {
  props: InjectedIntlProps & IPaginateProps;
  
  constructor (props: any) {
    super(props);
    
    this.onPageChange = this.onPageChange.bind(this);
  }
  
  render (): JSX.Element {
    const pageCount = Math.ceil(this.props.total / this.props.limit);
    
    return (
      <ReactPaginate containerClassName='bi-paginate g-flex'
                     pageClassName='bi-paginate__item g-flex g-flex__item-fixed'
                     pageLinkClassName='bi-paginate__item-link g-flex__item-fixed'
                     breakClassName='bi-paginate__break'
                     previousClassName='bi-paginate__prev'
                     nextClassName='bi-paginate__next'
                     activeClassName='bi-paginate__item--selected'
                     previousLabel={ this.props.intl.formatMessage({ id: 'components.paginate.prev' }) }
                     nextLabel={ this.props.intl.formatMessage({ id: 'components.paginate.next' }) }
                     onPageChange={ this.onPageChange }
                     pageCount={ pageCount }
                     initialPage={ this.props.initialPage || 0 }
                     disableInitialCallback={ true }
                     pageRangeDisplayed={ 5 }
                     marginPagesDisplayed={ 1 }/>
    );
  }
  
  private onPageChange ({ selected }: { selected: number }): void {
    this.props.onPageChange(selected);
  }
}

export default injectIntl<IPaginateProps>(PaginateComponent);
