import * as React from 'react';


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
  
  render (): JSX.Element {
    const pageCount = Math.ceil(this.props.total / this.props.limit);
    
    return (
      <div className='bi-paginate-simple'>
        <button className='bi-paginate-simple__first'
                onClick={ this.setPage(0) }>
          { '<< ' }
        </button>
        <button className='bi-paginate-simple__prev'
                onClick={ this.setPage(this.props.forcePage - 1) }>
          { '< ' }
        </button>
        
        Page { this.props.forcePage } of { pageCount }
        
        <button className='bi-paginate-simple__next'
                onClick={ this.setPage(this.props.forcePage + 1) }>
          { '> ' }
        </button>
        <button className='bi-paginate-simple__next'
                onClick={ this.setPage(pageCount) }>
          { '>> ' }
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

