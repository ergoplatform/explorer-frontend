import React from 'react';
import Helmet from 'react-helmet';
import { FormattedMessage } from 'react-intl';

import { ChartsPreviewComponent } from '../../components/charts/charts-preview/charts-preview.component';

import './charts.scss';

export default class ChartsComponent extends React.PureComponent {
  render(): JSX.Element {
    return (
      <div className="bi-charts g-flex-column">
        <FormattedMessage id="common.pages.charts.title">
          {(title) => (
            <Helmet>
              <title>{title}</title>
            </Helmet>
          )}
        </FormattedMessage>

        <div className="bi-charts__header g-flex-column__item-fixed">
          <div className="bi-charts__title">
            <FormattedMessage id="components.charts.title" />
          </div>
        </div>

        {this.renderBody()}
      </div>
    );
  }

  private renderBody(): JSX.Element {
    return (
      <div className="bi-charts__body g-flex-column g-flex-column__item">
        <div className="bi-charts__charts-wrapper g-flex-column__item">
          <div className="bi-charts__title">
            <FormattedMessage id="components.charts.currency-statistics" />
          </div>

          <div className="bi-charts__charts">
            <ChartsPreviewComponent chartType="total" />
          </div>
        </div>
        <div className="bi-charts__charts-wrapper g-flex-column__item">
          <div className="bi-charts__title">
            <FormattedMessage id="components.charts.block-details" />
          </div>

          <div className="bi-charts__charts">
            <ChartsPreviewComponent chartType="blockchain-size" />

            <ChartsPreviewComponent chartType="block-size" />

            <ChartsPreviewComponent chartType="transactions-per-block" />
          </div>
        </div>

        <div className="bi-charts__charts-wrapper g-flex-column__item">
          <div className="bi-charts__title">
            <FormattedMessage id="components.charts.mining-information" />
          </div>

          <div className="bi-charts__charts">
            <ChartsPreviewComponent chartType="hash-rate" />

            <ChartsPreviewComponent chartType="hash-rate-distribution" />

            <ChartsPreviewComponent chartType="difficulty" />

            <ChartsPreviewComponent chartType="miners-revenue" />
          </div>
        </div>
      </div>
    );
  }
}
