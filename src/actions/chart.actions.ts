import axios, { AxiosResponse } from 'axios';
import { Action, ActionCreatorsMapObject, Dispatch } from 'redux';

import environment from '../config/environment';

import { GET_CHART, GET_CHART_SUCCESS } from '../constants/chart.types';
import { TIMESPAN } from '../constants/timespan.constant';

export interface ChartActions extends ActionCreatorsMapObject {
  getChart: (chartType: string, options?: IChartParams) => any;
}

export interface IChartParams {
  timespan?: TIMESPAN;
}

export const ChartActions: ChartActions = {
  getChart (chartType: string, options: IChartParams = {}): any {
    return (dispatch: Dispatch<Action>) => {
      dispatch({
        type: GET_CHART
      });
      
      axios.get(`${environment.apiUrl}/charts/${chartType}`, {
        params: {
          timespan: options.timespan || TIMESPAN.DAYS_30
        }
      })
        .then((response: AxiosResponse) => {
          dispatch({
            payload: {
              data: response.data
            },
            type: GET_CHART_SUCCESS
          });
        });
    };
  }
};
