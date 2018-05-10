import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { ActionCreatorsMapObject, bindActionCreators } from 'redux';

import { AppState } from '../../store/app.store';

import { BlockActions } from '../../actions/block.actions';
import { BlockState } from '../../reducers/block.reducer';

import BlockHeaderComponent from '../../components/block/block-header/block-header.component';
import BlockInfoComponent from '../../components/block/block-info/block-info.component';

import './block.scss';

class BlockComponent extends React.Component {
  props: RouteComponentProps<{ id: string }> & BlockState & BlockActions;
  
  componentDidMount (): void {
    this.props.getBlock({ id: this.props.match.params.id });
  }
  
  render (): JSX.Element {
    return (
      <div className='bi-block'>
        { this.props.fetching ? null : this.renderBlockPage() }
      </div>
    );
  }
  
  private renderBlockPage (): JSX.Element {
    return (
      <div className='bi-block__wrapper'>
        <div className='bi-block__header'>
          <BlockHeaderComponent block={ this.props.block }
                                references={ this.props.references }/>
        </div>
        
        <div className='bi-block__body'>
          <BlockInfoComponent block={ this.props.block }/>
        </div>
      </div>
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
