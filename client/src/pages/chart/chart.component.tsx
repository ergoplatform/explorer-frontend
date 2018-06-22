import * as classnames from 'classnames';
import * as queryString from 'query-string';
import * as React from 'react';
import Helmet from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { bindActionCreators } from 'redux';

import { TIMESPAN } from '../../constants/timespan.constant';

import { ChartState } from '../../reducers/chart.reducer';
import { AppState } from '../../store/app.store';

import { ChartActions } from '../../actions/chart.actions';

import { AreaChartComponent } from '../../components/charts/area-chart/area-chart.component';
import { ChartActionsComponent } from '../../components/charts/chart-actions/chart-actions.component';
import { TimespanComponent } from '../../components/charts/timespan/timespan.component';

import './chart.scss';

class Chart extends React.PureComponent {
  props: RouteComponentProps<{
    chartType: string
  }> & ChartState & ChartActions;
  
  params: any = {};
  
  constructor (props: any) {
    super(props);
    
    this.getTimespanUrl    = this.getTimespanUrl.bind(this);
    this.getChartActionUrl = this.getChartActionUrl.bind(this);
  }
  
  componentDidMount (): void {
    this.params = this.getParams();
    
    this.props.getChart(this.props.match.params.chartType, this.params);
  }
  
  componentWillReceiveProps (props: any): void {
    const params = this.getParams();
    
    if (JSON.stringify(params) !== JSON.stringify(this.params)) {
      this.params = params;
      
      this.props.getChart(this.props.match.params.chartType, this.params);
    }
  }
  
  render (): JSX.Element {
    const { iframe } = queryString.parse(this.props.location.search);
    
    const chartClassNames = classnames({
      'bi-chart': true,
      'bi-chart--iframe': iframe,
      'g-flex-column': true
    });
    
    return (
      <div className={ chartClassNames }>
        <FormattedMessage id={ `common.pages.chart.title.${this.props.match.params.chartType}` }>
          {
            title => (
              <Helmet>
                <title>{ title }</title>
              </Helmet>
            )
          }
        </FormattedMessage>
        
        <div className='bi-chart__header g-flex-column__item-fixed'>
          <div className='bi-chart__title'>
            <FormattedMessage id={ `components.chart.title.${this.props.match.params.chartType}` }/>
          </div>
        </div>
        
        { this.renderBody() }
      </div>
    );
  }
  
  private renderBody (): JSX.Element {
    const { iframe } = queryString.parse(this.props.location.search);
    
    return (
      <div className='bi-chart__body g-flex-column__item'>
        <div className='bi-chart__chart'>
          { this.props.data && <AreaChartComponent data={ this.formatData() } compact={ !!iframe }/> }
        </div>
        
        <div className='bi-chart__controls g-flex'>
          <TimespanComponent selected={ this.params.timespan }
                             getTimespanUrl={ this.getTimespanUrl }/>
          
          <ChartActionsComponent
            getChartActionUrl={this.getChartActionUrl}/>
        </div>
      </div>
    );
  }
  
  private formatData (): any {
    switch (this.props.match.params.chartType) {
      case 'total': {
        return this.props.data.map((item: any) => {
          return {
            timestamp: item.timestamp,
            type: 'coin',
            value: item.value / 1e8
          };
        });
      }
      
      case 'blockchain-size':
      case 'block-size': {
        return this.props.data.map((item: any) => {
          return {
            timestamp: item.timestamp,
            type: 'bytes',
            value: item.value
          };
        });
      }
      
      default: {
        return this.props.data;
      }
    }
  }
  
  private getParams (): any {
    const params = queryString.parse(this.props.history.location.search);
    
    const validTimespan = Object.keys(TIMESPAN)
      .find((key: string) => {
        return TIMESPAN[key] === params.timespan;
      });
    
    return {
      timespan: validTimespan ? TIMESPAN[validTimespan] : TIMESPAN.DAYS_30
    };
  }
  
  private getTimespanUrl (span: TIMESPAN): string {
    const params = queryString.parse(this.props.history.location.search);
    
    params.timespan = span;
    
    return `${this.props.location.pathname}?${queryString.stringify(params)}`;
  }
  
  
  private getChartActionUrl (param: string, value: string | number): string {
    const params = queryString.parse(this.props.history.location.search);
    
    params[param] = value;
    
    return `${this.props.location.pathname}?${queryString.stringify(params)}`;
  }
}


function mapStateToProps (state: AppState): ChartState {
  return state.chart;
}

function mapDispatchToProps (dispatch: any): any {
  return bindActionCreators(ChartActions, dispatch);
}

export const ChartComponent = connect(mapStateToProps, mapDispatchToProps)(Chart);
