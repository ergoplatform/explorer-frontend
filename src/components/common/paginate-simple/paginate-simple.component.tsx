import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';

import './paginate-simple.scss';

import { ArrowIcon, DoubleArrowIcon } from '../icons/common.icons';

interface IPaginateSimpleProps {
  total: number;
  limit: number;
  forcePage: number;
  getPageUrl: (page: number) => string;
}

export class PaginateSimpleComponent extends React.Component<IPaginateSimpleProps> {
  constructor(props: IPaginateSimpleProps) {
    super(props);
  }

  render(): JSX.Element | null {
    const pageCount = Math.ceil(this.props.total / this.props.limit);

    if (!pageCount) {
      return null;
    }

    return (
      <div className="bi-paginate-simple">
        {this.props.forcePage === 0 ? (
          <button
            className="bi-paginate-simple__btn bi-paginate-simple__btn--prev bi-btn bi-btn--flat"
            disabled={true}
          >
            <DoubleArrowIcon className="bi-paginate-simple__btn-icon" />
          </button>
        ) : (
          <Link
            className="bi-paginate-simple__btn bi-paginate-simple__btn--prev bi-btn bi-btn--flat"
            to={this.props.getPageUrl(0)}
          >
            <DoubleArrowIcon className="bi-paginate-simple__btn-icon" />
          </Link>
        )}

        {this.props.forcePage === 0 ? (
          <button
            className="bi-paginate-simple__btn bi-paginate-simple__btn--prev bi-btn bi-btn--flat"
            disabled={true}
          >
            <ArrowIcon className="bi-paginate-simple__btn-icon" />
          </button>
        ) : (
          <Link
            className="bi-paginate-simple__btn bi-paginate-simple__btn--prev bi-btn--flat"
            to={this.props.getPageUrl(this.props.forcePage - 1)}
          >
            <ArrowIcon className="bi-paginate-simple__btn-icon" />
          </Link>
        )}

        <span className="bi-paginate-simple__status">
          <FormattedMessage
            id="components.paginate-simple.page-of"
            values={{ current: this.props.forcePage + 1, total: pageCount }}
          />
        </span>

        <span className="bi-paginate-simple__status bi-paginate-simple__status--mobile">
          <FormattedMessage
            id="components.paginate-simple.page"
            values={{ current: this.props.forcePage + 1 }}
          />
        </span>

        {this.props.forcePage === pageCount - 1 ? (
          <button
            className="bi-paginate-simple__btn bi-paginate-simple__btn--next bi-btn bi-btn--flat"
            disabled={true}
          >
            <ArrowIcon className="bi-paginate-simple__btn-icon" />
          </button>
        ) : (
          <Link
            className="bi-paginate-simple__btn bi-paginate-simple__btn--next bi-btn--flat"
            to={this.props.getPageUrl(this.props.forcePage + 1)}
          >
            <ArrowIcon className="bi-paginate-simple__btn-icon" />
          </Link>
        )}

        {this.props.forcePage === pageCount - 1 ? (
          <button
            className="bi-paginate-simple__btn bi-paginate-simple__btn--next bi-btn bi-btn--flat"
            disabled={true}
          >
            <DoubleArrowIcon className="bi-paginate-simple__btn-icon" />
          </button>
        ) : (
          <Link
            className="bi-paginate-simple__btn bi-paginate-simple__btn--next bi-btn--flat"
            to={this.props.getPageUrl(pageCount - 1)}
          >
            <DoubleArrowIcon className="bi-paginate-simple__btn-icon" />
          </Link>
        )}
      </div>
    );
  }
}
