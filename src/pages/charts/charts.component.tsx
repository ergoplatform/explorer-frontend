import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
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
      <div className='bi-charts g-flex-column'>
        <div className='bi-charts__header g-flex-column__item-fixed'>
          <div className='bi-charts__title'>
            Charts
          </div>
        </div>
        
          { this.props.info ? this.renderBody() : null }
      </div>
    );
  }
  
  private renderBody (): JSX.Element {
    return (
      <div className='bi-charts__body g-flex-column g-flex-column__item'>
        <div className='bi-charts__stats g-flex-column__item-fixed g-flex'>
          {
            this.props.info.map((stats, index) => {
              return <StatsItemComponent key={ index } title={ stats.title } value={ stats.value }/>;
            })
          }
        </div>
        
        <div className='bi-charts__charts-wrapper g-flex-column__item'>
          <div className='bi-charts__title'>
            Statistics
          </div>
          
          <div className='bi-charts__charts g-flex'>
            <Link to={'/charts/total'} className='bi-charts__chart g-flex__item-fixed'>
              Total coins per date
              
              <iframe src='/charts/total?iframe=true' className='bi-charts__iframe'/>
            </Link>
  
            <Link to={'/charts/block-size'} className='bi-charts__chart g-flex__item-fixed'>
              Average block size
  
              <iframe src='/charts/block-size?iframe=true' className='bi-charts__iframe'/>
            </Link>
          </div>
        </div>
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
