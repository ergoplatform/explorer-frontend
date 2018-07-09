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
          
          <img src={`/charts/images/${this.props.chartType}`} className='bi-charts-preview__image'/>
        </Link>
        
        <div className='bi-charts-preview__description'>
          <FormattedMessage id={ `components.chart.subtitle.${this.props.chartType}` }/>
        </div>
      </div>
    );
  }
}
