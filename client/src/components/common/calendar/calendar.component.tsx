import classnames from 'classnames';
import dayjs from 'dayjs';
import React from 'react';
import Calendar from 'react-calendar/dist/entry.nostyle';

import { ArrowIcon, CrossIcon, DoubleArrowIcon } from '../icons/common.icons';

import './calendar.scss';

interface CalendarState {
  isCalendarShown: boolean;
}

interface CalendarProps {
  onChange: (dateStart: number | null, dateEnd: number | null) => void;
  startDate?: number;
  endDate?: number;
}

export class CalendarComponent extends React.PureComponent<
  CalendarProps,
  CalendarState
> {
  element!: HTMLDivElement;

  state: CalendarState = {
    isCalendarShown: false,
  };

  constructor(props: any) {
    super(props);

    this.showCalendar = this.showCalendar.bind(this);
    this.hideCalendar = this.hideCalendar.bind(this);
    this.setCalendar = this.setCalendar.bind(this);
    this.resetCalendar = this.resetCalendar.bind(this);
    this.hideOnOutsideClick = this.hideOnOutsideClick.bind(this);
  }

  render(): JSX.Element {
    const calendarClassNames = classnames({
      'bi-calendar__calendar': true,
      'bi-calendar__calendar--open': this.state.isCalendarShown,
    });

    let buttonLabel = 'All time';
    let isDateSet = false;

    const props: any = {};

    if (this.props.startDate && this.props.endDate) {
      isDateSet = true;

      buttonLabel =
        dayjs(this.props.startDate).format('DD.MM.YYYY') +
        ' – ' +
        dayjs(this.props.endDate).format('DD.MM.YYYY');

      props.value = [
        new Date(this.props.startDate),
        new Date(this.props.endDate),
      ];
    }

    const rootClassNames = classnames({
      'bi-calendar': true,
      'bi-calendar--date-set': isDateSet,
    });

    const formatShortWeekday = (locale: any, value: any) => {
      return dayjs(value).format('dddd')[0];
    };

    return (
      <div
        className={rootClassNames}
        ref={(ref: HTMLDivElement) => {
          this.element = ref;
        }}
      >
        <button
          className="bi-calendar__btn bi-btn bi-btn--flat"
          onClick={this.showCalendar}
        >
          {buttonLabel}
        </button>

        <button
          className="bi-calendar__btn-reset bi-btn bi-btn--flat"
          onClick={this.resetCalendar}
        >
          <CrossIcon className="bi-calendar__btn-reset-icon" />
        </button>

        <Calendar
          {...props}
          className={calendarClassNames}
          prevLabel={
            <ArrowIcon className="bi-calendar__icon bi-calendar__icon--prev" />
          }
          nextLabel={
            <ArrowIcon className="bi-calendar__icon bi-calendar__icon--next" />
          }
          prev2Label={
            <DoubleArrowIcon className="bi-calendar__icon bi-calendar__icon--prev" />
          }
          next2Label={
            <DoubleArrowIcon className="bi-calendar__icon bi-calendar__icon--next" />
          }
          formatShortWeekday={formatShortWeekday}
          selectRange={true}
          onChange={this.setCalendar as any}
        />
      </div>
    );
  }

  private resetCalendar(): void {
    this.props.onChange(null, null);
  }

  private setCalendar([startDate, endDate]: [Date, Date]): void {
    this.props.onChange(startDate.getTime(), endDate.getTime());

    this.hideCalendar();
  }

  private showCalendar(): void {
    this.setState({
      isCalendarShown: true,
    });

    document.addEventListener('click', this.hideOnOutsideClick);
  }

  private hideCalendar(): void {
    this.setState({
      isCalendarShown: false,
    });

    document.removeEventListener('click', this.hideOnOutsideClick);
  }

  private hideOnOutsideClick(event: MouseEvent): void {
    if (
      event.target !== this.element &&
      document.contains(event.target as Node) &&
      !this.element.contains(event.target as Node)
    ) {
      this.hideCalendar();
    }
  }
}
