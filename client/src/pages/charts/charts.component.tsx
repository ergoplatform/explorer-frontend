import * as React from 'react';
import Helmet from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { StatsState } from '../../reducers/stats.reducer';
import { AppState } from '../../store/app.store';

import { StatsActions } from '../../actions/stats.actions';

import { ChartsPreviewComponent } from '../../components/charts/charts-preview/charts-preview.component';
import { StatsItemComponent } from '../../components/stats-item/stats-item.component';

import './charts.scss';

class Charts extends React.PureComponent<StatsActions & StatsState> {
  componentDidMount (): void {
    this.props.getStatsInfo();
  }
  
  render (): JSX.Element {
    return (
      <div className='bi-charts g-flex-column'>
        <FormattedMessage id='common.pages.charts.title'>
          {
            title => (
              <Helmet>
                <title>{ title }</title>
              </Helmet>
            )
          }
        </FormattedMessage>
        
        <div className='bi-charts__header g-flex-column__item-fixed'>
          <div className='bi-charts__title'>
            <FormattedMessage id='components.charts.title'/>
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
            <FormattedMessage id='components.charts.currency-statistics'/>
          </div>
    
          <div className='bi-charts__charts'>
            <ChartsPreviewComponent chartType='total'/>
          </div>
        </div>
        <div className='bi-charts__charts-wrapper g-flex-column__item'>
          <div className='bi-charts__title'>
            <FormattedMessage id='components.charts.block-details'/>
          </div>
    
          <div className='bi-charts__charts'>
            <ChartsPreviewComponent chartType='blockchain-size'/>
            
            <ChartsPreviewComponent chartType='block-size'/>
            
            <ChartsPreviewComponent chartType='transactions-per-block'/>
          </div>
        </div>
        
        <div className='bi-charts__charts-wrapper g-flex-column__item'>
          <div className='bi-charts__title'>
            <FormattedMessage id='components.charts.mining-information'/>
          </div>
          
          <div className='bi-charts__charts'>
            <ChartsPreviewComponent chartType='hash-rate'/>
  
            <ChartsPreviewComponent chartType='difficulty'/>
            
            <ChartsPreviewComponent chartType='miners-revenue'/>
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
