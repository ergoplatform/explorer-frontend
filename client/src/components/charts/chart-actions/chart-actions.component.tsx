import Download from '@axetroy/react-download';
import * as React from 'react';
import { Link } from 'react-router-dom';

import './chart-actions.scss';

interface IChartActionsProps {
  getChartActionUrl: (action: string, value: string | number | null) => string;
  isScale: boolean;
  data: any;
}

export class ChartActionsComponent extends React.Component<IChartActionsProps> {
  render (): JSX.Element {
    return (
      <div className='bi-chart-actions'>
        { !this.props.isScale ?
          <Link className='bi-chart-actions__action bi-btn bi-btn--flat'
                to={ this.props.getChartActionUrl('scale', '1') }>
            Logarithmic Scale
          </Link>
          :
          <Link className='bi-chart-actions__action bi-btn bi-btn--flat'
                to={ this.props.getChartActionUrl('scale', null) }>
            Linear Scale
          </Link>
        }
        <Download file='data.csv'
                  content={ this.getCSVData() }
                  className='bi-chart-actions__action bi-btn bi-btn--flat'>
          CSV
        </Download>
        
        <Download file='data.json'
                  content={ JSON.stringify(this.props.data) }
                  className='bi-chart-actions__action bi-btn bi-btn--flat'>
          JSON
        </Download>
      </div>
    );
  }
  
  private getCSVData (): string {
    if (!this.props.data) {
      return '';
    }
    
    const data = this.props.data.map((item: any) => {
      return [item.timestamp, item.value].join(', ');
    });
    
    return ['timestamp, value', ...data].join('\r\n');
  }
}
