import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';

import { CoinValueComponent } from '../../common/coin-value/coin-value.component';

import './mining-cost.scss';

import { convertInfoItemValue } from '../../../utils/convertInfoItemvalue';

interface IBlockSummaryProps {
  summary: any;
}

export class MiningCostComponent extends React.PureComponent<IBlockSummaryProps> {
  render(): JSX.Element {
    return (
      <div className="bi-mining-cost">
        <div className="bi-mining-cost__header">
          <FormattedMessage id="components.mining-cost.title" />
        </div>

        <div className="bi-mining-cost__body bi-table">
          <div className="bi-mining-cost__row bi-table__row">
            <div className="bi-mining-cost__cell bi-mining-cost__cell--header bi-table__cell">
              <FormattedMessage id="components.mining-cost.totalMinersRevenue" />
            </div>

            <div className="bi-mining-cost__cell bi-mining-cost__cell--value bi-table__cell u-word-wrap">
              <CoinValueComponent
                value={this.props.summary.totalMinersRevenue}
              />
            </div>

            <div className="bi-mining-cost__cell bi-mining-cost__cell--actions bi-table__cell" />
          </div>

          <div className="bi-mining-cost__row bi-table__row">
            <div className="bi-mining-cost__cell bi-mining-cost__cell--header bi-table__cell">
              <FormattedMessage id="components.mining-cost.percentEarnedTransactionsFees" />
            </div>

            <div className="bi-mining-cost__cell bi-mining-cost__cell--value bi-table__cell u-word-wrap">
              {this.props.summary.percentEarnedTransactionsFees}%
            </div>

            <div className="bi-mining-cost__cell bi-mining-cost__cell--actions bi-table__cell" />
          </div>

          <div className="bi-mining-cost__row bi-table__row">
            <div className="bi-mining-cost__cell bi-mining-cost__cell--header bi-table__cell">
              <FormattedMessage id="components.mining-cost.percentTransactionVolume" />
            </div>

            <div className="bi-mining-cost__cell bi-mining-cost__cell--value bi-table__cell u-word-wrap">
              {this.props.summary.percentTransactionVolume}%
            </div>

            <div className="bi-mining-cost__cell bi-mining-cost__cell--actions bi-table__cell" />
          </div>

          <div className="bi-mining-cost__row bi-table__row">
            <div className="bi-mining-cost__cell bi-mining-cost__cell--header bi-table__cell">
              <FormattedMessage id="components.mining-cost.costPerTransaction" />
            </div>

            <div className="bi-mining-cost__cell bi-mining-cost__cell--value bi-table__cell u-word-wrap">
              <CoinValueComponent
                value={this.props.summary.costPerTransaction}
              />
            </div>

            <div className="bi-mining-cost__cell bi-mining-cost__cell--actions bi-table__cell" />
          </div>

          <div className="bi-mining-cost__row bi-table__row">
            <div className="bi-mining-cost__cell bi-mining-cost__cell--header bi-table__cell">
              <FormattedMessage id="components.mining-cost.difficulty" />
            </div>

            <div className="bi-mining-cost__cell bi-mining-cost__cell--value bi-table__cell u-word-wrap">
              {this.props.summary.difficulty}
            </div>

            <div className="bi-mining-cost__cell bi-mining-cost__cell--display bi-mining-cost__cell--actions  bi-table__cell">
              <Link to="/charts/difficulty">
                <FormattedMessage id="common.charts.view" />
              </Link>
            </div>
          </div>

          <div className="bi-mining-cost__row bi-table__row">
            <div className="bi-mining-cost__cell bi-mining-cost__cell--header bi-table__cell">
              <FormattedMessage id="components.mining-cost.hashRate" />
            </div>

            <div className="bi-mining-cost__cell bi-mining-cost__cell--value bi-table__cell u-word-wrap">
              {convertInfoItemValue('hashRate', this.props.summary.hashRate)}
            </div>

            <div className="bi-mining-cost__cell bi-mining-cost__cell--display  bi-mining-cost__cell--actions bi-table__cell">
              <Link to="/charts/hash-rate">
                <FormattedMessage id="common.charts.view" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
