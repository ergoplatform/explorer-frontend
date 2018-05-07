import * as React from 'react';
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
      <div className="bi-home">
        { this.props.fetching ? null : <BlockTableComponent blocks={ this.props.blocks }/> }
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
