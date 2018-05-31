import axios, { AxiosResponse } from 'axios';
import { Action, ActionCreatorsMapObject, Dispatch } from 'redux';

import environment from '../config/environment';

import { GET_STATS, GET_STATS_INFO, GET_STATS_INFO_SUCCESS, GET_STATS_SUCCESS } from '../constants/stats.types';

export interface StatsActions extends ActionCreatorsMapObject {
  getStatsInfo: () => any;
  getStats: () => any;
}

export const StatsActions: StatsActions = {
  getStatsInfo (): any {
    return (dispatch: Dispatch<Action>) => {
      dispatch({
        type: GET_STATS_INFO
      });
      
      axios.get(`${environment.apiUrl}/info`)
        .then((response: AxiosResponse) => {
          dispatch({
            payload: {
              data: response.data
            },
            type: GET_STATS_INFO_SUCCESS
          });
        });
    };
  },
  
  getStats (): any {
    return (dispatch: Dispatch<Action>) => {
      dispatch({
        type: GET_STATS,
      });
  
      axios.get(`${environment.apiUrl}/stats`)
        .then((response: AxiosResponse) => {
          dispatch({
            payload: {
              data: response.data
            },
            type: GET_STATS_SUCCESS
          });
        });
    };
  }
};
