import React from 'react';
import { FormattedMessage } from 'react-intl';

import { CoinValueComponent } from '../../common/coin-value/coin-value.component';

import './block-summary.scss';

interface IBlockSummaryProps {
  summary: any;
}

export class BlockSummaryComponent extends React.PureComponent<IBlockSummaryProps> {
  render(): JSX.Element {
    return (
      <div className="bi-block-summary">
        <div className="bi-block-summary__header">
          <FormattedMessage id="components.block-summary.title" />
        </div>

        <div className="bi-block-summary__body bi-table">
          <div className="bi-block-summary__row bi-table__row">
            <div className="bi-block-summary__cell bi-block-summary__cell--header bi-table__cell">
              <FormattedMessage id="components.block-summary.total" />
            </div>

            <div className="bi-block-summary__cell bi-block-summary__cell--value bi-table__cell u-word-wrap">
              {this.props.summary.total}
            </div>

            <div className="bi-block-summary__cell bi-block-summary__cell--actions bi-table__cell" />
          </div>

          <div className="bi-block-summary__row bi-table__row">
            <div className="bi-block-summary__cell bi-block-summary__cell--header bi-table__cell">
              <FormattedMessage id="components.block-summary.averageMiningTime" />
            </div>

            <div className="bi-block-summary__cell bi-block-summary__cell--value bi-table__cell u-word-wrap">
              {(this.props.summary.averageMiningTime / 1000 / 60).toFixed(2)}
              <FormattedMessage id="components.block-summary.minutes" /> (
              {(this.props.summary.averageMiningTime / 1000).toFixed(0)}{' '}
              seconds)
            </div>

            <div className="bi-block-summary__cell bi-block-summary__cell--actions bi-table__cell" />
          </div>

          <div className="bi-block-summary__row bi-table__row">
            <div className="bi-block-summary__cell bi-block-summary__cell--header bi-table__cell">
              <FormattedMessage id="components.block-summary.totalCoins" />
            </div>

            <div className="bi-block-summary__cell bi-block-summary__cell--value bi-table__cell u-word-wrap">
              <CoinValueComponent value={this.props.summary.totalCoins} />
            </div>

            <div className="bi-block-summary__cell bi-block-summary__cell--actions bi-table__cell" />
          </div>
        </div>
      </div>
    );
  }
}
