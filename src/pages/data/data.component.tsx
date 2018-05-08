import * as React from 'react';
import * as ReactPaginate from 'react-paginate';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import './data.scss';

import { BlockActions } from '../../actions/block.actions';
import { BlocksState } from '../../reducers/blocks.reducer';
import { AppState } from '../../store/app.store';

import BlockTableComponent from '../../components/block-table/block-table.component';

class DataComponent extends React.PureComponent {
  props: BlocksState & BlockActions;
  
  componentDidMount (): void {
    this.props.getBlocks();
  }
  
  // TODO: add preloader
  render (): JSX.Element {
    return (
      <div className='bi-home'>
        { this.props.fetching ? null : this.renderBlockTable() }
      </div>
    );
  }
  
  private renderBlockTable (): JSX.Element {
    return (
      <div className='bi-home__wrapper g-flex-column'>
        <div className='bi-home__body g-flex-column__item'>
          <BlockTableComponent blocks={ this.props.blocks }/>
        </div>
        
        <div className='bi-home__footer g-flex-column__item-fixed g-flex'>
          <ReactPaginate containerClassName='bi-paginate g-flex'
                         pageClassName='bi-paginate__item g-flex g-flex__item-fixed'
                         pageLinkClassName='bi-paginate__item-link g-flex__item-fixed'
                         breakClassName='bi-paginate__break'
                         previousClassName='bi-paginate__prev'
                         nextClassName='bi-paginate__next'
                         activeClassName='bi-paginate__item--selected'
                         pageCount={ Math.ceil(this.props.total / this.props.limit) }
                         pageRangeDisplayed={ 5 }
                         marginPagesDisplayed={ 1 }/>
        </div>
      </div>
    );
  }
}

function mapStateToProps (state: AppState): BlocksState {
  return state.blocks;
}

function mapDispatchToProps (dispatch: any): any {
  return bindActionCreators(BlockActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(DataComponent);
