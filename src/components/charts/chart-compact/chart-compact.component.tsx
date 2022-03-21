import classnames from 'classnames';
import React from 'react';
import Helmet from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { TIMESPAN } from '../../../constants/timespan.constant';

import { ChartState } from '../../../reducers/chart.reducer';
import { AppState } from '../../../store/app.store';

import { ChartActions } from '../../../actions/chart.actions';

import { AreaChartComponent } from '../area-chart/area-chart.component';
import { PieChartComponent } from '../pie-chart/pie-chart.component';
import { TimespanCompactComponent } from '../timespan-compact/timespan-compact.component';

import './chart-compact.scss';
import { InfoItem, StatsState } from 'src/reducers/stats.reducer';
import {WIDGET_REFRESH_INTERVAL} from "../../../constants/global.constants";

interface IChartCompactProps {
  chartType: string;
}

interface IChartParams {
  timespan: TIMESPAN;
  circulationSupply?: InfoItem;
}

class ChartCompact extends React.PureComponent<
  ChartState & ChartActions & StatsState & IChartCompactProps
> {
  state: IChartParams = {
    timespan: TIMESPAN.DAYS_30,
  };
  private interval: any;

  constructor(props: any) {
    super(props);

    this.setTimespan = this.setTimespan.bind(this);
  }

  componentDidMount(): void {
    this.updateChart()
    this.interval = setInterval(this.updateChart.bind(this), WIDGET_REFRESH_INTERVAL);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  updateChart(){
    this.props.getChart(this.props.chartType, this.state);
  }

  render(): JSX.Element {
    const chartClassNames = classnames({
      'bi-chart-compact': true,
      'g-flex-column': true,
      'g-flex-column__item-fixed': true,
    });

    return (
      <div className={chartClassNames}>
        <FormattedMessage
          id={`common.pages.chart.title.${this.props.chartType}`}
        >
          {(title) => (
            <Helmet>
              <title>{title}</title>
            </Helmet>
          )}
        </FormattedMessage>

        <div className="bi-chart-compact__wrapper">
          <div className="bi-chart-compact__top g-flex">
            <div>
              <div className="bi-chart-compact__subtitle">
                <FormattedMessage
                  id={`components.chart.subtitle.${this.props.chartType}`}
                />
              </div>
              <div className="bi-chart-compact__amount">
                {String(
                  this.props.info.find(({ title }) => title === 'supply')?.value
                ).toUpperCase()}
              </div>
            </div>

            {this.renderControls()}
          </div>

          {this.renderBody()}
        </div>
      </div>
    );
  }

  private renderBody(): JSX.Element {
    return (
      <div className="bi-chart-compact__body g-flex-column__item">
        <div className="bi-chart-compact__chart">
          {this.props.data && this.renderChart()}
        </div>
      </div>
    );
  }

  private renderChart(): JSX.Element {
    switch (this.props.chartType) {
      case 'hash-rate-distribution': {
        return (
          <PieChartComponent
            data={this.formatData()}
            labels={{
              name: (
                <FormattedMessage
                  id={'components.chart.hash-rate-distribution.labels.name'}
                />
              ),
              value: (
                <FormattedMessage
                  id={'components.chart.hash-rate-distribution.labels.value'}
                />
              ),
            }}
          />
        );
      }

      default: {
        return <AreaChartComponent data={this.formatData()} isScale={false} />;
      }
    }
  }

  private renderControls(): JSX.Element | null {
    switch (this.props.chartType) {
      case 'hash-rate-distribution': {
        return null;
      }

      default: {
        return (
          <div className="bi-chart-compact__controls g-flex">
            {
              <TimespanCompactComponent
                selected={this.state.timespan}
                setTimespan={this.setTimespan}
              />
            }
          </div>
        );
      }
    }
  }

  private formatData(): any {
    switch (this.props.chartType) {
      case 'miners-revenue':
      case 'total': {
        return this.props.data.map((item: any) => {
          return {
            timestamp: item.timestamp,
            type: 'coin',
            value: item.value / 1e9,
          };
        });
      }

      case 'blockchain-size':
      case 'block-size': {
        return this.props.data.map((item: any) => {
          return {
            timestamp: item.timestamp,
            type: 'bytes',
            value: item.value,
          };
        });
      }

      case 'hash-rate': {
        return this.props.data
          .slice(0, this.props.data.length - 1)
          .map((item: any) => {
            return {
              timestamp: item.timestamp,
              type: 'hashRateDay',
              value: item.value,
            };
          });
      }

      default: {
        return this.props.data;
      }
    }
  }

  private setTimespan(timespan: TIMESPAN) {
    this.setState({ ...this.state, timespan });
    this.props.getChart(this.props.chartType, { timespan });
  }
}

function mapStateToProps(
  state: AppState,
  props: IChartCompactProps
): ChartState {
  return { ...state.chart, ...state.stats, ...props };
}

function mapDispatchToProps(dispatch: any): any {
  return bindActionCreators(ChartActions, dispatch);
}

export const ChartCompactComponent = connect(
  mapStateToProps,
  mapDispatchToProps
)(ChartCompact);

export default ChartCompactComponent;
