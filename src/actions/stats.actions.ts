import axios, { AxiosResponse } from 'axios';
import { Action, ActionCreator, ActionCreatorsMapObject, Dispatch } from 'redux';

import environment from '../config/environment';

import { GET_STATS_INFO, GET_STATS_INFO_SUCCESS } from '../constants/stats.types';

const getStatsInfo = () => {
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
};

export interface StatsActions extends ActionCreatorsMapObject {
  getStatsInfo: ActionCreator<any>;
}

export const StatsActions: StatsActions = {
  getStatsInfo
};
