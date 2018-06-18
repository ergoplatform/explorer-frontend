import * as React from 'react';
import Helmet from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import environment from '../../config/environment';

import { StatsState } from '../../reducers/stats.reducer';
import { AppState } from '../../store/app.store';

import { AppActions } from '../../actions/app.actions';
import { StatsActions } from '../../actions/stats.actions';

import './stats.scss';

import { BlockSummaryComponent } from '../../components/stats/block-summary/block-summary.component';

class Stats extends React.PureComponent<StatsActions & AppActions & StatsState> {
  componentDidMount (): void {
    if (this.props.preloaded) {
      this.props.clearPreloadedState();
      
      return;
    }
    
    this.props.getStats();
  }
  
  render (): JSX.Element {
    return (
      <div className='bi-stats'>
        <FormattedMessage id='common.pages.stats.title'>
          {
            title => (
              <Helmet>
                <title>{ title }</title>
              </Helmet>
            )
          }
        </FormattedMessage>
        
        <div className='bi-stats__header'>
          <div className='bi-stats__title'>
            { environment.blockchain.coinName } Stats
          </div>
        </div>
        
        <div className='bi-stats__body'>
          { this.props.stats ? this.renderBody() : null }
        </div>
      </div>
    );
  }
  
  private renderBody (): JSX.Element {
    return (
      <div className='bi-stats__line'>
        <div className='bi-stats__block-summary'>
          <BlockSummaryComponent summary={ this.props.stats.blockSummary }/>
        </div>
      </div>
    );
  }
}

function mapStateToProps (state: AppState): StatsState {
  return state.stats;
}

function mapDispatchToProps (dispatch: any): any {
  return bindActionCreators({...StatsActions, ...AppActions}, dispatch);
}

export const StatsComponent = connect(mapStateToProps, mapDispatchToProps)(Stats);
