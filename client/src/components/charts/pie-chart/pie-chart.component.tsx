import React from 'react';
import {
  Cell, Pie, PieChart, ResponsiveContainer, Tooltip,
} from 'recharts';

import './pie-chart.scss';

interface IPieChartProps {
  data: any;
  labels: any;
  compact?: boolean;
}

export class PieChartComponent extends React.PureComponent<IPieChartProps> {
  render (): JSX.Element {
    const data = this.props.data.map((item: any) => ({
      name: item.name,
      value: item.value,
    }))
      .sort((a: any, b: any) => b.y - a.y);

    const COLORS = [
      '#0088FE',
      '#85144b',
      '#FFBB28',
      '#FF8042',
      '#2ECC40',
      '#FF4136',
      '#001f3f',
      '#0074D9',
      '#FF851B',
      '#00C49F',
      '#F012BE',
      '#7FDBFF',
      '#FFDC00',
      '#39CCCC',
      '#3D9970',
      '#B10DC9',
      '#01FF70'];

    return (
      <div className="bi-pie-chart">
        <div className="bi-pie-chart__chart">
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={data}
                innerRadius={60}
                outerRadius={80}
                fill="#8884d8"
                paddingAngle={5}
                dataKey="value"
                isAnimationActive={false}
                label={true}
              >
                {
                data.map((entry: any, index: number) => <Cell key={`cell-${entry.value}`} fill={COLORS[index % COLORS.length]} />)
              }
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="bi-pie-chart__legend bi-pie-chart__table bi-table">
          <div className="bi-pie-chart__row bi-table__row bi-pie-chart__row--header">
            <div className="bi-pie-chart__cell bi-table__cell">
              { this.props.labels.name }
            </div>
            <div className="bi-pie-chart__cell bi-table__cell">
              { this.props.labels.value }
            </div>
          </div>

          {
            this.props.data.map((item: any, index: number) => (
              <div className="bi-pie-chart__row bi-table__row" key={index}>
                <div className="bi-pie-chart__cell bi-table__cell">
                  <span>{ this.props.labels.name }</span>
                  {' '}
                  { item.name }
                </div>
                <div className="bi-pie-chart__cell bi-table__cell">
                  <span>{ this.props.labels.value }</span>
                  {' '}
                  { item.value }
                </div>
              </div>
            ))
          }
        </div>
      </div>
    );
  }
}

export default PieChartComponent;
