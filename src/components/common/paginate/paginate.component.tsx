import * as React from 'react';
import * as ReactPaginate from 'react-paginate';

interface IPaginateProps {
  total: number;
  limit: number;
}

import './paginate.scss';

class PaginateComponent extends React.Component {
  props: IPaginateProps;
  
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
                     pageCount={ pageCount }
                     pageRangeDisplayed={ 5 }
                     marginPagesDisplayed={ 1 }/>
    );
  }
}

export default PaginateComponent;
