import classnames from 'classnames';
import queryString from 'query-string';
import React from 'react';
import Helmet from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';

import { TIMESPAN } from '../../constants/timespan.constant';

import { ChartState } from '../../reducers/chart.reducer';
import { AppState } from '../../store/app.store';

import { ChartActions } from '../../actions/chart.actions';

import { AreaChartComponent } from '../../components/charts/area-chart/area-chart.component';
import { ChartActionsComponent } from '../../components/charts/chart-actions/chart-actions.component';
import { PieChartComponent } from '../../components/charts/pie-chart/pie-chart.component';
import { TimespanComponent } from '../../components/charts/timespan/timespan.component';

import { ArrowIcon } from '../../components/common/icons/common.icons';

import './chart.scss';

class Chart extends React.PureComponent<
  RouteComponentProps<{
    chartType: string;
  }> &
    ChartState &
    ChartActions
> {
  params: any = {};

  constructor(props: any) {
    super(props);

    this.getTimespanUrl = this.getTimespanUrl.bind(this);
    this.getChartActionUrl = this.getChartActionUrl.bind(this);
  }

  componentDidMount(): void {
    this.params = this.getParams();

    this.props.getChart(this.props.match.params.chartType, this.params);
  }

  UNSAFE_componentWillReceiveProps(props: any): void {
    const params = this.getParams();

    if (JSON.stringify(params) !== JSON.stringify(this.params)) {
      this.params = params;

      this.props.getChart(this.props.match.params.chartType, this.params);
    }
  }

  render(): JSX.Element {
    const { iframe, scale } = queryString.parse(this.props.location.search);

    const chartClassNames = classnames({
      'bi-chart': true,
      'bi-chart--iframe': iframe,
      'bi-chart--scale': scale === '1',
      'g-flex-column': true,
      'g-flex-column__item-fixed': true,
    });

    return (
      <div className={chartClassNames}>
        <FormattedMessage
          id={`common.pages.chart.title.${this.props.match.params.chartType}`}
        >
          {(title) => (
            <Helmet>
              <title>{title}</title>
            </Helmet>
          )}
        </FormattedMessage>

        <div className="bi-chart__header g-flex-column__item-fixed">
          <div className="bi-chart__line">
            <Link className="bi-chart__btn-back" to="/charts">
              <ArrowIcon className="bi-chart__btn-back-icon" />

              <span className="bi-chart__btn-back-title">
                <FormattedMessage id="components.chart.back" />
              </span>
            </Link>
          </div>

          <div className="bi-chart__title">
            <FormattedMessage
              id={`components.chart.title.${this.props.match.params.chartType}`}
            />
          </div>
          <div className="bi-chart__subtitle">
            <FormattedMessage
              id={`components.chart.subtitle.${this.props.match.params.chartType}`}
            />
          </div>
        </div>

        {this.renderBody()}
      </div>
    );
  }

  private renderBody(): JSX.Element {
    return (
      <div className="bi-chart__body g-flex-column__item">
        <div className="bi-chart__chart">
          {this.props.data && this.renderChart()}
        </div>

        {this.renderControls()}
      </div>
    );
  }

  private renderChart(): JSX.Element {
    const { iframe } = queryString.parse(this.props.location.search);

    switch (this.props.match.params.chartType) {
      case 'hash-rate-distribution': {
        return (
          <PieChartComponent
            data={this.formatData()}
            compact={!!iframe}
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
        return (
          <AreaChartComponent
            data={this.formatData()}
            compact={!!iframe}
            isScale={this.params.scale}
          />
        );
      }
    }
  }

  private renderControls(): JSX.Element | null {
    switch (this.props.match.params.chartType) {
      case 'hash-rate-distribution': {
        return null;
      }

      default: {
        return (
          <div className="bi-chart__controls g-flex">
            <TimespanComponent
              selected={this.params.timespan}
              getTimespanUrl={this.getTimespanUrl}
            />

            <ChartActionsComponent
              isScale={this.params.scale}
              data={this.props.data}
              getChartActionUrl={this.getChartActionUrl}
            />
          </div>
        );
      }
    }
  }

  private formatData(): any {
    switch (this.props.match.params.chartType) {
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

  private getParams(): any {
    const params = queryString.parse(this.props.history.location.search);

    const validTimespan = Object.keys(TIMESPAN).find((key: string) => {
      return TIMESPAN[key] === params.timespan;
    });

    return {
      scale: params.scale === '1',
      timespan: validTimespan ? TIMESPAN[validTimespan] : TIMESPAN.DAYS_30,
    };
  }

  private getTimespanUrl(span: TIMESPAN): string {
    const params: any = queryString.parse(this.props.history.location.search);

    params.timespan = span;

    return `${this.props.location.pathname}?${queryString.stringify(params)}`;
  }

  private getChartActionUrl(
    param: string,
    value: string | number | null
  ): string {
    const params: any = queryString.parse(this.props.history.location.search);

    params[param] = value;

    if (value === null) {
      delete params[param];
    }

    return `${this.props.location.pathname}?${queryString.stringify(params)}`;
  }
}

function mapStateToProps(state: AppState): ChartState {
  return state.chart;
}

function mapDispatchToProps(dispatch: any): any {
  return bindActionCreators(ChartActions, dispatch);
}

export const ChartComponent = connect(
  mapStateToProps,
  mapDispatchToProps
)(Chart);

export default ChartComponent;
