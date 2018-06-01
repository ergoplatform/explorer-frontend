import * as classnames from 'classnames';
import * as dayjs from 'dayjs';
import * as queryString from 'query-string';
import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { bindActionCreators } from 'redux';

import { ChartState } from '../../reducers/chart.reducer';
import { AppState } from '../../store/app.store';

import { ChartActions } from '../../actions/chart.actions';

import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

import { formatNumberMetricPrefix } from '../../utils/formatNumberMetricPrefix';

import './chart.scss';

class Chart extends React.PureComponent {
  props: RouteComponentProps<{
    chartType: string
  }> & ChartState & ChartActions;
  
  constructor (props: any) {
    super(props);
    
    this.formatLabel  = this.formatLabel.bind(this);
    this.formatXLabel = this.formatXLabel.bind(this);
  }
  
  componentDidMount (): void {
    this.props.getChart(this.props.match.params.chartType);
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
        <div className='bi-chart__header g-flex-column__item-fixed'>
          <div className='bi-chart__title'>
            <FormattedMessage id={ `components.chart.title.${this.props.match.params.chartType}` }/>
          </div>
        </div>
        
        { (this.props.data && !this.props.fetching) ? this.renderBody() : null }
      </div>
    );
  }
  
  private renderBody (): JSX.Element {
    const { iframe } = queryString.parse(this.props.location.search);
    
    return (
      <div className='bi-chart__body g-flex-column__item'>
        <ResponsiveContainer width={ '100%' } height={ '100%' }>
          <AreaChart
            data={ this.props.data }
          >
            
            <defs>
              <linearGradient id='colorUv' x1='0' y1='0' x2='1' y2='1'>
                <stop offset='5%' stopColor='#0078FF' stopOpacity={ 0.4 }/>
                <stop offset='95%' stopColor='#0078FF' stopOpacity={ 0 }/>
              </linearGradient>
            </defs>
            
            { iframe ? null : <CartesianGrid stroke='#eee' vertical={ false } strokeDasharray='2 2' fill='#fff'/> }
            
            <XAxis dataKey='timestamp'
                   tickCount={ 100 }
                   tickFormatter={ this.formatXLabel }
                   minTickGap={ 30 }
                   hide={ !!iframe }/>
            
            <YAxis dataKey='value' tickFormatter={ this.formatLabel } hide={ !!iframe }/>
            
            <Tooltip/>
            
            <Area type='monotone'
                  dataKey='value'
                  stroke='#0078FF'
                  yAxisId={ 0 }
                  fillOpacity={ 1 }
                  fill={ 'url(#colorUv)' }
                  isAnimationActive={ !iframe }/>
          </AreaChart>
        </ResponsiveContainer>
      </div>
    );
  }
  
  private formatLabel (value: number): string {
    return formatNumberMetricPrefix(value);
  }
  
  private formatXLabel (value: number): string {
    return dayjs(value)
      .format('DD MMM YYYY');
  }
}


function mapStateToProps (state: AppState): ChartState {
  return state.chart;
}

function mapDispatchToProps (dispatch: any): any {
  return bindActionCreators(ChartActions, dispatch);
}

export const ChartComponent = connect(mapStateToProps, mapDispatchToProps)(Chart);
