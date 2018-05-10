import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { ActionCreatorsMapObject, bindActionCreators } from 'redux';

import { AppState } from '../../store/app.store';

import { BlockActions } from '../../actions/block.actions';
import { BlockState } from '../../reducers/block.reducer';

class BlockComponent extends React.Component {
  props: RouteComponentProps<{ id: string }> & BlockState & BlockActions;
  
  componentDidMount (): void {
    this.props.getBlock({ id: this.props.match.params.id });
  }
  
  render (): JSX.Element {
    return (
      <div>{ this.props.fetching ? null : this.props.block.header.id }</div>
    );
  }
}

function mapStateToProps (state: AppState): BlockState {
  return state.block;
}

function mapDispatchToProps (dispatch: any): ActionCreatorsMapObject {
  return bindActionCreators(BlockActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(BlockComponent);
