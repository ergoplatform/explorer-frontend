import * as dayjs from 'dayjs';
import * as React from 'react';
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

import { convertInfoItemValue } from '../../../utils/convertInfoItemvalue';
import { formatNumberMetricPrefix } from '../../../utils/formatNumberMetricPrefix';

interface IAreaChartProps {
  data: any;
  compact?: boolean;
}

export class AreaChartComponent extends React.PureComponent<IAreaChartProps> {
  constructor (props: any) {
    super(props);
    
    this.formatLabel   = this.formatLabel.bind(this);
    this.formatXLabel  = this.formatXLabel.bind(this);
    this.formatTooltip = this.formatTooltip.bind(this);
  }
  
  render (): JSX.Element {
    const max = Math.max.apply(null, this.props.data.map((item: any) => item.value));
  
    const maxDomain = (Math.ceil(max / Math.pow(10, (max.toString().length - 1))) + 2) * Math.pow(10, ((max).toString().length - 1));
  
  
    return (
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
      
          { this.props.compact ? null : <CartesianGrid stroke='#eee' vertical={ false } strokeDasharray='2 2' fill='#fff'/> }
      
          <XAxis dataKey='timestamp'
                 tick={ { fill: '#828795', fontSize: 14 } }
                 tickCount={ 100 }
                 tickMargin={ 10 }
                 tickFormatter={ this.formatXLabel }
                 minTickGap={ 30 }
                 hide={ this.props.compact }/>
      
          <YAxis dataKey='value'
                 domain={ [0, maxDomain] }
                 tickMargin={ 10 }
                 tickCount={ 5 }
                 minTickGap={ 30 }
                 tick={ { fill: '#828795', fontSize: 14 } }
                 tickFormatter={ this.formatLabel }
                 hide={ this.props.compact }/>
      
          <Tooltip formatter={ this.formatTooltip }/>
      
          <Area type='monotone'
                dataKey='value'
                stroke='#0078FF'
                yAxisId={ 0 }
                fillOpacity={ 1 }
                fill={ 'url(#colorUv)' }
                isAnimationActive={ !this.props.compact }/>
        </AreaChart>
      </ResponsiveContainer>
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
