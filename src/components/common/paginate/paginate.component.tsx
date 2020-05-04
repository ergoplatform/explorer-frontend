import React from 'react';
import { FormattedMessage } from 'react-intl';
import ReactPaginate from 'react-paginate';

interface IPaginateProps {
  total: number;
  limit: number;
  forcePage?: number;
  onPageChange: (selected: number) => void;
}

import './paginate.scss';

export class PaginateComponent extends React.PureComponent<IPaginateProps> {
  constructor(props: any) {
    super(props);

    this.onPageChange = this.onPageChange.bind(this);
  }

  render(): JSX.Element {
    const pageCount = Math.ceil(this.props.total / this.props.limit);

    return (
      <ReactPaginate
        containerClassName="bi-paginate g-flex"
        pageClassName="bi-paginate__item g-flex g-flex__item-fixed"
        pageLinkClassName="bi-paginate__item-link g-flex__item-fixed"
        breakClassName="bi-paginate__break"
        previousClassName="bi-paginate__prev"
        nextClassName="bi-paginate__next"
        activeClassName="bi-paginate__item--selected"
        previousLabel={<FormattedMessage id="components.paginate.prev" />}
        nextLabel={<FormattedMessage id="components.paginate.next" />}
        onPageChange={this.onPageChange}
        pageCount={pageCount}
        forcePage={this.props.forcePage || 0}
        disableInitialCallback={true}
        pageRangeDisplayed={5}
        marginPagesDisplayed={1}
      />
    );
  }

  private onPageChange({ selected }: { selected: number }): void {
    this.props.onPageChange(selected);
  }
}
