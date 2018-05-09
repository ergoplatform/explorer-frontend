import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import './data.scss';

import { BlockActions } from '../../actions/block.actions';
import { BlocksState } from '../../reducers/blocks.reducer';
import { AppState } from '../../store/app.store';

import BlockTableComponent from '../../components/block-table/block-table.component';
import PaginateComponent from '../../components/common/paginate/paginate.component';

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
          <PaginateComponent limit={ this.props.limit } total={ this.props.total }/>
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
