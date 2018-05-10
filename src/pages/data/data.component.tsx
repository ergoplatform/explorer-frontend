import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import './data.scss';

import { BlockActions } from '../../actions/block.actions';
import { BlocksState } from '../../reducers/blocks.reducer';
import { AppState } from '../../store/app.store';

import BlocksTableComponent from '../../components/blocks-table/blocks-table.component';
import PaginateComponent from '../../components/common/paginate/paginate.component';

class DataComponent extends React.PureComponent {
  props: BlocksState & BlockActions;
  
  constructor (props: any) {
    super(props);
    
    this.onPageChange = this.onPageChange.bind(this);
  }
  
  componentDidMount (): void {
    this.props.getBlocks({
      limit: this.props.limit,
      offset: 0
    });
  }
  
  // TODO: add preloader
  render (): JSX.Element {
    return (
      <div className='bi-data g-flex-column'>
        <div className='bi-data__body g-flex-column__item'>
          <BlocksTableComponent blocks={ this.props.blocks } isFetching={ this.props.fetching }/>
        </div>
        
        
        <div className='bi-data__footer g-flex-column__item-fixed g-flex'>
          <PaginateComponent limit={ this.props.limit }
                             total={ this.props.total }
                             onPageChange={ this.onPageChange }/>
        </div>
      </div>
    );
  }
  
  
  private onPageChange (page: number): void {
    this.props.getBlocks({
      limit: this.props.limit,
      offset: this.props.limit * page
    });
  }
}

function mapStateToProps (state: AppState): BlocksState {
  return state.blocks;
}

function mapDispatchToProps (dispatch: any): any {
  return bindActionCreators(BlockActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(DataComponent);
