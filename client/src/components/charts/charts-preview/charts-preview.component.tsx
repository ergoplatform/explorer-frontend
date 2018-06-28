import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';

interface IChartsPreviewProps {
  chartType: string;
}

import './charts-preview.scss';

export class ChartsPreviewComponent extends React.PureComponent<IChartsPreviewProps> {
  render (): JSX.Element {
    return (
      <div className='bi-charts-preview'>
        <Link to={ `/charts/${this.props.chartType}` } className='bi-charts-preview__link'>
          <FormattedMessage id={ `components.chart.title.${this.props.chartType}` }/>
          
          <iframe src={ `/charts/${this.props.chartType}?iframe=true` }
                  className='bi-charts-preview__iframe'
                  frameBorder='0'
                  scrolling='no'
                  tabIndex={ -1 }/>
        </Link>
        
        <div className='bi-charts-preview__description'>
          <FormattedMessage id={ `components.chart.subtitle.${this.props.chartType}` }/>
        </div>
      </div>
    );
  }
}
