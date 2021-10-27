import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import blockSize from '../../../assets/images/charts/block-size.jpeg';
import difficulty from '../../../assets/images/charts/difficulty.jpeg';
import blockchainSize from '../../../assets/images/charts/blockchain-size.jpeg';
import hashRateDistribution from '../../../assets/images/charts/hash-rate-distribution.jpeg';
import hashRate from '../../../assets/images/charts/hash-rate.jpeg';
import minersRevenue from '../../../assets/images/charts/miners-revenue.jpeg';
import total from '../../../assets/images/charts/total.jpeg';
import transactionsPerBlock from '../../../assets/images/charts/transactions-per-block.jpeg';

import './charts-preview.scss';

interface IChartsPreviewProps {
  chartType: string;
}

const images = {
  'block-size': blockSize,
  difficulty,
  'blockchain-size': blockchainSize,
  'hash-rate-distribution': hashRateDistribution,
  'hash-rate': hashRate,
  'miners-revenue': minersRevenue,
  total,
  'transactions-per-block': transactionsPerBlock,
};

export class ChartsPreviewComponent extends React.PureComponent<IChartsPreviewProps> {
  render(): JSX.Element {
    return (
      <div className="bi-charts-preview">
        <Link
          to={`/charts/${this.props.chartType}`}
          className="bi-charts-preview__link"
        >
          <FormattedMessage
            id={`components.chart.title.${this.props.chartType}`}
          />

          <img
            src={images[this.props.chartType]}
            className="bi-charts-preview__image"
          />
        </Link>

        <div className="bi-charts-preview__description">
          <FormattedMessage
            id={`components.chart.subtitle.${this.props.chartType}`}
          />
        </div>
      </div>
    );
  }
}
