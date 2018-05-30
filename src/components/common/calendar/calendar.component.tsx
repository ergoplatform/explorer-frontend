import * as classnames from 'classnames';
import * as dayjs from 'dayjs';
import * as React from 'react';
import Calendar from 'react-calendar';

import './calendar.scss';

interface ICalendarState {
  isCalendarShown: boolean;
}

interface ICalendarProps {
  onChange: (dateStart: number, dateEnd: number) => void;
  startDate?: number;
  endDate?: number;
}

export class CalendarComponent extends React.PureComponent<ICalendarProps, ICalendarState> {
  element: HTMLDivElement;
  
  state: ICalendarState = {
    isCalendarShown: false
  };
  
  constructor (props: any) {
    super(props);
    
    this.showCalendar       = this.showCalendar.bind(this);
    this.hideCalendar       = this.hideCalendar.bind(this);
    this.setCalendar        = this.setCalendar.bind(this);
    this.hideOnOutsideClick = this.hideOnOutsideClick.bind(this);
  }
  
  render (): JSX.Element {
    const calendarClassNames = classnames({
      'bi-calendar__calendar': true,
      'bi-calendar__calendar--open': this.state.isCalendarShown
    });
    
    let buttonLabel: string = 'All time';
    
    const props: any = {};
    
    if (this.props.startDate && this.props.endDate) {
      buttonLabel = dayjs(this.props.startDate)
          .format('DD.MM.YYYY') + '-' +
        dayjs(this.props.endDate)
          .format('DD.MM.YYYY');
      
      props.value = [new Date(this.props.startDate), new Date(this.props.endDate)];
    }
    
    
    return (
      <div className='bi-calendar' ref={ (ref: HTMLDivElement) => {
        this.element = ref;
      } }>
        <button className='bi-calendar__btn bi-btn bi-btn--flat' onClick={ this.showCalendar }>
          { buttonLabel }
        </button>
        
        <Calendar { ...props }
                  className={ calendarClassNames }
                  selectRange={ true }
                  onChange={ this.setCalendar as any }/>
      </div>
    );
  }
  
  private setCalendar ([startDate, endDate]: [Date, Date]): void {
    this.props.onChange(startDate.getTime(), endDate.getTime());
    
    this.hideCalendar();
  }
  
  private showCalendar (): void {
    this.setState({
      isCalendarShown: true
    });
    
    document.addEventListener('click', this.hideOnOutsideClick);
  }
  
  private hideCalendar (): void {
    this.setState({
      isCalendarShown: false
    });
    
    document.removeEventListener('click', this.hideOnOutsideClick);
  }
  
  private hideOnOutsideClick (event: MouseEvent): void {
    if (event.target !== this.element && document.contains(event.target as Node) && !this.element.contains(event.target as Node)) {
      this.hideCalendar();
    }
  }
}
