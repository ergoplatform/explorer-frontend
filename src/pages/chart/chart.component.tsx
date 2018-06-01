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

import { convertInfoItemValue } from '../../utils/convertInfoItemvalue';
import { formatNumberMetricPrefix } from '../../utils/formatNumberMetricPrefix';

import './chart.scss';

// TODO: move chart to separate component
class Chart extends React.PureComponent {
  props: RouteComponentProps<{
    chartType: string
  }> & ChartState & ChartActions;
  
  constructor (props: any) {
    super(props);
    
    this.formatLabel   = this.formatLabel.bind(this);
    this.formatXLabel  = this.formatXLabel.bind(this);
    this.formatTooltip = this.formatTooltip.bind(this);
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
    
    const max = Math.max.apply(null, this.props.data.map((item: any) => item.value));
    
    const maxDomain = (Math.ceil(max / Math.pow(10, (max.toString().length - 1))) + 2) * Math.pow(10, ((max).toString().length - 1));
    
    return (
      <div className='bi-chart__body g-flex-column__item'>
        <div className='bi-chart__chart'>
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
                     tick={ { fill: '#828795', fontSize: 14 } }
                     tickCount={ 100 }
                     tickMargin={ 10 }
                     tickFormatter={ this.formatXLabel }
                     minTickGap={ 30 }
                     hide={ !!iframe }/>
              
              <YAxis dataKey='value'
                     domain={ [0, maxDomain] }
                     tickMargin={ 10 }
                     tickCount={ 5 }
                     minTickGap={ 30 }
                     tick={ { fill: '#828795', fontSize: 14 } }
                     tickFormatter={ this.formatLabel }
                     hide={ !!iframe }/>
              
              <Tooltip formatter={ this.formatTooltip }/>
              
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
      </div>
    );
  }
  
  private formatLabel (value: number): string {
    return formatNumberMetricPrefix(value, { fractionDigits: 0 });
  }
  
  private formatXLabel (value: number): string {
    return dayjs(value)
      .format('DD MMM YYYY');
  }
  
  private formatTooltip (value: any): string {
    return convertInfoItemValue('chart', value);
  }
}


function mapStateToProps (state: AppState): ChartState {
  return state.chart;
}

function mapDispatchToProps (dispatch: any): any {
  return bindActionCreators(ChartActions, dispatch);
}

export const ChartComponent = connect(mapStateToProps, mapDispatchToProps)(Chart);
