import * as React from 'react';
import { Link } from 'react-router-dom';

import './chart-actions.scss';

interface IChartActionsProps {
  getChartActionUrl: (action: string, value: string | number | null) => string;
  isScale: boolean;
}

export class ChartActionsComponent extends React.Component<IChartActionsProps> {
  render (): JSX.Element {
    console.debug(this.props);
    
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
        
        
        <button className='bi-chart-actions__action bi-btn bi-btn--flat'>
          CSV
        </button>
        
        <button className='bi-chart-actions__action bi-btn bi-btn--flat'>
          JSON
        </button>
      </div>
    );
  }
}
