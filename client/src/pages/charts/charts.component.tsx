import * as React from 'react';
import Helmet from 'react-helmet';
import { FormattedMessage } from 'react-intl';
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
            <Link to={ '/charts/total' } className='bi-charts__chart'>
              <FormattedMessage id='components.chart.title.total'/>
  
              <iframe src='/charts/total?iframe=true'
                      className='bi-charts__iframe'
                      frameBorder='0'
                      scrolling='no'
                      tabIndex={ -1 }/>
            </Link>
          </div>
        </div>
        <div className='bi-charts__charts-wrapper g-flex-column__item'>
          <div className='bi-charts__title'>
            <FormattedMessage id='components.charts.block-details'/>
          </div>
    
          <div className='bi-charts__charts'>
            <Link to={ '/charts/block-size' } className='bi-charts__chart'>
              <FormattedMessage id='components.chart.title.block-size'/>
  
              <iframe src='/charts/block-size?iframe=true'
                      className='bi-charts__iframe'
                      frameBorder='0'
                      scrolling='no'
                      tabIndex={ -1 }/>
            </Link>
      
            <Link to={ '/charts/blockchain-size' } className='bi-charts__chart'>
              <FormattedMessage id='components.chart.title.blockchain-size'/>
  
              <iframe src='/charts/blockchain-size?iframe=true' className='bi-charts__iframe' frameBorder='0'
                      scrolling='no' tabIndex={ -1 }/>
            </Link>
      
            <Link to={ '/charts/transactions-per-block' } className='bi-charts__chart'>
              <FormattedMessage id='components.chart.title.transactions-per-block'/>
  
              <iframe src='/charts/transactions-per-block?iframe=true'
                      className='bi-charts__iframe'
                      frameBorder='0'
                      scrolling='no'
                      tabIndex={ -1 }/>
            </Link>
    
          </div>
        </div>
        
        <div className='bi-charts__charts-wrapper g-flex-column__item'>
          <div className='bi-charts__title'>
            <FormattedMessage id='components.charts.mining-information'/>
          </div>
          
          <div className='bi-charts__charts'>
            <Link to={ '/charts/hash-rate' } className='bi-charts__chart'>
              <FormattedMessage id='components.chart.title.hash-rate'/>
  
  
              <iframe src='/charts/hash-rate?iframe=true'
                      className='bi-charts__iframe'
                      frameBorder='0'
                      scrolling='no'
                      tabIndex={ -1 }/>
            </Link>
  
  
            <Link to={ '/charts/difficulty' } className='bi-charts__chart'>
              <FormattedMessage id='components.chart.title.difficulty'/>
  
              <iframe src='/charts/difficulty?iframe=true'
                      className='bi-charts__iframe'
                      frameBorder='0'
                      scrolling='no'
                      tabIndex={ -1 }/>
            </Link>
            
            <Link to={ '/charts/miners-revenue' } className='bi-charts__chart'>
              <FormattedMessage id='components.chart.title.miners-revenue'/>
  
              <iframe src='/charts/miners-revenue?iframe=true'
                      className='bi-charts__iframe'
                      frameBorder='0'
                      scrolling='no' tabIndex={ -1 }/>
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
