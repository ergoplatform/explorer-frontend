import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { bindActionCreators } from 'redux';

import { ChartState } from '../../reducers/chart.reducer';
import { AppState } from '../../store/app.store';

import { ChartActions } from '../../actions/chart.actions';

import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis } from 'recharts';

import './chart.scss';

class Chart extends React.PureComponent {
  props: RouteComponentProps<{
    chartType: string
  }> & ChartState & ChartActions;
  
  componentDidMount (): void {
    this.props.getChart(this.props.match.params.chartType);
  }
  
  render (): JSX.Element {
    return (
      <div className='bi-chart'>
        <div className='bi-chart__header'>
          <div className='bi-chart__title'>
            <FormattedMessage id={ `components.chart.title.${this.props.match.params.chartType}` }/>
          </div>
        </div>
        
        { this.props.data ? this.renderBody() : null }
      </div>
    );
  }
  
  private renderBody (): JSX.Element {
    return (
      <ResponsiveContainer width={ '100%' } height={400}>
        <LineChart
          height={ 400 }
          data={ this.props.data }
          margin={ { top: 5, right: 20, left: 10, bottom: 5 } }
        >
          <XAxis dataKey='timestamp' tickCount={100}/>
          <Tooltip/>
          <CartesianGrid stroke='#f5f5f5'/>
          <Line type='monotone' dataKey='value' stroke='#ff7300' yAxisId={ 0 } />
        </LineChart>
      </ResponsiveContainer>
    );
  }
}


function mapStateToProps (state: AppState): ChartState {
  return state.chart;
}

function mapDispatchToProps (dispatch: any): any {
  return bindActionCreators(ChartActions, dispatch);
}

export const ChartComponent = connect(mapStateToProps, mapDispatchToProps)(Chart);
