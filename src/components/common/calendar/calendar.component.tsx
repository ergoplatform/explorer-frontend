import * as React from 'react';
import Calendar from 'react-calendar';

import './calendar.scss';

export class CalendarComponent extends React.PureComponent {
  render (): JSX.Element {
    return (
      <div className='bi-calendar'>
        <Calendar className='bi-calendar__calendar'/>
      </div>
    );
  }
}
