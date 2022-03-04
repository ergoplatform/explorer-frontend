import dayjs from 'dayjs';
import React from 'react';

import './timestamp.scss';

import { Timestamp } from '../../../models/generated/timestamp';

interface ITimestampProps {
  timestamp: Timestamp;
  vertical?: boolean;
}

export class TimestampComponent extends React.PureComponent<ITimestampProps> {
  render(): JSX.Element {
    const date = dayjs(this.props.timestamp);

    if (this.props.vertical) {
      return (
        <div className="bi-timestamp u-word-wrap u-word-wrap--ellipsis bi-timestamp--vertical">
          <span className="bi-timestamp__time">{date.format('HH:mm:ss')}</span>
          <span className="bi-timestamp__date">
            {date.format('DD.MM.YYYY')}
          </span>
        </div>
      );
    }

    return (
      <div className="bi-timestamp u-word-wrap u-word-wrap--ellipsis">
        <span className="bi-timestamp__time">{date.format('HH:mm:ss')}</span>
        <span className="bi-timestamp__date">{date.format('DD.MM.YYYY')}</span>
      </div>
    );
  }
}
