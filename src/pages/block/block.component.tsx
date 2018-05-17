import * as React from 'react';
import { connect } from 'react-redux';
import { Redirect, Route, RouteComponentProps, Switch } from 'react-router';
import { ActionCreatorsMapObject, bindActionCreators } from 'redux';

import { AppState } from '../../store/app.store';

import { BlockActions } from '../../actions/block.actions';
import { BlockState } from '../../reducers/block.reducer';

import { BlockAdproofsComponent } from '../../components/block/block-adproofs/block-adproofs.component';
import { BlockHeaderComponent } from '../../components/block/block-header/block-header.component';
import { BlockInfoComponent } from '../../components/block/block-info/block-info.component';
import { BlockTransactionsComponent } from '../../components/block/block-transactions/block-transactions.component';

import './block.scss';

class Block extends React.Component {
  props: {
    page: number;
  } & RouteComponentProps<{ id: string }> & BlockState & BlockActions;
  
  constructor (props: any) {
    super(props);
    
    this.renderComponent = this.renderComponent.bind(this);
  }
  
  componentDidMount (): void {
    this.props.getBlock({ id: this.props.match.params.id });
  }
  
  render (): JSX.Element {
    return (
      <div className='bi-block g-flex-column__item'>
        { this.props.fetching ? null : this.renderBlockPage() }
      </div>
    );
  }
  
  private renderBlockPage (): JSX.Element {
    if (!this.props.block) {
      return (
        <Redirect to='/'/>
      );
    }
    
    return (
      <div className='bi-block__wrapper g-flex-column'>
        <div className='bi-block__header g-flex-column__item-fixed'>
          <BlockHeaderComponent block={ this.props.block }
                                previousPage={ this.props.page }
                                references={ this.props.references }/>
        </div>
        
        <div className='bi-block__body g-flex-column__item g-scroll-y'>
          <Switch>
            <Route path={ `/blocks/:id` }
                   exact={ true }
                   render={
                     this.renderComponent(<BlockInfoComponent block={ this.props.block }/>)
                   }/>
            
            <Route path={ `/blocks/:id/transactions` }
                   exact={ true }
                   component={
                     this.renderComponent(<BlockTransactionsComponent block={ this.props.block }/>)
                   }/>
            
            <Route path={ `/blocks/:id/adproofs` }
                   exact={ true }
                   component={
                     this.renderComponent(<BlockAdproofsComponent block={ this.props.block }/>)
                   }/>
          </Switch>
        </div>
      </div>
    );
  }
  
  private renderComponent (element: JSX.Element): () => JSX.Element {
    return () => element;
  }
}

function mapStateToProps (state: AppState): BlockState & {
  page: number;
} {
  return {
    ...state.block,
    page: state.blocks.offset / state.settings.blocksLimit
  };
}

function mapDispatchToProps (dispatch: any): ActionCreatorsMapObject {
  return bindActionCreators(BlockActions, dispatch);
}

export const BlockComponent = connect(mapStateToProps, mapDispatchToProps)(Block);
