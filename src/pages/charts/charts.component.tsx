import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { StatsState } from '../../reducers/stats.reducer';
import { AppState } from '../../store/app.store';

import { StatsActions } from '../../actions/stats.actions';

import { StatsItemComponent } from '../../components/stats-item/stats-item.component';

import './charts.scss';

class Charts extends React.PureComponent<StatsActions & StatsState> {
  componentDidMount (): void {
    this.props.getStatsInfo();
  }
  
  render (): JSX.Element {
    return (
      <div className='bi-charts'>
        <div className='bi-charts__header'>
          <div className='bi-charts__title'>
            Charts
          </div>
        </div>
        
        <div className='bi-charts__body'>
          { this.props.info ? this.renderBody() : null }
        </div>
      </div>
    );
  }
  
  private renderBody (): JSX.Element {
    return (
      <div className='bi-charts__line'>
        {
          this.props.info.map((stats, index) => {
            return <StatsItemComponent key={ index } title={ stats.title } value={ stats.value }/>;
          })
        }
      </div>
    );
  }
}

function mapStateToProps (state: AppState): StatsState {
  return state.stats;
}

function mapDispatchToProps (dispatch: any): any {
  return bindActionCreators(StatsActions, dispatch);
}

export const ChartsComponent = connect(mapStateToProps, mapDispatchToProps)(Charts);
