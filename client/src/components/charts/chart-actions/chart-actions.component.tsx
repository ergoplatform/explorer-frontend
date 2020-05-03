import Download from '@axetroy/react-download';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';

import './chart-actions.scss';

interface IChartActionsProps {
  getChartActionUrl: (action: string, value: string | number | null) => string;
  isScale: boolean;
  data: any;
}

export class ChartActionsComponent extends React.Component<IChartActionsProps> {
  render(): JSX.Element {
    return (
      <div className="bi-chart-actions">
        {!this.props.isScale ? (
          <Link
            className="bi-chart-actions__action bi-btn bi-btn--flat"
            to={this.props.getChartActionUrl('scale', '1')}
          >
            <FormattedMessage id="components.chart-actions.logarithmic-scale" />
          </Link>
        ) : (
          <Link
            className="bi-chart-actions__action bi-btn bi-btn--flat"
            to={this.props.getChartActionUrl('scale', null)}
          >
            <FormattedMessage id="components.chart-actions.linear-scale" />
          </Link>
        )}

        {this.props.data && (
          <Download
            file="data.csv"
            content={this.getCSVData()}
            className="bi-chart-actions__action bi-btn bi-btn--flat"
          >
            <FormattedMessage id="components.chart-actions.csv" />
          </Download>
        )}

        {this.props.data && (
          <Download
            file="data.json"
            content={JSON.stringify(this.props.data)}
            className="bi-chart-actions__action bi-btn bi-btn--flat"
          >
            <FormattedMessage id="components.chart-actions.json" />
          </Download>
        )}
      </div>
    );
  }

  private getCSVData(): string {
    if (!this.props.data) {
      return '';
    }

    const data = this.props.data.map((item: any) => {
      return [item.timestamp, item.value].join(', ');
    });

    return ['timestamp, value', ...data].join('\r\n');
  }
}
