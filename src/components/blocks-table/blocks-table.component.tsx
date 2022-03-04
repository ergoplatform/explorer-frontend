import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';

import { SearchBlock } from '../../models/generated/searchBlock';

import { formatNumberMetricPrefix } from '../../utils/formatNumberMetricPrefix';

import { CoinValueComponent } from '../common/coin-value/coin-value.component';
import { TimestampComponent } from '../common/timestamp/timestamp.component';
import { BlockTableHeaderComponent } from './block-table-header/block-table-header.component';

import './blocks-table.scss';

interface IBlockTableProps {
  blocks: SearchBlock[];
  isFetching: boolean;
}

export class BlocksTableComponent extends React.Component<IBlockTableProps> {
  render(): JSX.Element {
    return (
      <div className="bi-blocks-table">
        {!this.props.blocks ? null : this.renderTable()}
      </div>
    );
  }

  private renderTable(): JSX.Element {
    return (
      <div className="bi-blocks-table__body bi-table">
        <BlockTableHeaderComponent />

        {this.props.blocks.map((block) => {
          return (
            <div className="bi-blocks-table__row bi-table__row" key={block.id}>
              <div className="bi-blocks-table__cell bi-table__cell">
                <div className="bi-blocks-table__cell-name">
                  <FormattedMessage id="common.block.height" />
                </div>

                <Link to={`/blocks/${block.id}`}>{block.height}</Link>
              </div>

              <div className="bi-blocks-table__cell bi-blocks-table__cell--timestamp bi-table__cell">
                <div className="bi-blocks-table__cell-name">
                  <FormattedMessage id="common.block.age" />
                </div>

                <TimestampComponent timestamp={block.timestamp} />
              </div>

              <div className="bi-blocks-table__cell bi-table__cell">
                <div className="bi-blocks-table__cell-name">
                  <FormattedMessage id="common.block.transactions" />
                </div>

                {block.transactionsCount}
              </div>

              <div className="bi-blocks-table__cell bi-table__cell">
                <div className="bi-blocks-table__cell-name">
                  <FormattedMessage id="common.block.minedBy" />
                </div>

                <Link
                  to={`/addresses/${block.miner.address || block.miner.name}`}
                  className="u-word-wrap u-word-wrap--ellipsis"
                >
                  {block.miner.name || block.miner.address}
                </Link>
              </div>

              <div className="bi-blocks-table__cell bi-table__cell">
                <div className="bi-blocks-table__cell-name">
                  <FormattedMessage id="common.block.minerReward" />
                </div>

                <CoinValueComponent value={block.minerReward} />
              </div>

              <div className="bi-blocks-table__cell bi-table__cell bi-blocks-table__cell--difficulty">
                <div className="bi-blocks-table__cell-name">
                  <FormattedMessage id="common.block.difficulty" />
                </div>

                {block.difficulty}
              </div>

              <div className="bi-blocks-table__cell bi-table__cell">
                <div className="bi-blocks-table__cell-name">
                  <FormattedMessage id="common.block.size" />
                </div>

                <span className="u-word-wrap u-word-wrap--ellipsis">
                  {formatNumberMetricPrefix(block.size, {
                    desiredFormat: 'k',
                  })}
                  B
                </span>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}
