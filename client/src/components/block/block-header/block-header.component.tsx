import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Link, NavLink } from 'react-router-dom';

import { FullBlock } from '../../../models/generated/fullBlock';
import { InlineResponse2001References } from '../../../models/generated/inlineResponse2001References';

import { ArrowIcon } from '../../common/icons/common.icons';

import './block-header.scss';

interface IBlockHeaderProps {
  block: FullBlock;
  prevLink: string;
  references: InlineResponse2001References;
}

export class BlockHeaderComponent extends React.Component<IBlockHeaderProps> {
  render(): JSX.Element {
    return (
      <div className="bi-block-header g-flex-column">
        <div className="bi-block-header__line g-flex-column__item-fixed">
          <Link
            className="bi-block-header__btn-back"
            to={`/${this.props.prevLink}`}
          >
            <ArrowIcon className="bi-block-header__btn-back-icon" />

            <span className="bi-block-header__btn-back-title">
              <FormattedMessage id="components.block-header.back" />
            </span>
          </Link>
        </div>

        <div className="bi-block-header__line g-flex-column__item g-flex">
          <div className="bi-block-header__title g-flex__item-fixed">
            <FormattedMessage id="common.block.block" />{' '}
            <span>#{this.props.block.header.height}</span>
          </div>

          <div className="bi-block-header__navigation g-flex__item-fixed">
            {this.props.references.previousId &&
            this.props.block.header.height !== 0 ? (
              <Link
                className="bi-block-header__navigation-btn bi-block-header__navigation-btn--prev"
                to={`/blocks/${this.props.references.previousId}`}
              >
                <ArrowIcon className="bi-block-header__navigation-btn-icon" />
              </Link>
            ) : null}

            {this.props.references.nextId ? (
              <Link
                className="bi-block-header__navigation-btn bi-block-header__navigation-btn--next"
                to={`/blocks/${this.props.references.nextId}`}
              >
                <ArrowIcon className="bi-block-header__navigation-btn-icon" />
              </Link>
            ) : null}
          </div>

          <div className="bi-block-header__tabs g-flex__item-fixed g-flex">
            <NavLink
              className="bi-block-header__tab g-flex__item-fixed"
              activeClassName="bi-block-header__tab--active"
              exact={true}
              to={`/blocks/${this.props.block.header.id}`}
            >
              <FormattedMessage id="components.block-header.information" />
            </NavLink>

            <NavLink
              className="bi-block-header__tab g-flex__item-fixed"
              activeClassName="bi-block-header__tab--active"
              exact={true}
              to={`/blocks/${this.props.block.header.id}/transactions`}
            >
              <FormattedMessage id="components.block-header.transactions" />
            </NavLink>

            <NavLink
              className="bi-block-header__tab g-flex__item-fixed"
              activeClassName="bi-block-header__tab--active"
              exact={true}
              to={`/blocks/${this.props.block.header.id}/extension`}
            >
              <FormattedMessage id="components.block-header.extension" />
            </NavLink>

            <NavLink
              className="bi-block-header__tab g-flex__item-fixed"
              activeClassName="bi-block-header__tab--active"
              exact={true}
              to={`/blocks/${this.props.block.header.id}/adproofs`}
            >
              <FormattedMessage id="components.block-header.adproofs" />
            </NavLink>
          </div>
        </div>
      </div>
    );
  }
}
