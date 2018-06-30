import dayjs from 'dayjs';
import * as React from 'react';

import { Timestamp } from '../../../models/generated/timestamp';

interface ITimestampProps {
  timestamp: Timestamp;
}

import './timestamp.scss';

export class TimestampComponent extends React.PureComponent<ITimestampProps> {
  render (): JSX.Element {
    const date = dayjs(this.props.timestamp);
    
    return (
      <div className='bi-timestamp'>
        <span className='bi-timestamp__time'>{ date.format('HH:mm:ss') }</span>
        <span className='bi-timestamp__date'>{ date.format('DD.MM.YYYY') }</span>
      </div>
    );
  }
}
