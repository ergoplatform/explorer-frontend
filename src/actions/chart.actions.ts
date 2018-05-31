import axios, { AxiosResponse } from 'axios';
import { Action, ActionCreatorsMapObject, Dispatch } from 'redux';

import environment from '../config/environment';

import { GET_CHART, GET_CHART_SUCCESS } from '../constants/chart.types';

export interface ChartActions extends ActionCreatorsMapObject {
  getChart: (chartType: string) => any;
}

export const ChartActions: ChartActions = {
  getChart (chartType: string): any {
    return (dispatch: Dispatch<Action>) => {
      dispatch({
        type: GET_CHART
      });
      
      axios.get(`${environment.apiUrl}/charts/${chartType}`, {
        params: {
          timespan: '180days'
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
  },
};
