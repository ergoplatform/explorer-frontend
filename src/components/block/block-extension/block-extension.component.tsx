import React from 'react';
import { FormattedMessage } from 'react-intl';
import { BlockExtension } from '../../../models/generated/blockExtension';

import './block-extension.scss';

interface IBlockExtProps {
  extension: BlockExtension;
}

export class BlockExtensionComponent extends React.Component<IBlockExtProps> {
  render(): JSX.Element {
    return (
      <div className="bi-block-ext">
        <div className="bi-block-ext__table bi-table">
          <div className="bi-block-ext__row bi-table__row">
            <div className="bi-block-ext__cell bi-block-ext__cell--header bi-table__cell">
              <FormattedMessage id="common.block.headerId" />
            </div>

            <div className="bi-block-ext__cell bi-table__cell">
              {this.props.extension.headerId}
            </div>
          </div>
          <div className="bi-block-ext__row bi-table__row">
            <div className="bi-block-ext__cell bi-block-ext__cell--header bi-table__cell">
              <FormattedMessage id="common.block.digest" />
            </div>

            <div className="bi-block-ext__cell bi-table__cell">
              {this.props.extension.digest}
            </div>
          </div>
          <div className="bi-block-ext__row bi-table__row">
            <div className="bi-block-ext__cell bi-block-ext__cell--header bi-table__cell">
              <FormattedMessage id="common.block.fields" />
            </div>

            <div className="bi-block-ext__cell bi-table__cell">
              {this.props.extension.fields.map((i) => (
                <div key={i[0]}>
                  <b>{i[0]}</b>: {i[1]}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
