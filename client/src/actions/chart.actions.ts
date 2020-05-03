import { Action, ActionCreatorsMapObject, Dispatch } from 'redux';

import { GET_CHART, GET_CHART_SUCCESS } from '../constants/chart.types';
import { TIMESPAN } from '../constants/timespan.constant';
import { ChartApiService } from '../services/chart.api.service';

export interface ChartActions extends ActionCreatorsMapObject {
  getChart: (chartType: string, options?: IChartParams) => any;
}

export interface IChartParams {
  timespan?: TIMESPAN;
}

export const ChartActions: ChartActions = {
  getChart(chartType: string, options: IChartParams = {}): any {
    return (dispatch: Dispatch<Action>) => {
      dispatch({
        type: GET_CHART,
      });

      return ChartApiService.getChart(chartType, options).then((data: any) => {
        dispatch({
          payload: {
            data,
          },
          type: GET_CHART_SUCCESS,
        });
      });
    };
  },
};
