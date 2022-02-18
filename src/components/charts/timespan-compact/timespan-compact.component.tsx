import classNames from 'classnames';
import React from 'react';
import { FormattedMessage } from 'react-intl';

import { TIMESPAN } from '../../../constants/timespan.constant';

import './timespan-compact.scss';

interface TimespanProps {
  selected: TIMESPAN;
  setTimespan: Function;
}

export class TimespanCompactComponent extends React.Component<TimespanProps> {
  constructor(props: TimespanProps) {
    super(props);
  }

  render(): JSX.Element {
    return (
      <div className="bi-timespan-compact">
        {Object.keys(TIMESPAN).map((span) => {
          const btnClassNames = classNames({
            'bi-btn': true,
            'bi-btn--flat': true,
            'bi-timespan-compact__span': true,
            'bi-timespan-compact__span--active':
              this.props.selected === TIMESPAN[span],
          });

          return (
            <button
              className={btnClassNames}
              key={span}
              onClick={(_) => this.props.setTimespan(TIMESPAN[span])}
            >
              <FormattedMessage
                id={`components.timespan.span.${TIMESPAN[span]}`}
              />
            </button>
          );
        })}
      </div>
    );
  }
}
