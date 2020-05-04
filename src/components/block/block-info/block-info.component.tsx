import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';

import { formatNumberMetricPrefix } from '../../../utils/formatNumberMetricPrefix';

import { FullBlock } from '../../../models/generated/fullBlock';

import { TimestampComponent } from '../../common/timestamp/timestamp.component';

import './block-info.scss';

interface IBlockInfoProps {
  block: FullBlock;
}

export class BlockInfoComponent extends React.Component<IBlockInfoProps> {
  render(): JSX.Element {
    return (
      <div className="bi-block-info">
        <div className="bi-block-info__table bi-table">
          <div className="bi-block-info__row bi-table__row">
            <div className="bi-block-info__cell bi-block-info__cell--header bi-table__cell">
              <FormattedMessage id="common.block.height" />
            </div>

            <div className="bi-block-info__cell bi-table__cell">
              {this.props.block.header.height}
            </div>
          </div>

          <div className="bi-block-info__row bi-table__row">
            <div className="bi-block-info__cell bi-block-info__cell--header bi-table__cell">
              <FormattedMessage id="common.block.age" />
            </div>

            <div className="bi-block-info__cell bi-table__cell">
              <TimestampComponent
                timestamp={this.props.block.header.timestamp}
              />
            </div>
          </div>

          <div className="bi-block-info__row bi-table__row">
            <div className="bi-block-info__cell bi-block-info__cell--header bi-table__cell">
              <FormattedMessage id="common.block.id" />
            </div>

            <div className="bi-block-info__cell bi-table__cell u-word-wrap">
              {this.props.block.header.id}
            </div>
          </div>

          {this.props.block.header.height !== 0 && (
            <div className="bi-block-info__row bi-table__row">
              <div className="bi-block-info__cell bi-block-info__cell--header bi-table__cell">
                <FormattedMessage id="common.block.parent" />
              </div>

              <div className="bi-block-info__cell bi-table__cell u-word-wrap">
                <Link to={`/blocks/${this.props.block.header.parentId}`}>
                  {this.props.block.header.parentId}
                </Link>
              </div>
            </div>
          )}

          <div className="bi-block-info__row bi-table__row">
            <div className="bi-block-info__cell bi-block-info__cell--header bi-table__cell">
              <FormattedMessage id="common.block.difficulty" />
            </div>

            <div className="bi-block-info__cell bi-table__cell u-word-wrap">
              {this.props.block.header.difficulty}
            </div>
          </div>

          <div className="bi-block-info__row bi-table__row">
            <div className="bi-block-info__cell bi-block-info__cell--header bi-table__cell">
              <FormattedMessage id="common.block.extensionHash" />
            </div>

            <div className="bi-block-info__cell bi-table__cell u-word-wrap">
              {this.props.block.header.extensionHash}
            </div>
          </div>

          <div className="bi-block-info__row bi-table__row">
            <div className="bi-block-info__cell bi-block-info__cell--header bi-table__cell">
              <FormattedMessage id="common.block.version" />
            </div>

            <div className="bi-block-info__cell bi-table__cell">
              {this.props.block.header.version}
            </div>
          </div>

          <div className="bi-block-info__row bi-table__row">
            <div className="bi-block-info__cell bi-block-info__cell--header bi-table__cell">
              <FormattedMessage id="common.block.votes" />
            </div>

            <div className="bi-block-info__cell u-word-wrap">
              [{this.props.block.header.votes.join(', ')}]
            </div>
          </div>

          <div className="bi-block-info__row bi-table__row">
            <div className="bi-block-info__cell bi-block-info__cell--header bi-table__cell">
              <FormattedMessage id="common.block.adProofsRoot" />
            </div>

            <div className="bi-block-info__cell bi-table__cell u-word-wrap">
              {this.props.block.header.adProofsRoot}
            </div>
          </div>

          <div className="bi-block-info__row bi-table__row">
            <div className="bi-block-info__cell bi-block-info__cell--header bi-table__cell">
              <FormattedMessage id="common.block.transactionsRoot" />
            </div>

            <div className="bi-block-info__cell bi-table__cell u-word-wrap">
              {this.props.block.header.transactionsRoot}
            </div>
          </div>

          <div className="bi-block-info__row bi-table__row">
            <div className="bi-block-info__cell bi-block-info__cell--header bi-table__cell">
              <FormattedMessage id="common.block.stateRoot" />
            </div>

            <div className="bi-block-info__cell bi-table__cell u-word-wrap">
              {this.props.block.header.stateRoot}
            </div>
          </div>

          <div className="bi-block-info__row bi-table__row">
            <div className="bi-block-info__cell bi-block-info__cell--header bi-table__cell">
              <FormattedMessage id="common.block.nBits" />
            </div>

            <div className="bi-block-info__cell bi-table__cell">
              {this.props.block.header.nBits}
            </div>
          </div>

          <div className="bi-block-info__row bi-table__row">
            <div className="bi-block-info__cell bi-block-info__cell--header bi-table__cell">
              <FormattedMessage id="common.block.powSolutions" />
            </div>

            <div className="bi-block-info__cell u-word-wrap">
              {Object.keys(this.props.block.header.powSolutions).map((key) => {
                return (
                  <div key={key}>
                    {key}: {this.props.block.header.powSolutions[key]}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="bi-block-info__row bi-table__row">
            <div className="bi-block-info__cell bi-block-info__cell--header bi-table__cell">
              <FormattedMessage id="common.block.size" />
            </div>

            <div className="bi-block-info__cell bi-table__cell">
              {formatNumberMetricPrefix(this.props.block.header.size, {
                desiredFormat: 'k',
              })}
              B
            </div>
          </div>
        </div>
      </div>
    );
  }
}
