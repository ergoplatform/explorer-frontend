import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import * as React from 'react';

interface IPieChartProps {
  data: any;
  labels: any;
  compact?: boolean;
}

import './pie-chart.scss';

export class PieChartComponent extends React.PureComponent<IPieChartProps> {
  render (): JSX.Element {
    const data = this.props.data.map((item: any) => {
      return {
        name: item.name,
        y: item.value
      };
    })
      .sort((a: any, b: any) => {
        return b.y - a.y;
      });
    
    const options = {
      chart: {
        backgroundColor: null,
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie'
      },
      colors: [
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
        '#01FF70'
      ],
      credits: {
        enabled: false
      },
      plotOptions: {
        pie: {
          dataLabels: {
            color: '#333333',
            enabled: !this.props.compact,
            formatter (): any {
              const series = this as any;
              
              return `${series.point.name}: ${series.point.percentage.toFixed(2)}%`;
            }
          }
        }
      },
      series: [{
        data,
        innerSize: '70%'
      }],
      title: {
        text: false
      },
      tooltip: {
        enabled: false
      }
    };
    
    return (
      <div className='bi-pie-chart'>
        <div className='bi-pie-chart__chart'>
          <HighchartsReact
            highcharts={ Highcharts }
            options={ options }
          />
        </div>
  
        { !this.props.compact &&
        <div className='bi-pie-chart__legend bi-pie-chart__table bi-table'>
          <div className='bi-pie-chart__row bi-table__row bi-pie-chart__row--header'>
            <div className='bi-pie-chart__cell bi-table__cell'>
              { this.props.labels.name }
            </div>
            <div className='bi-pie-chart__cell bi-table__cell'>
              { this.props.labels.value }
            </div>
          </div>
    
          {
            this.props.data.map((item: any, index: number) => {
              return (
                <div className='bi-pie-chart__row bi-table__row' key={ index }>
                  <div className='bi-pie-chart__cell bi-table__cell'>
                    <span>{ this.props.labels.name }</span> { item.name }
                  </div>
                  <div className='bi-pie-chart__cell bi-table__cell'>
                    <span>{ this.props.labels.value }</span> { item.value }
                  </div>
                </div>
              );
            })
          }
        </div>
        }
      </div>
    );
  }
  
}
