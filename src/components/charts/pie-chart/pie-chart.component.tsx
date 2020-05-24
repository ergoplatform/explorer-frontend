import React from 'react';
import { Cell, Pie, PieChart, ResponsiveContainer, Sector } from 'recharts';

import './pie-chart.scss';

interface IPieChartProps {
  data: any;
  labels: any;
  compact?: boolean;
}

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
  '#01FF70',
];

export class PieChartComponent extends React.PureComponent<IPieChartProps> {
  state = {
    activeIndex: 0,
  };

  render(): JSX.Element {
    const data = this.props.data
      .map((item: any) => ({
        name: item.name,
        value: item.value,
      }))
      .sort((a: any, b: any) => b.y - a.y);

    return (
      <div className="bi-pie-chart">
        <div className="bi-pie-chart__chart">
          <ResponsiveContainer>
            <PieChart>
              <Pie
                activeIndex={this.state.activeIndex}
                activeShape={this.renderActiveShape}
                data={data}
                innerRadius={100}
                outerRadius={140}
                fill="#8884d8"
                dataKey="value"
                onMouseEnter={this.onPieEnter}
              >
                {data.map((entry: any, index: number) => (
                  <Cell
                    key={`cell-${entry.value}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="bi-pie-chart__legend bi-pie-chart__table bi-table">
          <div className="bi-pie-chart__row bi-table__row bi-pie-chart__row--header">
            <div className="bi-pie-chart__cell bi-table__cell">
              {this.props.labels.name}
            </div>
            <div className="bi-pie-chart__cell bi-table__cell">
              {this.props.labels.value}
            </div>
          </div>

          {this.props.data.map((item: any, index: number) => (
            <div className="bi-pie-chart__row bi-table__row" key={index}>
              <div className="bi-pie-chart__cell bi-table__cell">
                <span>{this.props.labels.name}</span> {item.name}
              </div>
              <div className="bi-pie-chart__cell bi-table__cell">
                <span>{this.props.labels.value}</span> {item.value}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  renderActiveShape = (props: any) => {
    const RADIAN = Math.PI / 180;
    const {
      cx,
      cy,
      midAngle,
      innerRadius,
      outerRadius,
      startAngle,
      endAngle,
      fill,
      payload,
      percent,
      value,
    } = props;
    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);
    const sx = cx + (outerRadius + 10) * cos;
    const sy = cy + (outerRadius + 10) * sin;
    const mx = cx + (outerRadius + 30) * cos;
    const my = cy + (outerRadius + 30) * sin;
    const ex = mx + (cos >= 0 ? 1 : -1) * 22;
    const ey = my;
    const textAnchor = cos >= 0 ? 'start' : 'end';

    return (
      <g>
        <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
          {payload.name}
        </text>
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
        />
        <Sector
          cx={cx}
          cy={cy}
          startAngle={startAngle}
          endAngle={endAngle}
          innerRadius={outerRadius + 6}
          outerRadius={outerRadius + 10}
          fill={fill}
        />
        <path
          d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
          stroke={fill}
          fill="none"
        />
        <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
        <text
          x={ex + (cos >= 0 ? 1 : -1) * 12}
          y={ey}
          textAnchor={textAnchor}
          fill="#333"
        >{`Blocks: ${value}`}</text>
        <text
          x={ex + (cos >= 0 ? 1 : -1) * 12}
          y={ey}
          dy={18}
          textAnchor={textAnchor}
          fill="#999"
        >
          {`(Rate: ${(percent * 100).toFixed(2)}%)`}
        </text>
      </g>
    );
  };

  onPieEnter = (data: any, index: number) => {
    this.setState({
      activeIndex: index,
    });
  };
}

export default PieChartComponent;
