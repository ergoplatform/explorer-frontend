import classNames from 'classnames';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';

import { TIMESPAN } from '../../../constants/timespan.constant';

import './timespan.scss';

interface TimespanProps {
  getTimespanUrl: (selectedSpan: TIMESPAN) => string;
  selected: TIMESPAN;
}

export class TimespanComponent extends React.Component<TimespanProps> {
  constructor(props: TimespanProps) {
    super(props);
  }

  render(): JSX.Element {
    return (
      <div className="bi-timespan">
        {Object.keys(TIMESPAN).map((span) => {
          const btnClassNames = classNames({
            'bi-btn': true,
            'bi-btn--flat': true,
            'bi-timespan__span': true,
            'bi-timespan__span--active': this.props.selected === TIMESPAN[span],
          });

          return (
            <Link
              className={btnClassNames}
              key={span}
              to={this.props.getTimespanUrl(TIMESPAN[span])}
            >
              <FormattedMessage
                id={`components.timespan.span.${TIMESPAN[span]}`}
              />
            </Link>
          );
        })}
      </div>
    );
  }
}
