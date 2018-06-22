import * as React from 'react';
import { Link } from 'react-router-dom';

import './chart-actions.scss';

interface IChartActionsProps {
  getChartActionUrl: (action: string, value: string) => string;
}

export class ChartActionsComponent extends React.Component<IChartActionsProps> {
  render (): JSX.Element {
    return (
      <div className='bi-chart-actions'>
        <Link className='bi-chart-actions__action bi-btn bi-btn--flat'
              to={ this.props.getChartActionUrl('scale', '1') }>
          Scale
        </Link>
      </div>
    );
  }
}
