import dayjs from 'dayjs';
import React from 'react';

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import { convertInfoItemValue } from '../../../utils/convertInfoItemvalue';
import { formatNumberMetricPrefix } from '../../../utils/formatNumberMetricPrefix';

import { ChartTooltipComponent } from '../chart-tooltip/chart-tooltip.component';

interface IAreaChartProps {
  data: any;
  compact?: boolean;
  isScale: boolean;
}

const VERY_SMALL_NUMBER = 0.0001;

export class AreaChartComponent extends React.PureComponent<IAreaChartProps> {
  constructor(props: any) {
    super(props);

    this.formatLabel = this.formatLabel.bind(this);
    this.formatXLabel = this.formatXLabel.bind(this);
    this.formatTooltip = this.formatTooltip.bind(this);
    this.renderTooltip = this.renderTooltip.bind(this);
  }

  render(): JSX.Element {
    let data = this.props.data;

    const max = Math.ceil(
      Math.max.apply(
        null,
        data.map((item: any) => item.value)
      )
    );

    const maxDomain =
      (Math.ceil(max / Math.pow(10, max.toString().length - 1)) + 2) *
      Math.pow(10, max.toString().length - 1);

    // Logarithmic scale doesn't support values under 0 or equal to 0
    if (this.props.isScale) {
      data = data.map((item: any) => {
        return {
          ...item,
          originalValue: item.value,
          value: item.value <= 0 ? VERY_SMALL_NUMBER : item.value,
        };
      });
    }

    return (
      <ResponsiveContainer width={'100%'} height={'100%'}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorUv" x1="0" y1="1" x2="1" y2="0">
              <stop offset="20%" stopColor="#0078FF" stopOpacity={0} />
              <stop offset="80%" stopColor="#0078FF" stopOpacity={0.2} />
            </linearGradient>
          </defs>

          {this.props.compact ? null : (
            <CartesianGrid
              stroke="#e8e8e8"
              vertical={false}
              strokeDasharray="6 4"
              fill="#fff"
            />
          )}

          <XAxis
            dataKey="timestamp"
            tick={{ fill: '#828795', fontSize: 14 }}
            tickLine={false}
            tickCount={100}
            tickMargin={10}
            tickFormatter={this.formatXLabel}
            minTickGap={30}
            hide={this.props.compact}
          />

          <YAxis
            dataKey="value"
            domain={[this.props.isScale ? VERY_SMALL_NUMBER : 0, maxDomain]}
            scale={this.props.isScale ? 'log' : 'auto'}
            tickMargin={10}
            tickLine={false}
            tickCount={5}
            minTickGap={30}
            tick={{ fill: '#828795', fontSize: 14 }}
            tickFormatter={this.formatLabel}
            hide={this.props.compact}
          />

          <Tooltip content={this.renderTooltip} />

          <Area
            type="linear"
            dataKey="value"
            stroke="#0078FF"
            yAxisId={0}
            fillOpacity={1}
            fill={'url(#colorUv)'}
            animationDuration={300}
            isAnimationActive={!this.props.compact}
          />
        </AreaChart>
      </ResponsiveContainer>
    );
  }

  private renderTooltip(props: any): JSX.Element {
    return <ChartTooltipComponent {...props} isScale={this.props.isScale} />;
  }

  private formatLabel(value: number): string {
    return formatNumberMetricPrefix(value, { fractionDigits: 0 });
  }

  private formatXLabel(value: number): string {
    return dayjs(value).format('DD MMM YYYY');
  }

  private formatTooltip(value: any): string {
    return convertInfoItemValue('chart', value);
  }
}
