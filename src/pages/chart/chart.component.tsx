import * as classnames from 'classnames';
import * as queryString from 'query-string';
import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { bindActionCreators } from 'redux';

import { TIMESPAN } from '../../constants/timespan.constant';

import { ChartState } from '../../reducers/chart.reducer';
import { AppState } from '../../store/app.store';

import { ChartActions } from '../../actions/chart.actions';

import { AreaChartComponent } from '../../components/charts/area-chart/area-chart.component';
import { TimespanComponent } from '../../components/charts/timespan/timespan.component';

import './chart.scss';

interface IChartState {
  selectedTimespan: TIMESPAN;
}

class Chart extends React.PureComponent {
  props: RouteComponentProps<{
    chartType: string
  }> & ChartState & ChartActions;
  
  state: IChartState = {
    selectedTimespan: TIMESPAN.DAYS_30
  };
  
  constructor (props: any) {
    super(props);
    
    this.onTimespanChanged = this.onTimespanChanged.bind(this);
  }
  
  componentDidMount (): void {
    this.props.getChart(this.props.match.params.chartType, {
      timespan: this.state.selectedTimespan
    });
  }
  
  render (): JSX.Element {
    const { iframe } = queryString.parse(this.props.location.search);
    
    const chartClassNames = classnames({
      'bi-chart': true,
      'bi-chart--iframe': iframe,
      'g-flex-column': true
    });
    
    return (
      <div className={ chartClassNames }>
        <div className='bi-chart__header g-flex-column__item-fixed'>
          <div className='bi-chart__title'>
            <FormattedMessage id={ `components.chart.title.${this.props.match.params.chartType}` }/>
          </div>
        </div>
        
        { (this.props.data && !this.props.fetching) ? this.renderBody() : null }
      </div>
    );
  }
  
  private renderBody (): JSX.Element {
    const { iframe } = queryString.parse(this.props.location.search);
    
    return (
      <div className='bi-chart__body g-flex-column__item'>
        <div className='bi-chart__chart'>
          <AreaChartComponent data={ this.props.data } compact={ !!iframe }/>
        </div>
        
        <div className='bi-chart__controls'>
          <TimespanComponent selected={ this.state.selectedTimespan }
                             onChange={ this.onTimespanChanged }/>
        </div>
      </div>
    );
  }
  
  private onTimespanChanged (span: TIMESPAN): void {
    this.setState({
      selectedTimespan: span
    });
    
    this.props.getChart(this.props.match.params.chartType, {
      timespan: span
    });
  }
}


function mapStateToProps (state: AppState): ChartState {
  return state.chart;
}

function mapDispatchToProps (dispatch: any): any {
  return bindActionCreators(ChartActions, dispatch);
}

export const ChartComponent = connect(mapStateToProps, mapDispatchToProps)(Chart);
